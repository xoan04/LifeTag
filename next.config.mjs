import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Lee NEXT_PUBLIC_ENABLE_SCANNER de .env.local */
function readEnableScanner() {
    const fromEnv = process.env.NEXT_PUBLIC_ENABLE_SCANNER;
    if (fromEnv != null && String(fromEnv).trim() !== '') return String(fromEnv).trim();
    const envPath = path.resolve(process.cwd(), '.env.local');
    if (!fs.existsSync(envPath)) {
        console.log('[next.config] .env.local no existe en', envPath);
        return '';
    }
    try {
        let content = fs.readFileSync(envPath, 'utf8');
        content = content.replace(/\r\n/g, '\n').replace(/^\uFEFF/, '');
        const line = content.split('\n').find((l) => /NEXT_PUBLIC_ENABLE_SCANNER\s*=/.test(l));
        if (!line) {
            console.log('[next.config] Línea NEXT_PUBLIC_ENABLE_SCANNER no encontrada. Contenido:', JSON.stringify(content.slice(0, 120)));
            return '';
        }
        const value = line.replace(/^.*=\s*/, '').split('#')[0].trim().replace(/^["']|["']$/g, '');
        console.log('[next.config] NEXT_PUBLIC_ENABLE_SCANNER =', JSON.stringify(value));
        return value;
    } catch (e) {
        console.warn('[next.config] Error leyendo .env.local:', e.message);
        return '';
    }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    env: {
        NEXT_PUBLIC_ENABLE_SCANNER: readEnableScanner(),
    },
};

export default nextConfig;
