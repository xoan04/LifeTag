/**
 * Web NFC (NDEFReader). Solo en contexto seguro (HTTPS o localhost).
 * Soportado principalmente en Chrome para Android con hardware NFC.
 */

/** Tipos mínimos (lib.dom puede no incluir Web NFC según versión de TypeScript). */
interface NfcNdefRecord {
    recordType: string;
    encoding?: string;
    data?: DataView;
}

interface NfcNdefMessage {
    records: NfcNdefRecord[];
}

interface NfcReadingEvent extends Event {
    serialNumber: string;
    message: NfcNdefMessage;
}

type NfcNdefReaderClass = new () => {
    scan: (options?: { signal?: AbortSignal }) => Promise<void>;
    addEventListener(type: 'reading', listener: (ev: Event) => void): void;
    removeEventListener(type: 'reading', listener: (ev: Event) => void): void;
    addEventListener(type: 'readingerror', listener: (ev: Event) => void): void;
    removeEventListener(type: 'readingerror', listener: (ev: Event) => void): void;
};

function decodeNdefText(record: NfcNdefRecord): string | null {
    if (record.recordType !== 'text' || !record.data) return null;
    const arr = new Uint8Array(record.data.buffer, record.data.byteOffset, record.data.byteLength);
    if (arr.length < 2) return null;
    const langLen = arr[0] & 0x3f;
    const textBytes = arr.slice(1 + langLen);
    const text = new TextDecoder(record.encoding ?? 'utf-8').decode(textBytes).trim();
    return text.length ? text : null;
}

function decodeNdefUrl(record: NfcNdefRecord): string | null {
    if (record.recordType !== 'url' || !record.data) return null;
    const arr = new Uint8Array(record.data.buffer, record.data.byteOffset, record.data.byteLength);
    if (arr.length < 2) return null;
    const prefixes = ['', 'http://www.', 'https://www.', 'http://', 'https://'];
    const code = arr[0];
    const rest = new TextDecoder().decode(arr.slice(1));
    const full = (prefixes[code] ?? '') + rest;
    return full.length ? full : null;
}

export function isWebNfcSupported(): boolean {
    return typeof window !== 'undefined' && 'NDEFReader' in window;
}

/** UID del chip en hex sin dos puntos (p. ej. 041A2B3C4D). */
export function normalizeNfcUid(serial: string): string {
    return serial.replace(/:/g, '').toUpperCase();
}

function tokenFromUrl(url: string): string {
    try {
        const u = new URL(url);
        const last = u.pathname.split('/').filter(Boolean).pop() ?? '';
        if (last) return last.split('?')[0] ?? last;
    } catch {
        /* no es URL absoluta */
    }
    const last = url.split('/').pop() ?? url;
    return last.split('?')[0] ?? last;
}

/**
 * Espera un tag NFC y devuelve el identificador a usar como device token:
 * 1) UID físico del chip (serialNumber), si el navegador lo expone
 * 2) Texto NDEF
 * 3) URL NDEF (último segmento o token en la ruta)
 */
export async function readNfcTagOnce(): Promise<string> {
    if (!isWebNfcSupported()) {
        throw new Error('unsupported');
    }

    const NDEFReaderClass = (window as unknown as { NDEFReader: NfcNdefReaderClass }).NDEFReader;
    const ndef = new NDEFReaderClass();
    let settled = false;

    return new Promise((resolve, reject) => {
        const finish = (fn: () => void) => {
            if (settled) return;
            settled = true;
            ndef.removeEventListener('reading', onReading);
            ndef.removeEventListener('readingerror', onReadingError);
            fn();
        };

        const onReading = (event: Event) => {
            const { serialNumber, message } = event as NfcReadingEvent;

            if (serialNumber && serialNumber.replace(/:/g, '').length > 0) {
                finish(() => resolve(normalizeNfcUid(serialNumber)));
                return;
            }

            for (const record of message.records) {
                if (record.recordType === 'text') {
                    const t = decodeNdefText(record);
                    if (t) {
                        finish(() => resolve(t.replace(/\s+/g, '')));
                        return;
                    }
                }
                if (record.recordType === 'url') {
                    const u = decodeNdefUrl(record);
                    if (u) {
                        const token = tokenFromUrl(u);
                        if (token) {
                            finish(() => resolve(token.toUpperCase()));
                            return;
                        }
                    }
                }
            }

            finish(() => reject(new Error('empty')));
        };

        const onReadingError = () => {
            finish(() => reject(new Error('readingerror')));
        };

        ndef.addEventListener('reading', onReading);
        ndef.addEventListener('readingerror', onReadingError);

        ndef.scan().catch((err: unknown) => {
            finish(() => reject(err instanceof Error ? err : new Error(String(err))));
        });
    });
}

export function classifyNfcFailure(err: unknown): 'unsupported' | 'cancelled' | 'generic' {
    if (err instanceof Error && err.message === 'unsupported') return 'unsupported';
    if (err instanceof DOMException) {
        if (err.name === 'NotAllowedError' || err.name === 'AbortError') return 'cancelled';
    }
    return 'generic';
}
