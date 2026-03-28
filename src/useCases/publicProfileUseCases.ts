import { PublicProfileService } from '@/services/publicProfileService';
import type { EmergencyProfile } from '@/models/emergencyProfile';

export interface PublicProfileParams {
    publicId: string;
}

/**
 * Caso de uso: obtener datos de emergencia visibles públicamente por id de perfil.
 */
export class PublicProfileUseCases {
    static getPublicEmergencyProfile(params: PublicProfileParams): Promise<EmergencyProfile> {
        return PublicProfileService.getByPublicId(params.publicId);
    }
}
