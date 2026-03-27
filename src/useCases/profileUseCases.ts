import { ProfileService } from '@/services/profileService';
import { PlanUseCases } from '@/useCases/planUseCases';
import {
    Profile,
    CreateProfileRequest,
    UpdateProfileRequest,
} from '@/models/profile';

export class ProfileUseCases {
    /**
     * Lista los perfiles del usuario autenticado.
     * GET /api/profiles
     */
    static async getProfiles(): Promise<Profile[]> {
        return ProfileService.getProfiles();
    }

    /**
     * Obtiene un perfil por id.
     */
    static async getProfile(profileId: string): Promise<Profile> {
        return ProfileService.getProfile(profileId);
    }

    /**
     * Crea un perfil nuevo verificando los límites del plan antes de llamar a la API.
     * El backend también valida — esta comprobación local mejora la UX evitando el round-trip.
     *
     * Lanza un Error con el mensaje estándar si el plan no lo permite.
     * POST /api/profiles
     */
    static async createProfile(data: CreateProfileRequest): Promise<Profile> {
        const membership = await PlanUseCases.getMembership();

        if (!PlanUseCases.canCreateProfile(membership)) {
            throw new Error(
                membership.isDemo
                    ? PlanUseCases.demoPlanMessage()
                    : 'Has alcanzado el límite de perfiles de tu plan. Mejora tu plan para agregar más.'
            );
        }

        return ProfileService.createProfile(data);
    }

    /**
     * Actualiza un perfil existente.
     * PUT /api/profiles/:profileId
     */
    static async updateProfile(profileId: string, data: UpdateProfileRequest): Promise<Profile> {
        return ProfileService.updateProfile(profileId, data);
    }

    /**
     * Elimina un perfil.
     * DELETE /api/profiles/:profileId
     */
    static async deleteProfile(profileId: string): Promise<void> {
        return ProfileService.deleteProfile(profileId);
    }

    // ─── Helpers de tipo (type guards) ──────────────────────────────────────

    /**
     * Type guard: retorna true si el perfil es humano.
     * Permite acceder a bloodType, allergies, emergencyContacts etc. con tipos correctos.
     */
    static isHuman(profile: Profile): profile is import('@/models/profile').HumanProfile {
        return profile.type === 'HUMAN';
    }

    /**
     * Type guard: retorna true si el perfil es una mascota.
     * Permite acceder a species, breed, veterinarian etc. con tipos correctos.
     */
    static isPet(profile: Profile): profile is import('@/models/profile').PetProfile {
        return profile.type === 'PET';
    }
}
