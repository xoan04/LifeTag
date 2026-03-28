import type { EmergencyProfile } from '@/models/emergencyProfile';

/**
 * Respuesta cruda de GET /api/public/emergency-profile/:profileId (backend LifeTag).
 */
export interface PublicProfileApiResponse {
    type: 'HUMAN' | 'PET';
    name: string;
    isActive: boolean;
    bloodType: string | null;
    allergies: string[] | null;
    medicalConditions: string[] | null;
    medications: string[] | null;
    emergencyContact1_name: string | null;
    emergencyContact1_phone: string | null;
    emergencyContact1_relation: string | null;
    emergencyContact2_name: string | null;
    emergencyContact2_phone: string | null;
    emergencyContact2_relation: string | null;
    species: string | null;
    breed: string | null;
    vaccinationStatus: string | null;
    targetReward: string | null;
    ownerPhone: string | null;
    veterinarian_name: string | null;
    veterinarian_phone: string | null;
}

/**
 * Convierte la respuesta pública al modelo de vista de emergencia.
 * Los campos que la API no envía se rellenan con valores neutros.
 */
export function mapPublicProfileApiToEmergencyProfile(
    dto: PublicProfileApiResponse,
    publicId: string,
): EmergencyProfile {
    return {
        id: publicId,
        userId: '',
        type: dto.type,
        name: dto.name,
        isActive: dto.isActive,
        createdAt: '',
        updatedAt: '',
        bloodType: dto.bloodType,
        allergies: dto.allergies ?? [],
        medicalConditions: dto.medicalConditions ?? [],
        medications: dto.medications ?? [],
        emergencyContact1_name: dto.emergencyContact1_name,
        emergencyContact1_phone: dto.emergencyContact1_phone,
        emergencyContact1_relation: dto.emergencyContact1_relation,
        emergencyContact2_name: dto.emergencyContact2_name,
        emergencyContact2_phone: dto.emergencyContact2_phone,
        emergencyContact2_relation: dto.emergencyContact2_relation,
        species: dto.species,
        breed: dto.breed,
        vaccinationStatus: dto.vaccinationStatus,
        targetReward: dto.targetReward,
        ownerPhone: dto.ownerPhone,
        veterinarian_name: dto.veterinarian_name,
        veterinarian_phone: dto.veterinarian_phone,
    };
}
