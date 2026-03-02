import { UserService } from '@/services/userService';
import { User, UpdateUserRequest } from '@/models/auth';

export class UserUseCases {
    /**
     * Obtiene el usuario actual desde GET /api/user/me.
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
     * Actualiza perfil del usuario actual (PUT /api/user/me).
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

    static async changePlan(plan: string): Promise<User> {
        const user = await UserService.updatePlan(plan);
        if (typeof window !== 'undefined') {
            const currentUser = JSON.parse(localStorage.getItem('lifeTag_user') || '{}');
            localStorage.setItem('lifeTag_user', JSON.stringify({ ...currentUser, ...user }));
        }
        return user;
    }
}
