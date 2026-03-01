const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'; // Default fallback

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
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            return await response.json() as T;
        } catch (error) {
            console.error('HttpClient Error:', error);
            throw error;
        }
    }
}
