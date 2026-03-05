import { Device } from '@/models/device';

export type ProfileType = 'HUMAN' | 'PET';

// ─── Base (campos comunes a HUMAN y PET) ───────────────────────────────────

interface ProfileBase {
    id: string;
    userId: string;
    type: ProfileType;
    name: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    /** Dispositivos NFC/QR vinculados a este perfil */
    devices: Device[];
}

// ─── HUMAN ─────────────────────────────────────────────────────────────────

export interface HumanProfile extends ProfileBase {
    type: 'HUMAN';
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
    // PET-only siempre null en HUMAN
    species: null;
    breed: null;
    vaccinationStatus: null;
    targetReward: null;
    ownerPhone: null;
    veterinarian_name: null;
    veterinarian_phone: null;
}

// ─── PET ───────────────────────────────────────────────────────────────────

export interface PetProfile extends ProfileBase {
    type: 'PET';
    species: string | null;
    breed: string | null;
    vaccinationStatus: string | null;
    targetReward: string | null;
    ownerPhone: string | null;
    veterinarian_name: string | null;
    veterinarian_phone: string | null;
    // HUMAN-only siempre null en PET
    bloodType: null;
    allergies: [];
    medicalConditions: [];
    medications: [];
    emergencyContact1_name: null;
    emergencyContact1_phone: null;
    emergencyContact1_relation: null;
    emergencyContact2_name: null;
    emergencyContact2_phone: null;
    emergencyContact2_relation: null;
}

/** Discriminated union — usa type narrowing con profile.type */
export type Profile = HumanProfile | PetProfile;

// ─── Request bodies ─────────────────────────────────────────────────────────

export interface CreateHumanProfileRequest {
    type: 'HUMAN';
    name: string;
    isActive?: boolean;
    bloodType?: string;
    allergies?: string[];
    medicalConditions?: string[];
    medications?: string[];
    emergencyContact1_name?: string;
    emergencyContact1_phone?: string;
    emergencyContact1_relation?: string;
    emergencyContact2_name?: string;
    emergencyContact2_phone?: string;
    emergencyContact2_relation?: string;
}

export interface CreatePetProfileRequest {
    type: 'PET';
    name: string;
    isActive?: boolean;
    species?: string;
    breed?: string;
    vaccinationStatus?: string;
    targetReward?: string;
    ownerPhone?: string;
    veterinarian_name?: string;
    veterinarian_phone?: string;
}

export type CreateProfileRequest = CreateHumanProfileRequest | CreatePetProfileRequest;

/** PUT /api/profiles/:id — mismos campos opcionales que el create, sin type */
export type UpdateProfileRequest = Partial<Omit<CreateHumanProfileRequest, 'type'>> &
    Partial<Omit<CreatePetProfileRequest, 'type'>>;
