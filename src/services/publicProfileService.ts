import {
    mapPublicProfileApiToEmergencyProfile,
    type PublicProfileApiResponse,
} from '@/models/publicProfileApi';
import type { EmergencyProfile } from '@/models/emergencyProfile';

function getPublicProfileApiBase(): string {
    const raw =
        process.env.NEXT_PUBLIC_PUBLIC_PROFILE_API_BASE || 'https://life-tag-mu.vercel.app';
    return raw.replace(/\/$/, '');
}

/**
 * Cliente HTTP para el perfil público (sin Authorization).
 * GET {base}/api/profiles/:publicId
 */
export class PublicProfileService {
    static async getByPublicId(publicId: string): Promise<EmergencyProfile> {
        const base = getPublicProfileApiBase();
        const url = `${base}/api/profiles/${encodeURIComponent(publicId)}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: { Accept: 'application/json' },
            cache: 'no-store',
        });

        if (!response.ok) {
            const body = (await response.json().catch(() => ({}))) as {
                message?: string;
                error?: string;
            };
            const msg =
                body.message ||
                body.error ||
                `HTTP error! status: ${response.status}`;
            throw new Error(msg);
        }

        const dto = (await response.json()) as PublicProfileApiResponse;
        return mapPublicProfileApiToEmergencyProfile(dto, publicId);
    }
}
