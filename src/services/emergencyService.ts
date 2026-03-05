import { HttpClient } from '@/lib/httpClient';
import { EmergencyProfile, EmergencyProfileParams } from '@/models/emergencyProfile';

export class EmergencyService {
    /**
     * Obtiene el perfil de emergencia público de un dispositivo/perfil.
     * Endpoint público — no requiere autenticación.
     * GET /api/public/emergency-profile/:profileId?deviceToken=&lat=&lng=
     */
    static async getEmergencyProfile(params: EmergencyProfileParams): Promise<EmergencyProfile> {
        const { publicId, deviceToken, lat, lng } = params;

        const query = new URLSearchParams();
        if (deviceToken) query.set('deviceToken', deviceToken);
        if (lat !== undefined) query.set('lat', String(lat));
        if (lng !== undefined) query.set('lng', String(lng));

        const qs = query.toString();
        // LLAMADA AL ENDPOINT: Se le pasa el publicId en la URL. El backend debe
        // buscar por deviceToken o profileId usando este path variable.
        const url = `/api/public/emergency-profile/${publicId}${qs ? `?${qs}` : ''}`;

        return HttpClient.get<EmergencyProfile>(url);
    }
}
