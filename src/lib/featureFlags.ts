/**
 * NEXT_PUBLIC_ENABLE_SCANNER=true → mostrar opciones de escaneo QR/NFC.
 * false o no definido → solo input manual para el código del dispositivo.
 * Importante: tras cambiar .env.local hay que reiniciar el servidor (npm run dev).
 */
function parseEnableScanner(): boolean {
    const raw = process.env.NEXT_PUBLIC_ENABLE_SCANNER;
    const enabled = raw != null && raw !== '' && String(raw).toLowerCase().trim() === 'true';
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
        console.log('[LifeTag] NEXT_PUBLIC_ENABLE_SCANNER:', raw, '→ ENABLE_SCANNER:', enabled);
    }
    return enabled;
}

export const ENABLE_SCANNER = parseEnableScanner();
