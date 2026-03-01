import { HttpClient } from '@/lib/httpClient';
import { User } from '@/models/auth';

export class UserService {
    static async getMe(): Promise<User> {
        return HttpClient.get<User>('/api/users/me');
    }

    static async updateMe(data: Partial<User>): Promise<User> {
        return HttpClient.put<User>('/api/users/me', data);
    }

    static async updatePlan(plan: string): Promise<User> {
        return HttpClient.post<User>('/api/users/me/plan', { plan });
    }
}
