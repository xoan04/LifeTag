import { HttpClient } from '@/lib/httpClient';
import { User, UpdateUserRequest } from '@/models/auth';
import { MembershipResponse } from '@/models/plan';

export class UserService {
    /**
     * Obtiene el usuario autenticado actual.
     * GET /api/user/me
     */
    static async getMe(): Promise<User> {
        return HttpClient.get<User>('/api/user/me');
    }

    /**
     * Actualiza nombre o email del usuario autenticado.
     * PUT /api/user/me — body: { name?, email? }
     */
    static async updateMe(data: UpdateUserRequest): Promise<User> {
        return HttpClient.put<User>('/api/user/me', data);
    }

    /**
     * Obtiene el plan activo del usuario con contadores de uso.
     * GET /api/user/me/membership
     * Incluye: subscriptionPlan, isSuperAccount, isDemo, maxProfiles, maxDevices,
     *          profilesUsed, devicesUsed.
     */
    static async getMembership(): Promise<MembershipResponse> {
        return HttpClient.get<MembershipResponse>('/api/user/me/membership');
    }
}
