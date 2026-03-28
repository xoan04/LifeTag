'use client';

import { Box, Container, Typography, Button } from '@mui/material';
import Link from 'next/link';

export function LandingFinalCta({ dictionary, lang }: { dictionary: any; lang: string }) {
    const d = dictionary.landing.cta;
    return (
        <Box className="py-24 bg-red-900 text-center relative overflow-hidden">
            <div className="absolute top-[-50%] left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-red-800 rounded-full blur-3xl opacity-50 z-0" />
            <Container maxWidth="md" className="relative z-10 flex flex-col items-center">
                <Typography variant="h2" fontWeight={900} className="text-white mb-6 tracking-tight">
                    {d.title}
                </Typography>
                <Typography variant="h6" className="text-red-100 font-normal mb-10 max-w-2xl">
                    {d.desc}
                </Typography>
                <Link href={`/${lang}/register`} style={{ textDecoration: 'none' }}>
                    <Button
                        variant="contained"
                        size="large"
                        className="bg-white text-red-900 hover:bg-gray-100 rounded-full px-12 py-4 font-bold text-lg shadow-2xl"
                    >
                        {d.button}
                    </Button>
                </Link>
            </Container>
        </Box>
    );
}
