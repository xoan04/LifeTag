/**
 * Web NFC (NDEFReader). Solo en contexto seguro (HTTPS o localhost).
 * Soportado principalmente en Chrome para Android con hardware NFC.
 */

const LOG = '[LifeTag NFC]';

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
    if (typeof window === 'undefined') return false;
    // API actual: NDEFReader.write (Chrome/Android). La antigua NDEFWriter puede no respetar overwrite.
    if ('NDEFReader' in window) {
        try {
            const R = (window as unknown as { NDEFReader: new () => { write?: unknown } }).NDEFReader;
            if (typeof new R().write === 'function') return true;
        } catch {
            /* ignore */
        }
    }
    return 'NDEFWriter' in window;
}

const urlRecordMessage = (absoluteUrl: string) => ({
    records: [{ recordType: 'url', data: absoluteUrl }] as Array<{ recordType: string; data: string }>,
});

const writeOptions: NfcNdefWriteOptions = { overwrite: true };

/**
 * Graba un registro NDEF URL en la etiqueta (p. ej. abrir el perfil público al acercar el móvil).
 * Con `overwrite: true` el mensaje anterior del tag se sustituye por completo (solo queda esta URL).
 * Usa NDEFReader.write cuando exista; si overwrite es false y el tag ya tiene NDEF, el navegador rechaza la escritura.
 * Requiere Chrome/Android con NFC y un segundo acercamiento tras la lectura.
 */
export async function writeNfcUrlRecord(absoluteUrl: string): Promise<void> {
    if (!isWebNfcWriteSupported()) {
        throw new Error('unsupported');
    }

    const message = urlRecordMessage(absoluteUrl);
    console.log(`${LOG} escribir → nuevo dato (URL pública en el tag)`, {
        url: absoluteUrl,
        overwrite: writeOptions.overwrite,
        records: message.records,
    });

    if ('NDEFReader' in window) {
        try {
            const R = (window as unknown as {
                NDEFReader: new () => {
                    write?: (m: typeof message, o?: NfcNdefWriteOptions) => Promise<void>;
                };
            }).NDEFReader;
            const ndef = new R();
            if (typeof ndef.write === 'function') {
                await ndef.write(message, writeOptions);
                console.log(`${LOG} escritura OK (NDEFReader.write)`);
                return;
            }
        } catch (e) {
            console.warn(`${LOG} NDEFReader.write falló, probando legado si existe`, e);
            /* intentar legado */
        }
    }

    if ('NDEFWriter' in window) {
        const NDEFWriterClass = (window as unknown as { NDEFWriter: NfcNdefWriterClass }).NDEFWriter;
        const writer = new NDEFWriterClass();
        await writer.write(message, writeOptions);
        console.log(`${LOG} escritura OK (NDEFWriter legado)`);
        return;
    }

    throw new Error('unsupported');
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
    if (!isWebNfcWriteSupported()) {
        console.log(`${LOG} tryWrite: sin API de escritura en este navegador; se omite (éxito lógico)`);
        return true;
    }
    try {
        await writeNfcUrlRecord(absoluteUrl);
        return true;
    } catch (err) {
        console.error(`${LOG} tryWrite: falló la escritura`, { url: absoluteUrl, err });
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

            const ndefRecords = message.records.map((r) => {
                const base = { recordType: r.recordType };
                if (r.recordType === 'text') {
                    return { ...base, decodedText: decodeNdefText(r) };
                }
                if (r.recordType === 'url') {
                    return { ...base, decodedUrl: decodeNdefUrl(r) };
                }
                return base;
            });

            console.log(`${LOG} lectura del tag (raw)`, {
                serialNumberDelLector: serialNumber || null,
                ndefRecords,
            });

            if (serialNumber && serialNumber.replace(/:/g, '').length > 0) {
                const token = formatNfcUidColons(serialNumber);
                console.log(`${LOG} token usado (origen: UID del chip)`, token);
                finish(() => resolve(token));
                return;
            }

            for (const record of message.records) {
                if (record.recordType === 'text') {
                    const t = decodeNdefText(record);
                    if (t) {
                        const raw = t.replace(/\s+/g, '');
                        console.log(`${LOG} token usado (origen: NDEF text)`, { raw, normalizado: raw });
                        finish(() => resolve(raw));
                        return;
                    }
                }
                if (record.recordType === 'url') {
                    const u = decodeNdefUrl(record);
                    if (u) {
                        const token = tokenFromUrl(u);
                        if (token) {
                            const out = token.toUpperCase();
                            console.log(`${LOG} token usado (origen: NDEF url)`, {
                                urlDecodificada: u,
                                tokenExtraido: out,
                            });
                            finish(() => resolve(out));
                            return;
                        }
                    }
                }
            }

            console.warn(`${LOG} no se obtuvo UID ni NDEF text/url útil`, { ndefRecords });
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
