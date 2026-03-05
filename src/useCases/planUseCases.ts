import { PlanService } from '@/services/planService';
import { UserService } from '@/services/userService';
import { Plan, MembershipResponse } from '@/models/plan';

export class PlanUseCases {
    /**
     * Lista todos los planes disponibles para la página de precios.
     * Endpoint público — no requiere autenticación.
     */
    static async getPlans(): Promise<Plan[]> {
        return PlanService.getPlans();
    }

    /**
     * Obtiene la membresía del usuario autenticado actual con contadores de uso.
     * Incluye: plan, isSuperAccount, isDemo, maxProfiles, maxDevices, profilesUsed, devicesUsed.
     */
    static async getMembership(): Promise<MembershipResponse> {
        return UserService.getMembership();
    }

    /**
     * Retorna true si el usuario puede crear un perfil nuevo.
     * Reglas:
     *  - isSuperAccount → siempre puede (sin límite).
     *  - Plan isDemo (FREE sin supercuenta) → nunca puede.
     *  - Resto → puede si profilesUsed < maxProfiles.
     */
    static canCreateProfile(membership: MembershipResponse): boolean {
        if (membership.isSuperAccount) return true;
        if (membership.isDemo) return false;
        return membership.profilesUsed < membership.maxProfiles;
    }

    /**
     * Retorna true si el usuario puede activar un dispositivo nuevo.
     * Reglas iguales que canCreateProfile pero para dispositivos.
     */
    static canActivateDevice(membership: MembershipResponse): boolean {
        if (membership.isSuperAccount) return true;
        if (membership.isDemo) return false;
        return membership.devicesUsed < membership.maxDevices;
    }

    /**
     * Mensaje de error estándar cuando el plan es demo.
     * Equivale al que retorna el backend: úsalo en UI para mostrar feedback.
     */
    static demoPlanMessage(): string {
        return 'Tu plan Gratis es solo de demostración. Mejora tu plan.';
    }
}
