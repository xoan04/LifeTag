import { HttpClient } from '@/lib/httpClient';
import {
    Device,
    RegisterDeviceRequest,
    RegisterDeviceResponse,
    ActivateDeviceRequest,
    ActivateDeviceResponse,
    normalizeRegisteredDevice,
} from '@/models/device';

export class DeviceService {
    /**
     * Lista todos los dispositivos del usuario autenticado (con perfil resumido embebido).
     * GET /api/devices
     */
    static async getDevices(): Promise<Device[]> {
        const list = await HttpClient.get<Device[]>('/api/devices');
        // La API podría devolver QR_TAG en datos antiguos; en el producto el QR público no es un device.
        return list.map((d) => normalizeRegisteredDevice(d));
    }

    /**
     * Registra un dispositivo por token. Queda en estado UNACTIVATED sin perfil asignado.
     * Paso 1 del flujo de activación.
     * POST /api/devices
     */
    static async registerDevice(data: RegisterDeviceRequest): Promise<RegisterDeviceResponse> {
        const res = await HttpClient.post<RegisterDeviceResponse>('/api/devices', data);
        return { ...res, device: normalizeRegisteredDevice(res.device) };
    }

    /**
     * Activa y vincula el dispositivo a un perfil.
     * Paso 2 del flujo de activación.
     * POST /api/devices/activate
     */
    static async activateDevice(data: ActivateDeviceRequest): Promise<ActivateDeviceResponse> {
        const res = await HttpClient.post<ActivateDeviceResponse>('/api/devices/activate', data);
        return { ...res, device: normalizeRegisteredDevice(res.device) };
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
