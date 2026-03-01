import { HttpClient } from '@/lib/httpClient';
import { RegisterRequest, LoginRequest, AuthResponse } from '@/models/auth';

export class AuthService {
    static async register(data: RegisterRequest): Promise<AuthResponse> {
        return HttpClient.post<AuthResponse>('/api/auth/register', data);
    }

    static async login(data: LoginRequest): Promise<AuthResponse> {
        return HttpClient.post<AuthResponse>('/api/auth/login', data);
    }
}
