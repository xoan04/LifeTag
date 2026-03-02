import { AuthService } from '@/services/authService';
import {
    RegisterRequest,
    LoginRequest,
    AuthResponse,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    MessageResponse,
} from '@/models/auth';

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

    /**
     * Solicita envío del código de verificación al email.
     * Respuesta del API: { message: "If an account exists..." }
     */
    static async forgotPasswordUser(data: ForgotPasswordRequest): Promise<MessageResponse> {
        if (!data.email?.trim()) {
            throw new Error('Email is required');
        }
        return AuthService.forgotPassword({ email: data.email.trim() });
    }

    /**
     * Restablece la contraseña con el OTP recibido por email.
     * Respuesta del API: { message: "Password has been reset successfully." }
     */
    static async resetPasswordUser(data: ResetPasswordRequest): Promise<MessageResponse> {
        if (!data.email?.trim() || !data.otp?.trim() || !data.newPassword?.trim()) {
            throw new Error('Email, code and new password are required');
        }
        return AuthService.resetPassword({
            email: data.email.trim(),
            otp: data.otp.trim(),
            newPassword: data.newPassword.trim(),
        });
    }

    /**
     * Cierra sesión: borra token y todo lo almacenado con prefijo lifeTag_
     * (cookie para middleware + localStorage).
     */
    static logout(): void {
        if (typeof window === 'undefined') return;

        // Borrar cookie (middleware la usa para rutas protegidas)
        document.cookie = 'lifeTag_token=; path=/; max-age=0; SameSite=Lax';

        // Borrar todas las claves de LifeTag en localStorage
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key?.startsWith('lifeTag_')) keysToRemove.push(key);
        }
        keysToRemove.forEach((key) => localStorage.removeItem(key));
    }
}
