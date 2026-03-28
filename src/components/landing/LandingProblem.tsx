'use client';

import type { ReactNode } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';

type CardTheme = {
    stripe: string;
    iconRing: string;
    iconBg: string;
    iconColor: string;
    hoverBorder: string;
    hoverShadow: string;
};

/** Solo variaciones de rojo marca (grana → rojo vivo) */
const THEMES: CardTheme[] = [
    {
        stripe: '#7f1d1d',
        iconRing: 'linear-gradient(135deg, #fecaca 0%, #b91c1c 55%, #7f1d1d 100%)',
        iconBg: 'linear-gradient(160deg, #fff 0%, #fef2f2 100%)',
        iconColor: '#991b1b',
        hoverBorder: 'rgba(252,165,165,0.5)',
        hoverShadow: '0 28px 56px -14px rgba(127,29,29,0.2)',
    },
    {
        stripe: '#b91c1c',
        iconRing: 'linear-gradient(135deg, #fca5a5 0%, #dc2626 50%, #991b1b 100%)',
        iconBg: 'linear-gradient(160deg, #fff 0%, #fff1f2 100%)',
        iconColor: '#b91c1c',
        hoverBorder: 'rgba(252,165,165,0.5)',
        hoverShadow: '0 28px 56px -14px rgba(185,28,28,0.2)',
    },
    {
        stripe: '#dc2626',
        iconRing: 'linear-gradient(135deg, #fecaca 0%, #ef4444 45%, #b91c1c 100%)',
        iconBg: 'linear-gradient(160deg, #fff 0%, #fef2f2 100%)',
        iconColor: '#dc2626',
        hoverBorder: 'rgba(252,165,165,0.55)',
        hoverShadow: '0 28px 56px -14px rgba(220,38,38,0.2)',
    },
];

type Item = { title: string; desc: string; icon: ReactNode };

export function LandingProblem({ dictionary }: { dictionary: any }) {
    const d = dictionary.landing.problem;
    const items: Item[] = [
        { title: d.cards.phones.title, desc: d.cards.phones.desc, icon: <PhoneIphoneIcon sx={{ fontSize: 28 }} /> },
        { title: d.cards.allergies.title, desc: d.cards.allergies.desc, icon: <HealthAndSafetyIcon sx={{ fontSize: 28 }} /> },
        { title: d.cards.pets.title, desc: d.cards.pets.desc, icon: <NotListedLocationIcon sx={{ fontSize: 28 }} /> },
    ];

    return (
        <Box
            component="section"
            id="problem"
            sx={{
                py: { xs: 10, md: 14 },
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(175deg, #fafafa 0%, #f4f4f5 50%, #fafafa 100%)',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-25%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 'min(100%, 720px)',
                    height: '55%',
                    background: 'radial-gradient(ellipse, rgba(220,38,38,0.11) 0%, transparent 62%)',
                    pointerEvents: 'none',
                },
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: 'linear-gradient(90deg, transparent, rgba(148,163,184,0.45), transparent)',
                },
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.4,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%2394a3b8' fill-opacity='0.35'/%3E%3C/svg%3E")`,
                    pointerEvents: 'none',
                }}
            />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Box textAlign="center" sx={{ mb: { xs: 5, md: 7 }, maxWidth: 760, mx: 'auto' }}>
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
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 800,
                            color: '#0f172a',
                            letterSpacing: '-0.035em',
                            lineHeight: 1.12,
                            fontSize: { xs: '1.85rem', sm: '2.15rem', md: '2.5rem' },
                        }}
                    >
                        {d.title}
                    </Typography>
                    {d.subtitle ? (
                        <Typography
                            variant="h6"
                            sx={{
                                mt: 2,
                                color: 'text.secondary',
                                fontWeight: 400,
                                lineHeight: 1.6,
                                fontSize: { xs: '1rem', sm: '1.125rem' },
                                maxWidth: 560,
                                mx: 'auto',
                            }}
                        >
                            {d.subtitle}
                        </Typography>
                    ) : null}
                    <Box
                        sx={{
                            mt: 3,
                            mx: 'auto',
                            width: 80,
                            height: 4,
                            borderRadius: 2,
                            background: 'linear-gradient(90deg, #7f1d1d, #b91c1c, #fca5a5)',
                        }}
                    />
                </Box>

                <Grid container spacing={{ xs: 2.75, md: 3 }}>
                    {items.map((item, i) => {
                        const t = THEMES[i];
                        const num = String(i + 1).padStart(2, '0');
                        return (
                            <Grid size={{ xs: 12, md: 4 }} key={i}>
                                <Box
                                    sx={{
                                        position: 'relative',
                                        height: '100%',
                                        p: { xs: 2.75, sm: 3.25 },
                                        borderRadius: '22px',
                                        border: '1px solid rgba(255,255,255,0.65)',
                                        bgcolor: 'rgba(255,255,255,0.78)',
                                        backdropFilter: 'blur(12px)',
                                        boxShadow: '0 4px 28px rgba(15,23,42,0.07), 0 0 0 1px rgba(255,255,255,0.9) inset',
                                        overflow: 'hidden',
                                        textAlign: 'center',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-10px)',
                                            borderColor: t.hoverBorder,
                                            boxShadow: `${t.hoverShadow}, 0 0 0 1px rgba(255,255,255,0.95) inset`,
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            left: 0,
                                            top: 0,
                                            bottom: 0,
                                            width: 5,
                                            bgcolor: t.stripe,
                                            borderRadius: '22px 0 0 22px',
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            position: 'absolute',
                                            top: 10,
                                            right: 14,
                                            fontWeight: 900,
                                            fontSize: { xs: '3rem', sm: '3.5rem' },
                                            lineHeight: 1,
                                            color: 'rgba(15,23,42,0.05)',
                                            userSelect: 'none',
                                            pointerEvents: 'none',
                                        }}
                                    >
                                        {num}
                                    </Typography>

                                    <Box sx={{ position: 'relative', pl: 0.5 }}>
                                        <Box
                                            sx={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 64,
                                                height: 64,
                                                borderRadius: '20px',
                                                p: '3px',
                                                mb: 2.25,
                                                background: t.iconRing,
                                                boxShadow: '0 10px 28px rgba(15,23,42,0.1)',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: '17px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    background: t.iconBg,
                                                    color: t.iconColor,
                                                }}
                                            >
                                                {item.icon}
                                            </Box>
                                        </Box>

                                        <Typography
                                            variant="h6"
                                            fontWeight={800}
                                            sx={{
                                                color: '#0f172a',
                                                mb: 1.5,
                                                letterSpacing: '-0.025em',
                                                lineHeight: 1.25,
                                                fontSize: '1.05rem',
                                            }}
                                        >
                                            {item.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: 'text.secondary',
                                                lineHeight: 1.75,
                                                fontSize: '0.92rem',
                                            }}
                                        >
                                            {item.desc}
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
