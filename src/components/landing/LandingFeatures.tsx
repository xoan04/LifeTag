'use client';

import type { ReactNode } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import LockIcon from '@mui/icons-material/Lock';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PetsIcon from '@mui/icons-material/Pets';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

/** Acento único de marca (rojo LifeTag) — evita arcoíris en la cuadrícula */
const BRAND_ACCENT = {
    stripe: '#b91c1c',
    iconRing: 'linear-gradient(135deg, #fecaca 0%, #f87171 40%, #dc2626 85%, #991b1b 100%)',
    iconBg: 'linear-gradient(160deg, #ffffff 0%, #fef2f2 100%)',
    iconColor: '#991b1b',
    hoverBorder: 'rgba(252,165,165,0.5)',
    hoverShadow: '0 24px 48px -14px rgba(185,28,28,0.2)',
} as const;

type Feat = { title: string; desc: string; icon: ReactNode; large?: boolean };

export function LandingFeatures({ dictionary }: { dictionary: any }) {
    const list = dictionary.landing.features.list;
    const d = dictionary.landing.features;
    const feats: Feat[] = [
        { title: list.devices.title, desc: list.devices.desc, icon: <DevicesOtherIcon sx={{ fontSize: 26 }} />, large: true },
        { title: list.control.title, desc: list.control.desc, icon: <LockIcon sx={{ fontSize: 26 }} /> },
        { title: list.notifications.title, desc: list.notifications.desc, icon: <NotificationsActiveIcon sx={{ fontSize: 26 }} /> },
        { title: list.pets.title, desc: list.pets.desc, icon: <PetsIcon sx={{ fontSize: 26 }} /> },
        { title: list.realtime.title, desc: list.realtime.desc, icon: <CloudDoneIcon sx={{ fontSize: 26 }} /> },
        { title: list.noApp.title, desc: list.noApp.desc, icon: <QrCodeScannerIcon sx={{ fontSize: 26 }} />, large: true },
    ];

    return (
        <Box
            component="section"
            id="features"
            sx={{
                py: { xs: 10, md: 14 },
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(165deg, #fafafa 0%, #f4f4f5 45%, #fafafa 100%)',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-20%',
                    right: '-10%',
                    width: '55%',
                    height: '70%',
                    background: 'radial-gradient(ellipse, rgba(220,38,38,0.08) 0%, transparent 62%)',
                    pointerEvents: 'none',
                },
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.4,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='72' height='72' viewBox='0 0 72 72' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1.2' fill='%2394a3b8' fill-opacity='0.35'/%3E%3C/svg%3E")`,
                    pointerEvents: 'none',
                },
            }}
        >
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Box textAlign="center" sx={{ mb: { xs: 5, md: 7 }, maxWidth: 720, mx: 'auto' }}>
                    {d.overline ? (
                        <Typography
                            variant="overline"
                            sx={{
                                color: 'error.main',
                                fontWeight: 800,
                                letterSpacing: '0.24em',
                                fontSize: 11,
                                display: 'block',
                                mb: 1.5,
                            }}
                        >
                            {d.overline}
                        </Typography>
                    ) : null}
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 800,
                            color: '#0f172a',
                            mb: 2,
                            letterSpacing: '-0.035em',
                            lineHeight: 1.12,
                            fontSize: { xs: '1.85rem', md: '2.5rem' },
                        }}
                    >
                        {d.title}
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: 'text.secondary',
                            fontWeight: 400,
                            lineHeight: 1.65,
                            fontSize: { xs: '1rem', sm: '1.125rem' },
                        }}
                    >
                        {d.subtitle}
                    </Typography>
                    <Box
                        sx={{
                            mt: 3,
                            mx: 'auto',
                            width: 72,
                            height: 4,
                            borderRadius: 2,
                            background: 'linear-gradient(90deg, #7f1d1d, #dc2626, #fca5a5)',
                        }}
                    />
                </Box>

                <Grid container spacing={{ xs: 2.5, md: 2.75 }}>
                    {feats.map((feat, i) => {
                        const a = BRAND_ACCENT;
                        const num = String(i + 1).padStart(2, '0');
                        return (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                                <Box
                                    sx={{
                                        position: 'relative',
                                        p: { xs: 2.75, sm: 3.25 },
                                        height: '100%',
                                        minHeight: feat.large ? { xs: 'auto', md: 220 } : undefined,
                                        borderRadius: '22px',
                                        border: '1px solid rgba(226,232,240,0.95)',
                                        bgcolor: 'rgba(255,255,255,0.72)',
                                        backdropFilter: 'blur(10px)',
                                        boxShadow: '0 4px 24px rgba(15,23,42,0.05), 0 0 0 1px rgba(255,255,255,0.8) inset',
                                        overflow: 'hidden',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            borderColor: a.hoverBorder,
                                            boxShadow: `${a.hoverShadow}, 0 0 0 1px rgba(255,255,255,0.9) inset`,
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: 5,
                                            height: '100%',
                                            bgcolor: a.stripe,
                                            borderRadius: '22px 0 0 22px',
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            position: 'absolute',
                                            top: 12,
                                            right: 16,
                                            fontWeight: 900,
                                            fontSize: { xs: '3.25rem', sm: '3.75rem' },
                                            lineHeight: 1,
                                            color: 'rgba(15,23,42,0.06)',
                                            userSelect: 'none',
                                            pointerEvents: 'none',
                                        }}
                                    >
                                        {num}
                                    </Typography>
                                    <Box sx={{ position: 'relative', pl: 1.5 }}>
                                        <Box
                                            sx={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 56,
                                                height: 56,
                                                borderRadius: '18px',
                                                p: '3px',
                                                mb: 2,
                                                background: a.iconRing,
                                                boxShadow: '0 8px 24px rgba(15,23,42,0.08)',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: '15px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    background: a.iconBg,
                                                    color: a.iconColor,
                                                }}
                                            >
                                                {feat.icon}
                                            </Box>
                                        </Box>
                                        <Typography
                                            variant="h6"
                                            fontWeight={800}
                                            sx={{
                                                mb: 1,
                                                color: '#0f172a',
                                                letterSpacing: '-0.025em',
                                                lineHeight: 1.25,
                                                fontSize: feat.large ? { xs: '1.15rem', sm: '1.25rem' } : '1.05rem',
                                                maxWidth: '92%',
                                            }}
                                        >
                                            {feat.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: 'text.secondary',
                                                lineHeight: 1.75,
                                                fontSize: '0.9rem',
                                                maxWidth: feat.large ? { md: '95%' } : '100%',
                                            }}
                                        >
                                            {feat.desc}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </Box>
    );
}
