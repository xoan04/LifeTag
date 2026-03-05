import { HttpClient } from '@/lib/httpClient';
import {
    Device,
    RegisterDeviceRequest,
    RegisterDeviceResponse,
    ActivateDeviceRequest,
    ActivateDeviceResponse,
} from '@/models/device';

export class DeviceService {
    /**
     * Lista todos los dispositivos del usuario autenticado (con perfil resumido embebido).
     * GET /api/devices
     */
    static async getDevices(): Promise<Device[]> {
        return HttpClient.get<Device[]>('/api/devices');
    }

    /**
     * Registra un dispositivo por token. Queda en estado UNACTIVATED sin perfil asignado.
     * Paso 1 del flujo de activación.
     * POST /api/devices
     */
    static async registerDevice(data: RegisterDeviceRequest): Promise<RegisterDeviceResponse> {
        return HttpClient.post<RegisterDeviceResponse>('/api/devices', data);
    }

    /**
     * Activa y vincula el dispositivo a un perfil.
     * Paso 2 del flujo de activación.
     * POST /api/devices/activate
     */
    static async activateDevice(data: ActivateDeviceRequest): Promise<ActivateDeviceResponse> {
        return HttpClient.post<ActivateDeviceResponse>('/api/devices/activate', data);
    }

    /**
     * Elimina un dispositivo por ID.
     * DELETE /api/devices/:deviceId
     */
    static async deleteDevice(deviceId: string): Promise<void> {
        return HttpClient.delete<void>(`/api/devices/${deviceId}`);
    }

    /**
     * Reporta un dispositivo como perdido.
     * POST /api/devices/:deviceId/report-lost
     */
    static async reportLost(deviceId: string): Promise<void> {
        return HttpClient.post<void>(`/api/devices/${deviceId}/report-lost`, {});
    }
}
