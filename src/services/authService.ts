import { HttpClient } from '@/lib/httpClient';
import {
    RegisterRequest,
    LoginRequest,
    AuthResponse,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    MessageResponse,
} from '@/models/auth';

export class AuthService {
    static async register(data: RegisterRequest): Promise<AuthResponse> {
        return HttpClient.post<AuthResponse>('/api/auth/register', data);
    }

    static async login(data: LoginRequest): Promise<AuthResponse> {
        return HttpClient.post<AuthResponse>('/api/auth/login', data);
    }

    static async forgotPassword(data: ForgotPasswordRequest): Promise<MessageResponse> {
        return HttpClient.post<MessageResponse>('/api/auth/forgot-password', data);
    }

    static async resetPassword(data: ResetPasswordRequest): Promise<MessageResponse> {
        return HttpClient.post<MessageResponse>('/api/auth/reset-password', data);
    }
}
