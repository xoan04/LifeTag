import { HttpClient } from '@/lib/httpClient';
import {
    mapPublicProfileApiToEmergencyProfile,
    type PublicProfileApiResponse,
} from '@/models/publicProfileApi';
import type { EmergencyProfile } from '@/models/emergencyProfile';

/** Evita dos GET al mismo id cuando React Strict Mode ejecuta el efecto dos veces. */
const inflightByProfileId = new Map<string, Promise<EmergencyProfile>>();

/**
 * Perfil de emergencia público.
 * En cliente: GET /api/public/emergency-profile/:profileId (visible en Red; proxy → NEXT_PUBLIC_API_URL).
 */
export class PublicProfileService {
    static getByPublicId(profileId: string): Promise<EmergencyProfile> {
        const existing = inflightByProfileId.get(profileId);
        if (existing) return existing;

        const promise = (async () => {
            try {
                const dto = await HttpClient.get<PublicProfileApiResponse>(
                    `/api/public/emergency-profile/${encodeURIComponent(profileId)}`,
                );
                return mapPublicProfileApiToEmergencyProfile(dto, profileId);
            } finally {
                inflightByProfileId.delete(profileId);
            }
        })();

        inflightByProfileId.set(profileId, promise);
        return promise;
    }
}
