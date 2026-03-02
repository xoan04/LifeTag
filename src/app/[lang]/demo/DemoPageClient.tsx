'use client';

import { Box, Typography, Button, Paper } from '@mui/material';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PublicEmergencyClient from '@/app/[lang]/id/[publicId]/PublicEmergencyClient';

export default function DemoPageClient({
    dictionary,
    lang,
    demoPublicId,
}: {
    dictionary: any;
    lang: string;
    demoPublicId: string;
}) {
    return (
        <Box className="min-h-screen bg-gray-50">
            {/* Banner demo */}
            <Paper
                elevation={0}
                className="sticky top-0 z-50 border-b border-gray-200 rounded-none bg-amber-50/95 backdrop-blur-sm"
            >
                <Box className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 max-w-lg mx-auto">
                    <Box className="text-center sm:text-left">
                        <Typography variant="subtitle1" fontWeight={700} color="text.primary">
                            {dictionary.demo.banner}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {dictionary.demo.bannerDesc}
                        </Typography>
                    </Box>
                    <Link href={`/${lang}`} style={{ textDecoration: 'none', flexShrink: 0 }}>
                        <Button
                            variant="outlined"
                            size="small"
                            startIcon={<ArrowBackIcon />}
                            className="rounded-full font-bold"
                        >
                            {dictionary.demo.backHome}
                        </Button>
                    </Link>
                </Box>
            </Paper>

            {/* Vista de emergencia (mismo componente que al escanear un LifeTag real) */}
            <PublicEmergencyClient
                dictionary={dictionary}
                lang={lang}
                params={{ publicId: demoPublicId }}
            />
        </Box>
    );
}
