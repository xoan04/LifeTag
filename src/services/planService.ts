import { HttpClient } from '@/lib/httpClient';
import { Plan } from '@/models/plan';

export class PlanService {
    /**
     * Lista todos los planes disponibles.
     * Endpoint público: no requiere autenticación.
     * GET /api/plans
     */
    static async getPlans(): Promise<Plan[]> {
        return HttpClient.get<Plan[]>('/api/plans');
    }
}
