import { EmergencyService } from '@/services/emergencyService';
import { EmergencyProfile, EmergencyProfileParams } from '@/models/emergencyProfile';

export class EmergencyUseCases {
    /**
     * Obtiene el perfil de emergencia público de un dispositivo/perfil.
     * Gestiona las reglas de negocio u orquestación si fueran necesarias en el futuro
     * antes de llamar al endpoint público.
     */
    static async getEmergencyProfile(params: EmergencyProfileParams): Promise<EmergencyProfile> {
        return EmergencyService.getEmergencyProfile(params);
    }
}
