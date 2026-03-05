/** Códigos de plan reconocidos por el backend */
export type PlanCode = 'FREE' | 'ESSENTIAL' | 'FAMILY' | 'PRO';

/**
 * Plan de suscripción tal como lo retorna GET /api/plans.
 * Es la fuente de verdad sobre límites y features.
 */
export interface Plan {
    id: string;
    code: PlanCode;
    displayName: string;
    /** 0 en plan FREE (demo). */
    maxProfiles: number;
    /** 0 en plan FREE (demo). 999 se trata como ilimitado en PRO. */
    maxDevices: number;
    /** Precio en centavos (USD). 0 para FREE. */
    priceCents: number;
    /** Si es true, el plan es solo de demostración (solo lectura). */
    isDemo: boolean;
    /** Lista de features descriptivas para mostrar en pricing page. */
    features: string[];
    createdAt: string;
    updatedAt: string;
}

/**
 * Respuesta de GET /api/user/me/membership.
 * Combina el plan del usuario con los contadores actuales de uso.
 */
export interface MembershipResponse {
    subscriptionPlan: PlanCode;
    subscriptionStatus: string;
    /** Si es true, el usuario no tiene límites y puede acceder a endpoints Admin. */
    isSuperAccount: boolean;
    /** Heredado del Plan asociado. true → usuario solo puede leer. */
    isDemo: boolean;
    maxProfiles: number;
    maxDevices: number;
    profilesUsed: number;
    devicesUsed: number;
}
