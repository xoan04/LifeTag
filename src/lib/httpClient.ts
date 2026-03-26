// En el navegador: solo `/api/...` (mismo origen → sin CORS). Next reenvía al backend vía `src/app/api/[...path]/route.ts`.
// En servidor (SSR): URL absoluta al API.
const BASE_URL =
    typeof window !== 'undefined'
        ? ''
        : (process.env.NEXT_PUBLIC_API_URL || 'https://apilifetag.kodelabs.dev').replace(/\/$/, '');

export class HttpClient {
    static async get<T>(url: string, headers: HeadersInit = {}): Promise<T> {
        return this.request<T>(url, { method: 'GET', headers });
    }

    static async post<T>(url: string, body: any, headers: HeadersInit = {}): Promise<T> {
        return this.request<T>(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...headers },
            body: JSON.stringify(body),
        });
    }

    static async put<T>(url: string, body: any, headers: HeadersInit = {}): Promise<T> {
        return this.request<T>(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...headers },
            body: JSON.stringify(body),
        });
    }

    static async delete<T>(url: string, headers: HeadersInit = {}): Promise<T> {
        return this.request<T>(url, { method: 'DELETE', headers });
    }

    private static async request<T>(url: string, options: RequestInit): Promise<T> {
        const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;

        // Add authorization header if token exists
        const token = typeof window !== 'undefined' ? localStorage.getItem('lifeTag_token') : null;
        if (token) {
            options.headers = {
                ...options.headers,
                'Authorization': `Bearer ${token}`
            };
        }

        try {
            const response = await fetch(fullUrl, options);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({})) as {
                    message?: string;
                    error?: string;
                };
                const msg =
                    errorData.message ||
                    errorData.error ||
                    `HTTP error! status: ${response.status}`;
                throw new Error(msg);
            }
            return await response.json() as T;
        } catch (error) {
            console.error('HttpClient Error:', error);
            throw error;
        }
    }
}
