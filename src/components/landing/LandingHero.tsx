'use client';

import { Box, Container, Typography, Button, Chip, Stack, Grid } from '@mui/material';
import Link from 'next/link';
import { HeroPhoneEmergencyScreen, LandingPhoneFrame } from '@/components/landing/LandingPhoneMockup';

function HeroVisual({ dictionary, lang }: { dictionary: any; lang: string }) {
    const d = dictionary.landing.hero;

    const callout = (
        <Box
            sx={{
                borderRadius: 2,
                border: '1px solid rgba(255,255,255,0.12)',
                bgcolor: 'rgba(8,10,13,0.9)',
                backdropFilter: 'blur(12px)',
                px: 2,
                py: 1.25,
                boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
                textAlign: 'center',
                maxWidth: 260,
            }}
        >
            <Typography variant="caption" sx={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(252,165,165,0.95)' }}>
                {d.statChannels}
            </Typography>
            <Typography variant="caption" sx={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', mt: 0.25, display: 'block' }}>
                {d.visualBadgeLine}
            </Typography>
        </Box>
    );

    return (
        <Stack
            alignItems="center"
            spacing={2.5}
            className="mx-auto w-full"
            sx={{
                position: 'relative',
                perspective: '1400px',
                maxWidth: { xs: 'min(100%, 280px)', sm: 'min(100%, 320px)' },
            }}
        >
            {/* Halo suave (sin rectángulos concéntricos) */}
            <Box
                className="pointer-events-none absolute left-1/2 top-[30%] z-0 -translate-x-1/2 -translate-y-1/2"
                sx={{
                    width: { xs: 280, sm: 320 },
                    height: { xs: 400, sm: 440 },
                    borderRadius: '50%',
                    background: 'radial-gradient(ellipse at center, rgba(220,38,38,0.16) 0%, rgba(220,38,38,0.04) 45%, transparent 70%)',
                    animation: 'lifetag-hero-pulse 4s ease-in-out infinite',
                }}
            />

            <LandingPhoneFrame enable3d>
                <HeroPhoneEmergencyScreen dictionary={dictionary} lang={lang} />
            </LandingPhoneFrame>

            {/* Callout debajo del teléfono — no solapa el marco */}
            <Box sx={{ position: 'relative', zIndex: 2 }}>{callout}</Box>
        </Stack>
    );
}

export function LandingHero({ dictionary, lang }: { dictionary: any; lang: string }) {
    const d = dictionary.landing.hero;
    const stats = [d.statNoApp, d.statChannels, d.statPrivacy];

    return (
        <Box
            component="section"
            aria-labelledby="landing-hero-heading"
            className="relative isolate overflow-hidden"
            sx={{
                backgroundColor: '#06080b',
                color: '#f8fafc',
            }}
        >
            {/* Brillo y textura */}
            <Box
                className="pointer-events-none absolute inset-0"
                sx={{
                    background: `
            radial-gradient(ellipse 80% 55% at 70% 20%, rgba(185, 28, 28, 0.22), transparent 55%),
            radial-gradient(ellipse 60% 40% at 15% 80%, rgba(30, 58, 95, 0.18), transparent 50%)
          `,
                }}
            />
            <Box
                className="pointer-events-none absolute inset-0 opacity-[0.35]"
                sx={{
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)
          `,
                    backgroundSize: '48px 48px',
                }}
            />
            <Box
                className="pointer-events-none absolute inset-0"
                sx={{
                    background: 'linear-gradient(180deg, transparent 0%, rgba(6,8,11,0.92) 88%, #f9fafb 100%)',
                }}
            />

            <Container maxWidth="lg" className="relative z-[1] px-4 pb-20 pt-20 sm:pb-24 sm:pt-24 md:pb-28 md:pt-28">
                <Grid container spacing={{ xs: 5, md: 6 }} alignItems="center">
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Stack spacing={3}>
                            <Chip
                                label={d.badge}
                                size="small"
                                sx={{
                                    alignSelf: 'flex-start',
                                    borderColor: 'rgba(248,113,113,0.45)',
                                    color: '#fecaca',
                                    bgcolor: 'rgba(127,29,29,0.4)',
                                    fontWeight: 700,
                                    letterSpacing: '0.12em',
                                    fontSize: 10,
                                    height: 28,
                                    borderWidth: 1,
                                }}
                                variant="outlined"
                            />

                            <Typography
                                id="landing-hero-heading"
                                component="h1"
                                sx={{
                                    fontWeight: 800,
                                    letterSpacing: '-0.035em',
                                    lineHeight: 1.05,
                                    fontSize: { xs: '2.35rem', sm: '2.85rem', md: '3.35rem' },
                                }}
                            >
                                <Box
                                    component="span"
                                    sx={{
                                        display: 'block',
                                        color: 'rgba(248,250,252,0.96)',
                                        textShadow: '0 2px 40px rgba(0,0,0,0.35)',
                                    }}
                                >
                                    {d.title1}
                                </Box>
                                <Box
                                    component="span"
                                    sx={{
                                        display: 'block',
                                        mt: 0.75,
                                        background: 'linear-gradient(105deg, #fca5a5 0%, #ef4444 38%, #f87171 72%, #fecaca 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}
                                >
                                    {d.title2}
                                </Box>
                            </Typography>

                            <Typography
                                sx={{
                                    color: 'rgba(226,232,240,0.58)',
                                    fontSize: { xs: '1.05rem', md: '1.125rem' },
                                    lineHeight: 1.7,
                                    maxWidth: 540,
                                    fontWeight: 400,
                                }}
                            >
                                {d.subtitle}
                            </Typography>

                            <Stack direction="row" flexWrap="wrap" spacing={1} sx={{ pt: 0.5, gap: 1 }}>
                                {stats.map((label) => (
                                    <Box
                                        key={label}
                                        component="span"
                                        sx={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            px: 1.75,
                                            py: 0.75,
                                            borderRadius: 1,
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            bgcolor: 'rgba(255,255,255,0.03)',
                                            color: 'rgba(226,232,240,0.75)',
                                            fontSize: 11,
                                            fontWeight: 600,
                                            letterSpacing: '0.06em',
                                            textTransform: 'uppercase',
                                        }}
                                    >
                                        {label}
                                    </Box>
                                ))}
                            </Stack>

                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 1.5 }}>
                                <Link href={`/${lang}/register`} style={{ textDecoration: 'none' }}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        sx={{
                                            py: 1.75,
                                            px: 4,
                                            fontWeight: 800,
                                            fontSize: '1rem',
                                            borderRadius: '12px',
                                            textTransform: 'none',
                                            boxShadow: '0 12px 40px -8px rgba(220,38,38,0.55)',
                                            background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #f87171 0%, #dc2626 100%)',
                                                boxShadow: '0 16px 48px -8px rgba(220,38,38,0.65)',
                                            },
                                        }}
                                    >
                                        {d.getStarted}
                                    </Button>
                                </Link>
                                <Link href={`/${lang}/demo`} style={{ textDecoration: 'none' }}>
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        fullWidth
                                        sx={{
                                            py: 1.75,
                                            px: 4,
                                            fontWeight: 700,
                                            fontSize: '1rem',
                                            borderRadius: '12px',
                                            textTransform: 'none',
                                            color: 'rgba(248,250,252,0.92)',
                                            borderColor: 'rgba(255,255,255,0.22)',
                                            borderWidth: 2,
                                            '&:hover': {
                                                borderColor: 'rgba(255,255,255,0.4)',
                                                bgcolor: 'rgba(255,255,255,0.05)',
                                            },
                                        }}
                                    >
                                        {d.viewDemo}
                                    </Button>
                                </Link>
                            </Stack>
                        </Stack>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <HeroVisual dictionary={dictionary} lang={lang} />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
