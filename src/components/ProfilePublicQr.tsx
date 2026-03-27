'use client';

import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import QRCode from 'react-qr-code';

/**
 * QR visual con la URL pública del perfil (no es un dispositivo registrado).
 * Misma ruta que el botón «Ver perfil público»: /[lang]/id/[profileId]
 */
export function ProfilePublicQr({
    profileId,
    lang,
    caption,
}: {
    profileId: string;
    lang: string;
    caption: string;
}) {
    const [url, setUrl] = useState('');

    useEffect(() => {
        setUrl(`${window.location.origin}/${lang}/id/${profileId}`);
    }, [profileId, lang]);

    if (!url) return null;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.5,
                py: 1,
                px: 1,
                bgcolor: 'action.hover',
                borderRadius: 1,
            }}
        >
            <Box sx={{ bgcolor: 'white', p: 0.75, borderRadius: 1 }}>
                <QRCode value={url} size={100} level="M" />
            </Box>
            <Typography variant="caption" color="text.secondary" textAlign="center" sx={{ maxWidth: 140 }}>
                {caption}
            </Typography>
        </Box>
    );
}
