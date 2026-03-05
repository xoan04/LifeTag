/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    // Exponer al cliente para que ENABLE_SCANNER (QR/NFC) funcione
    env: {
        NEXT_PUBLIC_ENABLE_SCANNER: process.env.NEXT_PUBLIC_ENABLE_SCANNER ?? '',
    },
};

export default nextConfig;
