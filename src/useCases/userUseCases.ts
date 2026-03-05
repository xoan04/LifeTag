import { UserService } from '@/services/userService';
import { User, UpdateUserRequest } from '@/models/auth';
import { MembershipResponse } from '@/models/plan';
import { PlanUseCases } from '@/useCases/planUseCases';

export class UserUseCases {
    /**
     * Obtiene el usuario autenticado actual desde GET /api/user/me.
     * Sincroniza la respuesta en localStorage para mantener sesión actualizada.
     */
    static async getMe(): Promise<User> {
        const user = await UserService.getMe();
        if (typeof window !== 'undefined') {
            localStorage.setItem('lifeTag_user', JSON.stringify(user));
        }
        return user;
    }

    /** @deprecated Usar getMe(). Alias por compatibilidad. */
    static async getProfile(): Promise<User> {
        return this.getMe();
    }

    /**
     * Actualiza perfil del usuario autenticado (PUT /api/user/me).
     * body: { name?, email? }. Sincroniza respuesta en localStorage.
     */
    static async updateProfile(data: UpdateUserRequest): Promise<User> {
        const user = await UserService.updateMe(data);
        if (typeof window !== 'undefined') {
            const currentUser = JSON.parse(localStorage.getItem('lifeTag_user') || '{}');
            localStorage.setItem('lifeTag_user', JSON.stringify({ ...currentUser, ...user }));
        }
        return user;
    }

    /**
     * Obtiene la membresía del usuario autenticado con límites y contadores de uso.
     * Delega a PlanUseCases.getMembership().
     */
    static async getMembership(): Promise<MembershipResponse> {
        return PlanUseCases.getMembership();
    }
}
