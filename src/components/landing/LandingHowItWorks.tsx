'use client';

import type { ReactNode } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import NfcIcon from '@mui/icons-material/Nfc';
import QrCode2Icon from '@mui/icons-material/QrCode2';

type HowStep = {
    step: string;
    title: string;
    desc: string;
    icon: ReactNode;
    iconWide?: boolean;
};

export function LandingHowItWorks({ dictionary }: { dictionary: any }) {
    const d = dictionary.landing.howItWorks;
    const steps: HowStep[] = [
        { step: '01', title: d.steps.one.title, desc: d.steps.one.desc, icon: <PersonAddIcon sx={{ fontSize: 40 }} /> },
        { step: '02', title: d.steps.two.title, desc: d.steps.two.desc, icon: <AssignmentIndIcon sx={{ fontSize: 40 }} /> },
        {
            step: '03',
            title: d.steps.three.title,
            desc: d.steps.three.desc,
            iconWide: true,
            icon: (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    <NfcIcon sx={{ fontSize: 34 }} />
                    <QrCode2Icon sx={{ fontSize: 34 }} />
                </Box>
            ),
        },
    ];
    return (
        <Box
            component="section"
            sx={{
                py: { xs: 10, md: 12 },
                position: 'relative',
                color: '#fff',
                background: 'linear-gradient(165deg, #0c0a09 0%, #1c1917 40%, #0f0f0f 100%)',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-30%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 'min(120%, 900px)',
                    height: '70%',
                    background: 'radial-gradient(ellipse, rgba(220,38,38,0.12) 0%, transparent 60%)',
                    pointerEvents: 'none',
                },
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    right: '-20%',
                    width: '50%',
                    height: '50%',
                    background: 'radial-gradient(ellipse, rgba(220,38,38,0.05) 0%, transparent 55%)',
                    pointerEvents: 'none',
                },
            }}
        >
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Box textAlign="center" sx={{ mb: { xs: 6, md: 8 }, maxWidth: 640, mx: 'auto' }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 800,
                            mb: 2,
                            letterSpacing: '-0.03em',
                            fontSize: { xs: '1.85rem', md: '2.35rem' },
                            background: 'linear-gradient(180deg, #fff 0%, #e7e5e4 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        {d.title}
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'rgba(214,211,209,0.95)', fontWeight: 400, lineHeight: 1.6 }}>
                        {d.subtitle}
                    </Typography>
                </Box>

                <Grid container spacing={{ xs: 3, md: 3 }}>
                    {steps.map((item, i) => (
                        <Grid size={{ xs: 12, md: 4 }} key={i}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    textAlign: 'center',
                                    p: { xs: 3, sm: 4 },
                                    borderRadius: '22px',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    background: 'linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                                    backdropFilter: 'blur(8px)',
                                    minHeight: { md: 280 },
                                    transition: 'border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease',
                                    '&:hover': {
                                        borderColor: 'rgba(248,113,113,0.25)',
                                        boxShadow: '0 24px 48px -16px rgba(0,0,0,0.45)',
                                        transform: 'translateY(-4px)',
                                    },
                                }}
                            >
                                <Typography
                                    variant="h1"
                                    sx={{
                                        position: 'absolute',
                                        top: 8,
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        fontWeight: 900,
                                        fontSize: { xs: '5.5rem', sm: '6.5rem' },
                                        lineHeight: 1,
                                        color: 'rgba(255,255,255,0.04)',
                                        pointerEvents: 'none',
                                        userSelect: 'none',
                                    }}
                                >
                                    {item.step}
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        minWidth: item.iconWide ? 88 : 72,
                                        height: 72,
                                        px: item.iconWide ? 1.5 : 0,
                                        borderRadius: '20px',
                                        mb: 2.5,
                                        color: '#fca5a5',
                                        background: 'linear-gradient(145deg, rgba(220,38,38,0.25) 0%, rgba(127,29,29,0.35) 100%)',
                                        border: '1px solid rgba(248,113,113,0.2)',
                                        boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
                                    }}
                                >
                                    {item.icon}
                                </Box>
                                <Typography variant="h5" fontWeight={800} sx={{ mb: 1.5, letterSpacing: '-0.02em' }}>
                                    {item.title}
                                </Typography>
                                <Typography sx={{ color: 'rgba(214,211,209,0.88)', lineHeight: 1.7, fontSize: '0.95rem' }}>{item.desc}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
