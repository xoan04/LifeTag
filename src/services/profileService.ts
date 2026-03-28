import { HttpClient } from '@/lib/httpClient';
import {
    Profile,
    CreateProfileRequest,
    UpdateProfileRequest,
} from '@/models/profile';
import { normalizeRegisteredDevice } from '@/models/device';

export class ProfileService {
    /**
     * Lista todos los perfiles del usuario autenticado.
     * GET /api/profiles
     */
    static async getProfiles(): Promise<Profile[]> {
        const list = await HttpClient.get<Profile[]>('/api/profiles');
        return list.map((p) => ({
            ...p,
            devices: (p.devices ?? []).map(normalizeRegisteredDevice),
        }));
    }

    /**
     * Obtiene un perfil por id (mismo identificador que en la URL pública /id/[publicId]).
     * GET /api/profiles/:profileId
     */
    static async getProfile(profileId: string): Promise<Profile> {
        const p = await HttpClient.get<Profile>(`/api/profiles/${profileId}`);
        return {
            ...p,
            devices: (p.devices ?? []).map(normalizeRegisteredDevice),
        };
    }

    /**
     * Crea un perfil nuevo (HUMAN o PET).
     * POST /api/profiles
     */
    static async createProfile(data: CreateProfileRequest): Promise<Profile> {
        const p = await HttpClient.post<Profile>('/api/profiles', data);
        return {
            ...p,
            devices: (p.devices ?? []).map(normalizeRegisteredDevice),
        };
    }

    /**
     * Actualiza un perfil existente.
     * PUT /api/profiles/:profileId
     */
    static async updateProfile(profileId: string, data: UpdateProfileRequest): Promise<Profile> {
        const p = await HttpClient.put<Profile>(`/api/profiles/${profileId}`, data);
        return {
            ...p,
            devices: (p.devices ?? []).map(normalizeRegisteredDevice),
        };
    }

    /**
     * Elimina un perfil.
     * DELETE /api/profiles/:profileId
     */
    static async deleteProfile(profileId: string): Promise<void> {
        return HttpClient.delete<void>(`/api/profiles/${profileId}`);
    }
}
