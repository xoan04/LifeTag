import { HttpClient } from '@/lib/httpClient';
import { EmergencyProfile, EmergencyProfileParams } from '@/models/emergencyProfile';

export class EmergencyService {
    /**
     * Obtiene el perfil de emergencia desde profileId.
     * Endpoint:
     * GET /api/profiles/:profileId
     */
    static async getEmergencyProfile(params: EmergencyProfileParams): Promise<EmergencyProfile> {
        const { publicId } = params;
        return HttpClient.get<EmergencyProfile>(`/api/profiles/${publicId}`);
    }
}
