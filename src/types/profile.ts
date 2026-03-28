/** Mock legacy: solo hardware NFC; el QR del perfil no es un device. */
export type DeviceType = 'nfc';
export type DeviceStatus = 'active' | 'lost' | 'disabled';

export interface Device {
    id: string;
    profileId: string;
    deviceType: DeviceType;
    deviceToken: string;
    status: DeviceStatus;
    createdAt: string;
}

export type ProfileType = 'HUMAN' | 'PET';

export interface BaseProfile {
    id: string;
    userId: string;
    publicProfileId: string;
    type: ProfileType;
    name: string;
    isActive: boolean;
    ownerId?: string;
    createdAt: string;
}

export interface HumanProfile extends BaseProfile {
    type: 'HUMAN';
    bloodType: string;
    allergies: string[];
    medicalConditions: string[];
    medications: string[];
    emergencyContact1: { name: string; phone: string; relation: string };
    emergencyContact2?: { name: string; phone: string; relation: string };
}

export interface PetProfile extends BaseProfile {
    type: 'PET';
    species: string;
    breed: string;
    vaccinationStatus: string;
    veterinarian: { name: string; phone: string };
    ownerPhone: string;
    reward?: string;
}

export type Profile = HumanProfile | PetProfile;

export interface ScanLog {
    id: string;
    profileId: string;
    scannedAt: string;
    location?: string;
}
