'use client';

import { Box, Container, Typography, Button } from '@mui/material';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import Link from 'next/link';

export function LandingNav({ dictionary, lang }: { dictionary: any; lang: string }) {
    const d = dictionary.landing.nav;
    return (
        <Box className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <Container maxWidth="lg" className="flex justify-between items-center py-3 sm:py-4">
                <Typography
                    component="div"
                    fontWeight="900"
                    color="primary"
                    className="tracking-tighter flex items-center gap-1 sm:gap-2 text-xl sm:text-2xl"
                >
                    <HealthAndSafetyIcon color="error" className="text-[28px] sm:text-[35px]" />
                    LifeTag
                </Typography>
                <Box className="flex gap-1 sm:gap-4 items-center">
                    <Button
                        variant="text"
                        color="inherit"
                        className="font-bold text-gray-500 min-w-0 px-1 sm:px-2 text-sm sm:text-base"
                        onClick={() => {
                            window.location.href = `/${lang === 'en' ? 'es' : 'en'}${window.location.pathname.replace(`/${lang}`, '')}`;
                        }}
                    >
                        {lang === 'en' ? 'EN' : 'ES'}
                    </Button>
                    <Link href={`/${lang}/login`} style={{ textDecoration: 'none' }}>
                        <Button variant="text" color="inherit" className="font-semibold text-gray-600 hidden sm:flex">
                            {d.login}
                        </Button>
                    </Link>
                    <Link href={`/${lang}/register`} style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            className="rounded-full px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all whitespace-nowrap"
                        >
                            {d.getStarted}
                        </Button>
                    </Link>
                </Box>
            </Container>
        </Box>
    );
}
