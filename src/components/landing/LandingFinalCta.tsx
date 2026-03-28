'use client';

import { Box, Container, Typography, Button } from '@mui/material';
import Link from 'next/link';

export function LandingFinalCta({ dictionary, lang }: { dictionary: any; lang: string }) {
    const d = dictionary.landing.cta;
    return (
        <Box
            component="section"
            sx={{
                py: { xs: 10, md: 12 },
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(165deg, #7f1d1d 0%, #991b1b 35%, #b91c1c 100%)',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '-45%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 'min(140%, 1000px)',
                    height: '85%',
                    borderRadius: '50%',
                    background: 'radial-gradient(ellipse, rgba(254,202,202,0.35) 0%, transparent 55%)',
                    pointerEvents: 'none',
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '-30%',
                    left: '-15%',
                    width: '50%',
                    height: '60%',
                    borderRadius: '50%',
                    background: 'radial-gradient(ellipse, rgba(0,0,0,0.15) 0%, transparent 60%)',
                    pointerEvents: 'none',
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.04,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    pointerEvents: 'none',
                }}
            />
            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: 900,
                        color: '#fff',
                        mb: 3,
                        letterSpacing: '-0.04em',
                        lineHeight: 1.1,
                        fontSize: { xs: '2rem', sm: '2.75rem', md: '3.25rem' },
                        textShadow: '0 2px 24px rgba(0,0,0,0.15)',
                    }}
                >
                    {d.title}
                </Typography>
                <Typography variant="h6" sx={{ color: 'rgba(254,226,226,0.95)', fontWeight: 400, mb: 5, maxWidth: 560, lineHeight: 1.65 }}>
                    {d.desc}
                </Typography>
                <Link href={`/${lang}/register`} style={{ textDecoration: 'none' }}>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            bgcolor: '#fff',
                            color: '#7f1d1d',
                            fontWeight: 800,
                            borderRadius: '999px',
                            px: 6,
                            py: 2,
                            fontSize: '1.05rem',
                            textTransform: 'none',
                            boxShadow: '0 16px 40px rgba(0,0,0,0.2)',
                            '&:hover': { bgcolor: '#fef2f2', boxShadow: '0 20px 48px rgba(0,0,0,0.25)' },
                        }}
                    >
                        {d.button}
                    </Button>
                </Link>
            </Container>
        </Box>
    );
}
