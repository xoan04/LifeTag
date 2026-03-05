import { PlanCode } from '@/models/plan';

export interface User {
    id: string;
    email: string;
    subscriptionPlan: PlanCode;
    isSuperAccount: boolean;
    name?: string;
    subscriptionStatus?: string;
    createdAt?: string;
    updatedAt?: string;
}

/** Body para PUT /api/user/me */
export interface UpdateUserRequest {
    name?: string;
    email?: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ResetPasswordRequest {
    email: string;
    otp: string;
    newPassword: string;
}

export interface MessageResponse {
    message: string;
}
