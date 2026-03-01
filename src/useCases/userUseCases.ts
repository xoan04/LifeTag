import { UserService } from '@/services/userService';
import { User } from '@/models/auth';

export class UserUseCases {
    static async getProfile(): Promise<User> {
        return UserService.getMe();
    }

    static async updateProfile(data: { name?: string, email?: string }): Promise<User> {
        const user = await UserService.updateMe(data);
        // Update local storage if needed
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
