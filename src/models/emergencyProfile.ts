import { Device } from '@/models/device';

/**
 * Perfil para vista de emergencia.
 * Origen típico: API pública GET /api/profiles/:profileId (mapeado desde PublicProfileApiResponse).
 */
export interface EmergencyProfile {
    id: string;
    userId: string;
    type: 'HUMAN' | 'PET';
    name: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
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
    devices?: Device[];
}

export interface EmergencyProfileParams {
    /** En la URL pública /id/[publicId] ahora esperamos profileId */
    publicId: string;
}
