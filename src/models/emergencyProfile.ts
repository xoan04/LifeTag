/**
 * Perfil público de emergencia.
 * Contrato exacto de GET /api/public/emergency-profile/:profileId
 * Nota: no incluye id ni userId — es la vista pública reducida.
 */
export interface EmergencyProfile {
    type: 'HUMAN' | 'PET';
    name: string;
    isActive: boolean;
    // HUMAN
    bloodType: string | null;
    allergies: string[];
    medicalConditions: string[];
    medications: string[];
    emergencyContact1_name: string | null;
    emergencyContact1_phone: string | null;
    emergencyContact1_relation: string | null;
    emergencyContact2_name: string | null;
    emergencyContact2_phone: string | null;
    emergencyContact2_relation: string | null;
    // PET
    species: string | null;
    breed: string | null;
    vaccinationStatus: string | null;
    targetReward: string | null;
    ownerPhone: string | null;
    veterinarian_name: string | null;
    veterinarian_phone: string | null;
}

export interface EmergencyProfileParams {
    /** Token del dispositivo escaneado (opcional, para tracking de escaneos). */
    deviceToken?: string;
    /** UUID del perfil, opcional si el backend soporta busqueda por token en la URL */
    profileId?: string;
    /** Identificador público que viene de la URL (puede ser Token o UUID) */
    publicId: string;
    /** Latitud del escaneador (opcional). */
    lat?: number;
    /** Longitud del escaneador (opcional). */
    lng?: number;
}
