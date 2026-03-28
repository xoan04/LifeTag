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

/**
 * iPhone / iPad (incl. Chrome y Safari): Apple no expone Web NFC en el navegador.
 * Chrome en iOS usa el mismo motor que Safari (WebKit), no el de Android.
 */
export function isAppleMobileWeb(): boolean {
    if (typeof window === 'undefined') return false;
    const ua = window.navigator.userAgent;
    const iOS = /iPad|iPhone|iPod/.test(ua);
    const iPadOS =
        !iOS && /iPad|Macintosh/.test(ua) && navigator.maxTouchPoints > 1;
    return iOS || iPadOS;
}

/** UID del chip en hex sin dos puntos (p. ej. 041A2B3C4D). */
export function normalizeNfcUid(serial: string): string {
    return serial.replace(/:/g, '').toUpperCase();
}

/**
 * UID del chip en hex con separador `:` por byte (p. ej. 04:87:A2:B2:B5:51:80).
 */
export function formatNfcUidColons(serial: string): string {
    const hex = serial.replace(/[^0-9A-Fa-f]/g, '').toUpperCase();
    if (hex.length < 2) return serial.trim().toUpperCase();
    const pairs: string[] = [];
    for (let i = 0; i < hex.length; i += 2) {
        pairs.push(hex.slice(i, i + 2));
    }
    return pairs.join(':');
}

type NfcNdefWriteOptions = {
    /** Sustituye todo el mensaje NDEF del tag (borra registros anteriores y deja solo lo que enviamos). */
    overwrite?: boolean;
    signal?: AbortSignal;
};

type NfcNdefWriterClass = new () => {
    write: (
        message: { records: Array<{ recordType: string; data: string }> },
        options?: NfcNdefWriteOptions
    ) => Promise<void>;
};

export function isWebNfcWriteSupported(): boolean {
    return typeof window !== 'undefined' && 'NDEFWriter' in window;
}

/**
 * Graba un registro NDEF URL en la etiqueta (p. ej. abrir el perfil público al acercar el móvil).
 * Con `overwrite: true` el mensaje anterior del tag se sustituye por completo (solo queda esta URL).
 * Requiere Chrome/Android con NFC y un segundo acercamiento tras la lectura.
 */
export async function writeNfcUrlRecord(absoluteUrl: string): Promise<void> {
    if (!isWebNfcWriteSupported()) {
        throw new Error('unsupported');
    }
    const NDEFWriterClass = (window as unknown as { NDEFWriter: NfcNdefWriterClass }).NDEFWriter;
    const writer = new NDEFWriterClass();
    await writer.write(
        { records: [{ recordType: 'url', data: absoluteUrl }] },
        { overwrite: true }
    );
}

/**
 * Si el valor es solo hex (UID NFC), formato `04:87:…`; si no, código tal cual (placas alfanuméricas).
 */
export function normalizeNfcDeviceToken(raw: string): string {
    const trimmed = raw.trim();
    const hexOnly = trimmed.replace(/[^0-9A-Fa-f]/g, '');
    if (/^[0-9A-Fa-f]+$/.test(hexOnly) && hexOnly.length >= 8) {
        return formatNfcUidColons(hexOnly);
    }
    return trimmed.toUpperCase();
}

/** Intenta escribir la URL en el tag; si no hay soporte de escritura, considera éxito sin hacer nada. */
export async function tryWriteNfcUrlRecord(absoluteUrl: string): Promise<boolean> {
    if (!isWebNfcWriteSupported()) return true;
    try {
        await writeNfcUrlRecord(absoluteUrl);
        return true;
    } catch {
        return false;
    }
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
                finish(() => resolve(formatNfcUidColons(serialNumber)));
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
