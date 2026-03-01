import { AuthService } from '@/services/authService';
import { RegisterRequest, LoginRequest, AuthResponse } from '@/models/auth';

export class AuthUseCases {
    static async registerUser(data: RegisterRequest): Promise<AuthResponse> {
        if (!data.email || !data.password || !data.name) {
            throw new Error('All fields are required');
        }

        const response = await AuthService.register(data);

        if (response.token && typeof window !== 'undefined') {
            this.setSession(response);
        }

        return response;
    }

    static async loginUser(data: LoginRequest): Promise<AuthResponse> {
        if (!data.email || !data.password) {
            throw new Error('Email and password are required');
        }

        const response = await AuthService.login(data);

        if (response.token && typeof window !== 'undefined') {
            this.setSession(response);
        }

        return response;
    }

    private static setSession(response: AuthResponse) {
        localStorage.setItem('lifeTag_token', response.token);
        localStorage.setItem('lifeTag_user', JSON.stringify(response.user));

        // Set cookie for middleware access
        // Secure=true in production, etc
        document.cookie = `lifeTag_token=${response.token}; path=/; max-age=604800; SameSite=Lax`;
    }
}
