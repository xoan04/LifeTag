import { HttpClient } from '@/lib/httpClient';
import {
    Profile,
    CreateProfileRequest,
    UpdateProfileRequest,
} from '@/models/profile';

export class ProfileService {
    /**
     * Lista todos los perfiles del usuario autenticado.
     * GET /api/profiles
     */
    static async getProfiles(): Promise<Profile[]> {
        return HttpClient.get<Profile[]>('/api/profiles');
    }

    /**
     * Obtiene un perfil por id (mismo identificador que en la URL pública /id/[publicId]).
     * GET /api/profiles/:profileId
     */
    static async getProfile(profileId: string): Promise<Profile> {
        return HttpClient.get<Profile>(`/api/profiles/${profileId}`);
    }

    /**
     * Crea un perfil nuevo (HUMAN o PET).
     * POST /api/profiles
     */
    static async createProfile(data: CreateProfileRequest): Promise<Profile> {
        return HttpClient.post<Profile>('/api/profiles', data);
    }

    /**
     * Actualiza un perfil existente.
     * PUT /api/profiles/:profileId
     */
    static async updateProfile(profileId: string, data: UpdateProfileRequest): Promise<Profile> {
        return HttpClient.put<Profile>(`/api/profiles/${profileId}`, data);
    }

    /**
     * Elimina un perfil.
     * DELETE /api/profiles/:profileId
     */
    static async deleteProfile(profileId: string): Promise<void> {
        return HttpClient.delete<void>(`/api/profiles/${profileId}`);
    }
}
