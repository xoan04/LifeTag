'use client';

import { Box, Container, Typography, Grid, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { HeroPhoneEmergencyScreen, LandingPhoneFrame } from '@/components/landing/LandingPhoneMockup';

export function LandingSolution({ dictionary, lang }: { dictionary: any; lang: string }) {
    const d = dictionary.landing.solution;

    return (
        <Box
            component="section"
            sx={{
                py: { xs: 10, md: 14 },
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 45%, #f1f5f9 100%)',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-15%',
                    right: '-8%',
                    width: '50%',
                    height: '75%',
                    background: 'radial-gradient(ellipse, rgba(220,38,38,0.1) 0%, transparent 60%)',
                    pointerEvents: 'none',
                },
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-10%',
                    left: '-5%',
                    width: '40%',
                    height: '55%',
                    background: 'radial-gradient(ellipse, rgba(71,85,105,0.06) 0%, transparent 58%)',
                    pointerEvents: 'none',
                },
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.35,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%2394a3b8' fill-opacity='0.4'/%3E%3C/svg%3E")`,
                    pointerEvents: 'none',
                }}
            />
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Grid container spacing={{ xs: 5, md: 7 }} alignItems="center">
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography
                            variant="overline"
                            sx={{
                                color: 'error.main',
                                fontWeight: 800,
                                letterSpacing: '0.22em',
                                fontSize: 11,
                                display: 'block',
                            }}
                        >
                            {d.overline}
                        </Typography>
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 800,
                                color: '#0f172a',
                                mt: 1.5,
                                mb: 2.5,
                                lineHeight: 1.1,
                                letterSpacing: '-0.035em',
                                fontSize: { xs: '1.85rem', md: '2.45rem' },
                            }}
                        >
                            {d.title}
                        </Typography>
                        <Box
                            sx={{
                                width: 64,
                                height: 4,
                                borderRadius: 2,
                                mb: 2.5,
                                background: 'linear-gradient(90deg, #dc2626, #f97316)',
                            }}
                        />
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'text.secondary',
                                fontSize: { xs: '1.02rem', sm: '1.08rem' },
                                lineHeight: 1.75,
                                mb: 3.5,
                            }}
                        >
                            {d.desc}
                        </Typography>
                        <Stack spacing={1.75}>
                            {d.points.map((item: string, i: number) => (
                                <Box
                                    key={i}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: 2,
                                        py: 2,
                                        px: 2.25,
                                        borderRadius: '16px',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        bgcolor: 'rgba(255,255,255,0.75)',
                                        border: '1px solid rgba(226,232,240,0.95)',
                                        boxShadow: '0 2px 16px rgba(15,23,42,0.04)',
                                        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                                        '&:hover': {
                                            transform: 'translateX(4px)',
                                            borderColor: 'rgba(252,165,165,0.45)',
                                            boxShadow: '0 8px 28px -6px rgba(220,38,38,0.1)',
                                        },
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            left: 0,
                                            top: 0,
                                            bottom: 0,
                                            width: 4,
                                            borderRadius: '16px 0 0 16px',
                                            bgcolor: i % 2 === 0 ? '#b91c1c' : '#7f1d1d',
                                        },
                                    }}
                                >
                                    <CheckCircleIcon sx={{ color: '#b91c1c', fontSize: 28, mt: 0.2, flexShrink: 0 }} />
                                    <Typography fontWeight={600} sx={{ color: '#334155', lineHeight: 1.55, flex: 1, minWidth: 0 }}>
                                        {item}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Stack
                            alignItems="center"
                            justifyContent="center"
                            sx={{
                                position: 'relative',
                                mt: { xs: 1, md: 0 },
                                mx: 'auto',
                                perspective: { md: '1200px' },
                            }}
                        >
                            <Box
                                className="pointer-events-none absolute left-1/2 top-[42%] z-0 -translate-x-1/2 -translate-y-1/2"
                                sx={{
                                    width: { xs: 260, sm: 300 },
                                    height: { xs: 380, sm: 420 },
                                    borderRadius: '50%',
                                    background: 'radial-gradient(ellipse at center, rgba(220,38,38,0.12) 0%, rgba(220,38,38,0.03) 50%, transparent 72%)',
                                }}
                            />
                            <Box sx={{ position: 'relative', zIndex: 1 }}>
                                <LandingPhoneFrame compact enable3d={false}>
                                    <HeroPhoneEmergencyScreen dictionary={dictionary} lang={lang} />
                                </LandingPhoneFrame>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
