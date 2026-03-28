'use client';

import { Box, Container, Typography, Button, Chip, Stack, Grid } from '@mui/material';
import Link from 'next/link';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import NfcIcon from '@mui/icons-material/Nfc';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

function HeroVisual({ dictionary }: { dictionary: any }) {
    const d = dictionary.landing.hero;
    return (
        <Box
            className="relative mx-auto w-full max-w-[420px] md:max-w-none"
            sx={{ perspective: '1200px' }}
        >
            {/* Anillos NFC — solo CSS */}
            <Box
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                sx={{ width: { xs: 320, sm: 380 }, height: { xs: 320, sm: 380 } }}
            >
                <Box
                    className="absolute inset-0 rounded-full border border-red-500/25"
                    sx={{ animation: 'lifetag-hero-pulse 3.2s ease-in-out infinite' }}
                />
                <Box
                    className="absolute inset-6 rounded-full border border-red-400/20"
                    sx={{
                        animation: 'lifetag-hero-pulse 3.2s ease-in-out infinite',
                        animationDelay: '0.6s',
                    }}
                />
                <Box
                    className="absolute inset-12 rounded-full border border-amber-200/10"
                    sx={{
                        animation: 'lifetag-hero-pulse 3.2s ease-in-out infinite',
                        animationDelay: '1.2s',
                    }}
                />
            </Box>

            {/* Teléfono / tarjeta de producto */}
            <Box
                className="relative z-[1] mx-auto"
                sx={{
                    transform: { md: 'rotateY(-8deg) rotateX(4deg)' },
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.4s ease',
                    '&:hover': { transform: { md: 'rotateY(-4deg) rotateX(2deg) scale(1.02)' } },
                }}
            >
                <Box
                    className="overflow-hidden rounded-[2rem] border shadow-2xl"
                    sx={{
                        borderColor: 'rgba(255,255,255,0.12)',
                        background: 'linear-gradient(165deg, #141820 0%, #0a0c10 55%, #11151c 100%)',
                        boxShadow: '0 40px 80px -20px rgba(0,0,0,0.75), 0 0 0 1px rgba(239,68,68,0.15) inset',
                    }}
                >
                    {/* barra tipo “notch” */}
                    <Box className="flex justify-center pt-3 pb-1">
                        <Box className="h-1.5 w-16 rounded-full bg-white/10" />
                    </Box>

                    <Box className="px-5 pb-6 pt-2">
                        <Stack direction="row" alignItems="center" justifyContent="space-between" className="mb-5">
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Box
                                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                                    sx={{ background: 'linear-gradient(135deg, #dc2626, #991b1b)' }}
                                >
                                    <LocalHospitalIcon sx={{ fontSize: 22, color: '#fff' }} />
                                </Box>
                                <Box>
                                    <Typography variant="caption" className="block uppercase tracking-[0.2em] text-red-300/90">
                                        LifeTag
                                    </Typography>
                                    <Typography variant="body2" fontWeight={700} className="text-white/95">
                                        {d.visualScan}
                                    </Typography>
                                </Box>
                            </Stack>
                            <Chip
                                icon={<NfcIcon sx={{ fontSize: '18px !important', color: '#fecaca !important' }} />}
                                label={d.visualNfc}
                                size="small"
                                sx={{
                                    height: 28,
                                    borderColor: 'rgba(248,113,113,0.35)',
                                    color: '#fecaca',
                                    bgcolor: 'rgba(127,29,29,0.35)',
                                    fontWeight: 700,
                                    fontSize: 11,
                                    letterSpacing: 0.3,
                                }}
                                variant="outlined"
                            />
                        </Stack>

                        {/* Mock perfil */}
                        <Box
                            className="rounded-2xl border p-4"
                            sx={{
                                borderColor: 'rgba(255,255,255,0.08)',
                                background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)',
                            }}
                        >
                            <Stack direction="row" spacing={2} alignItems="flex-start">
                                <Box
                                    className="flex shrink-0 items-center justify-center rounded-xl bg-white p-2"
                                    sx={{ boxShadow: '0 4px 20px rgba(0,0,0,0.25)' }}
                                >
                                    <QrCode2Icon sx={{ fontSize: 56, color: '#0f172a' }} />
                                </Box>
                                <Box className="min-w-0 flex-1">
                                    <Typography variant="caption" className="text-emerald-400/90" fontWeight={700}>
                                        ● LIVE
                                    </Typography>
                                    <Typography variant="subtitle1" fontWeight={800} className="mt-1 leading-snug text-white">
                                        {d.visualCardTitle}
                                    </Typography>
                                    <Typography variant="body2" className="mt-2 leading-relaxed text-white/45">
                                        {d.visualCardSub}
                                    </Typography>
                                </Box>
                            </Stack>

                            <Box
                                className="mt-4 h-2 overflow-hidden rounded-full"
                                sx={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                            >
                                <Box
                                    className="h-full w-2/3 rounded-full"
                                    sx={{
                                        background: 'linear-gradient(90deg, #ef4444, #f97316)',
                                        animation: 'lifetag-hero-shine 2.5s ease-in-out infinite',
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* etiqueta flotante */}
                <Box
                    className="absolute -right-1 top-24 z-[2] hidden rounded-lg border px-3 py-2 sm:block"
                    sx={{
                        borderColor: 'rgba(255,255,255,0.12)',
                        backgroundColor: 'rgba(8,10,13,0.85)',
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
                    }}
                >
                    <Typography variant="caption" className="block text-[10px] font-semibold uppercase tracking-widest text-red-300/90">
                        {d.statChannels}
                    </Typography>
                    <Typography variant="caption" className="text-white/55">
                        {d.visualBadgeLine}
                    </Typography>
                </Box>
            </Box>

        </Box>
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
                        <HeroVisual dictionary={dictionary} />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
