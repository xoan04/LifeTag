import { DeviceService } from '@/services/deviceService';
import { PlanUseCases } from '@/useCases/planUseCases';
import {
    Device,
    RegisterDeviceRequest,
    RegisterDeviceResponse,
    ActivateDeviceRequest,
    ActivateDeviceResponse,
} from '@/models/device';

// ─── Mapa de errores del backend → claves de diccionario ────────────────────
// Permite que el componente muestre dictionary.devices.register.errorXxx
// en lugar de mostrar el mensaje en inglés raw que llega del backend.

const REGISTER_ERROR_MAP: Record<string, string> = {
    'already registered': 'errorAlreadyExists',
    'demo': 'errorDemo',
    'limit': 'errorLimit',
};

const ACTIVATE_ERROR_MAP: Record<string, string> = {
    'not found': 'errorNotFound',
    'already': 'errorAlreadyActive',
    'limit': 'errorProfileLimit',
};

function mapError(
    message: string,
    errorMap: Record<string, string>,
    fallback: string
): string {
    const lower = message.toLowerCase();
    for (const [key, dictKey] of Object.entries(errorMap)) {
        if (lower.includes(key)) return dictKey;
    }
    return fallback;
}

// ─── Use Cases ───────────────────────────────────────────────────────────────

export class DeviceUseCases {
    /**
     * Lista todos los dispositivos del usuario con su perfil resumido embebido.
     * GET /api/devices
     */
    static async getDevices(): Promise<Device[]> {
        return DeviceService.getDevices();
    }

    /**
     * Paso 1 del flujo de activación: registra el dispositivo por token.
     * Verifica el límite de dispositivos del plan antes de llamar a la API.
     *
     * @returns La respuesta del backend con { message, device }.
     * @throws Error con una clave de diccionario (devices.register.errorXxx) para mostrar el toast correcto.
     */
    static async registerDevice(data: RegisterDeviceRequest): Promise<RegisterDeviceResponse> {
        // Verificación local de límites (mejora UX, el backend también valida)
        const membership = await PlanUseCases.getMembership();
        if (!PlanUseCases.canActivateDevice(membership)) {
            throw new Error(
                membership.isDemo ? '__errorDemo' : '__errorLimit'
            );
        }

        try {
            return await DeviceService.registerDevice(data);
        } catch (err: any) {
            const dictKey = mapError(err?.message ?? '', REGISTER_ERROR_MAP, 'errorGeneric');
            throw new Error(`__${dictKey}`);
        }
    }

    /**
     * Paso 2 del flujo de activación: vincula el dispositivo a un perfil.
     * POST /api/devices/activate
     *
     * @throws Error con una clave de diccionario (devices.activate.errorXxx).
     */
    static async activateDevice(data: ActivateDeviceRequest): Promise<ActivateDeviceResponse> {
        try {
            return await DeviceService.activateDevice(data);
        } catch (err: any) {
            const dictKey = mapError(err?.message ?? '', ACTIVATE_ERROR_MAP, 'errorGeneric');
            throw new Error(`__${dictKey}`);
        }
    }

    /**
     * Flujo completo en un solo paso: registra y luego activa el dispositivo.
     * Útil cuando el usuario ya tiene el token y el perfil seleccionado.
     *
     * @returns El device ya en estado ACTIVE con profileId asignado.
     * @throws El mismo tipo de Error con clave de diccionario que los métodos individuales.
     */
    static async registerAndActivate(
        deviceToken: string,
        deviceType: 'QR_TAG' | 'NFC_TAG',
        profileId: string
    ): Promise<Device> {
        await this.registerDevice({ deviceToken, deviceType });
        const { device } = await this.activateDevice({ deviceToken, profileId, deviceType });
        return device;
    }

    /**
     * Elimina un dispositivo por ID.
     * DELETE /api/devices/:deviceId
     */
    static async deleteDevice(deviceId: string): Promise<void> {
        return DeviceService.deleteDevice(deviceId);
    }

    /**
     * Reporta un dispositivo como perdido.
     * POST /api/devices/:deviceId/report-lost
     */
    static async reportLost(deviceId: string): Promise<void> {
        return DeviceService.reportLost(deviceId);
    }

    // ─── Helper para resolver error keys en el componente ──────────────────

    /**
     * Dado un Error lanzado por DeviceUseCases, retorna el mensaje correcto
     * desde el diccionario usando la sección indicada ('register' | 'activate').
     *
     * Uso en componente:
     *   } catch (err) {
     *     setToast({ type: 'error', text: DeviceUseCases.resolveErrorMessage(err, dict.devices.register) });
     *   }
     */
    static resolveErrorMessage(
        err: unknown,
        section: Record<string, string>
    ): string {
        if (err instanceof Error && err.message.startsWith('__')) {
            const key = err.message.slice(2); // quita el prefijo '__'
            return section[key] ?? section['errorGeneric'] ?? err.message;
        }
        return section['errorGeneric'] ?? 'Error inesperado.';
    }
}
