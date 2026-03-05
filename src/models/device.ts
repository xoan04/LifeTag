export type DeviceType = 'QR_TAG' | 'NFC_TAG';
export type DeviceStatus = 'UNACTIVATED' | 'ACTIVE' | 'INACTIVE';

// ─── Perfil resumido embebido en Device (solo en GET /api/devices) ──────────

export interface DeviceProfileSummary {
    id: string;
    name: string;
    type: 'HUMAN' | 'PET';
}

// ─── Modelo principal ────────────────────────────────────────────────────────

/**
 * Dispositivo NFC/QR.
 * Contrato de GET /api/devices y embebido en Profile.devices[].
 * El campo `profile` solo existe en GET /api/devices (no en Profile.devices[]).
 */
export interface Device {
    id: string;
    deviceToken: string;
    deviceType: DeviceType;
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
}

/**
 * POST /api/devices/activate — Activa y vincula el dispositivo a un perfil.
 */
export interface ActivateDeviceRequest {
    deviceToken: string;
    profileId: string;
    deviceType: DeviceType;
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
