import { HttpClient } from '@/lib/httpClient';
import { User, UpdateUserRequest } from '@/models/auth';

export class UserService {
    static async getMe(): Promise<User> {
        return HttpClient.get<User>('/api/user/me');
    }

    static async updateMe(data: UpdateUserRequest): Promise<User> {
        return HttpClient.put<User>('/api/user/me', data);
    }

    static async updatePlan(plan: string): Promise<User> {
        return HttpClient.post<User>('/api/users/me/plan', { plan });
    }
}
