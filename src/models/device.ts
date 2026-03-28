/**
 * Único tipo de dispositivo registrado en backend: hardware NFC.
 * El QR de la página pública del perfil es solo UI (p. ej. `ProfilePublicQr`), no se registra como device.
 */
export type DeviceType = 'NFC_TAG';

export type DeviceStatus = 'UNACTIVATED' | 'ACTIVE' | 'INACTIVE';

/** Forma física del producto NFC (banda, sticker, tarjeta, anillo). */
export type NfcFormFactor = 'NFC_BAND' | 'NFC_STICKER' | 'NFC_CARD' | 'NFC_RING';

export const NFC_FORM_FACTORS: readonly NfcFormFactor[] = [
    'NFC_BAND',
    'NFC_STICKER',
    'NFC_CARD',
    'NFC_RING',
] as const;

/** Unifica respuestas de API: el QR público no es un device; todo hardware registrado es NFC. */
export function normalizeRegisteredDevice(device: Device): Device {
    return { ...device, deviceType: 'NFC_TAG' };
}

// ─── Perfil resumido embebido en Device (solo en GET /api/devices) ──────────

export interface DeviceProfileSummary {
    id: string;
    name: string;
    type: 'HUMAN' | 'PET';
}

// ─── Modelo principal ────────────────────────────────────────────────────────

/**
 * Dispositivo NFC físico registrado.
 * Contrato de GET /api/devices y embebido en Profile.devices[].
 * El campo `profile` solo existe en GET /api/devices (no en Profile.devices[]).
 */
export interface Device {
    id: string;
    deviceToken: string;
    deviceType: DeviceType;
    /** Presente si el backend guarda la forma física del producto NFC. */
    formFactor?: NfcFormFactor | string | null;
    status: DeviceStatus;
    profileId: string | null;
    registeredByUserId: string | null;
    createdAt: string;
    updatedAt: string;
    /** Solo presente en GET /api/devices (no en el array embebido en Profile). */
    profile?: DeviceProfileSummary;
}

// ─── Request bodies ──────────────────────────────────────────────────────────

/**
 * POST /api/devices — Registra el dispositivo (queda UNACTIVATED, sin perfil).
 */
export interface RegisterDeviceRequest {
    deviceToken: string;
    deviceType: DeviceType;
    formFactor?: NfcFormFactor;
}

/**
 * POST /api/devices/activate — Activa y vincula el dispositivo a un perfil.
 */
export interface ActivateDeviceRequest {
    deviceToken: string;
    profileId: string;
    deviceType: DeviceType;
    formFactor?: NfcFormFactor;
}

// ─── Response wrappers ───────────────────────────────────────────────────────

export interface RegisterDeviceResponse {
    message: string;
    device: Device;
}

export interface ActivateDeviceResponse {
    message: string;
    device: Device;
}
