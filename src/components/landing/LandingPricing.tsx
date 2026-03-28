'use client';

import { useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Chip, Switch, Button } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const checkIcon = (
    <CheckCircleIcon sx={{ fontSize: 20, color: '#dc2626', flexShrink: 0, mt: '2px' }} />
);

/** Separadores entre ítems con margen derecho explícito (no tocan el borde de la tarjeta). */
function featureListSx(dividerColor: string) {
    return {
        listStyle: 'none',
        p: 0,
        m: 0,
        mb: 4,
        flex: 1,
        width: '100%',
        minWidth: 0,
        '& li': {
            position: 'relative',
            display: 'flex',
            gap: 1.5,
            alignItems: 'flex-start',
            py: 1.25,
            minWidth: 0,
            '&:not(:last-of-type)::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: (theme: Theme) => theme.spacing(2),
                height: '1px',
                bgcolor: dividerColor,
            },
        },
    };
}

export function LandingPricing({ dictionary }: { dictionary: any }) {
    const d = dictionary.landing.pricing;
    const [isYearly, setIsYearly] = useState(false);
    const period = d.perMonth ?? '/mo';

    return (
        <Box
            component="section"
            id="pricing"
            sx={{
                py: { xs: 10, md: 14 },
                position: 'relative',
                /* overflow visible: el listón del plan central sobresale con translateY(-50%) */
                background: 'linear-gradient(180deg, #0c0a09 0%, #1c1917 42%, #0f0f0f 100%)',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-25%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 'min(110%, 880px)',
                    height: '55%',
                    background: 'radial-gradient(ellipse, rgba(220,38,38,0.22) 0%, transparent 65%)',
                    pointerEvents: 'none',
                },
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-20%',
                    right: '-15%',
                    width: '45%',
                    height: '45%',
                    background: 'radial-gradient(ellipse, rgba(248,113,113,0.06) 0%, transparent 60%)',
                    pointerEvents: 'none',
                },
            }}
        >
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, overflow: 'visible' }}>
                <Box textAlign="center" sx={{ mb: { xs: 5, md: 6 }, maxWidth: 640, mx: 'auto' }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 800,
                            color: '#fafaf9',
                            mb: 2,
                            letterSpacing: '-0.03em',
                            lineHeight: 1.15,
                            fontSize: { xs: '1.85rem', md: '2.5rem' },
                        }}
                    >
                        {d.title}
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: 'rgba(214,211,209,0.9)',
                            fontWeight: 400,
                            mb: 4,
                            lineHeight: 1.6,
                            fontSize: { xs: '1rem', sm: '1.125rem' },
                        }}
                    >
                        {d.subtitle}
                    </Typography>

                    <Box
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 2,
                            px: 2.5,
                            py: 1.5,
                            borderRadius: '999px',
                            bgcolor: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            backdropFilter: 'blur(12px)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
                        }}
                    >
                        <Typography sx={{ fontWeight: 800, color: !isYearly ? '#fff' : 'rgba(168,162,158,0.7)', minWidth: 72 }}>
                            {d.monthly}
                        </Typography>
                        <Switch
                            checked={isYearly}
                            onChange={(e) => setIsYearly(e.target.checked)}
                            sx={{
                                '& .MuiSwitch-switchBase.Mui-checked': { color: '#f87171' },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: 'rgba(220,38,38,0.55)' },
                                '& .MuiSwitch-track': { bgcolor: 'rgba(87,83,78,0.8)' },
                            }}
                        />
                        <Typography
                            sx={{
                                fontWeight: 800,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                color: isYearly ? '#fff' : 'rgba(168,162,158,0.7)',
                            }}
                        >
                            {d.yearly}
                            <Chip
                                label={d.save}
                                size="small"
                                sx={{
                                    fontWeight: 800,
                                    height: 26,
                                    bgcolor: 'rgba(34,197,94,0.2)',
                                    color: '#86efac',
                                    border: '1px solid rgba(74,222,128,0.35)',
                                }}
                            />
                        </Typography>
                    </Box>
                </Box>

                <Grid
                    container
                    spacing={{ xs: 3, md: 2.5 }}
                    alignItems="stretch"
                    justifyContent="center"
                    sx={{ pt: { xs: 3, md: 4 }, overflow: 'visible' }}
                >
                    {/* Esencial */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Card
                            elevation={0}
                            sx={{
                                height: '100%',
                                borderRadius: '24px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                bgcolor: 'rgba(250,250,249,0.97)',
                                boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                display: 'flex',
                                flexDirection: 'column',
                                '&:hover': {
                                    transform: 'translateY(-6px)',
                                    boxShadow: '0 24px 48px -12px rgba(0,0,0,0.45)',
                                },
                            }}
                        >
                            <Box sx={{ height: 3, borderRadius: '24px 24px 0 0', background: 'linear-gradient(90deg, #78716c, #a8a29e)' }} />
                            <CardContent sx={{ p: { xs: 3, sm: 3.5 }, flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h5" fontWeight={800} sx={{ mb: 1, color: '#0c0a09', letterSpacing: '-0.02em' }}>
                                    {d.plans.essential.name}
                                </Typography>
                                <Typography sx={{ color: '#57534e', mb: 3, minHeight: 48, lineHeight: 1.55, fontSize: '0.95rem' }}>
                                    {d.plans.essential.desc}
                                </Typography>
                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="h3" fontWeight={900} component="span" sx={{ color: '#0c0a09', letterSpacing: '-0.03em' }}>
                                        ${isYearly ? '4' : '5'}
                                    </Typography>
                                    <Typography component="span" sx={{ ml: 0.75, color: '#78716c', fontWeight: 600, fontSize: '1.1rem' }}>
                                        {period}
                                    </Typography>
                                </Box>
                                <Box component="ul" sx={featureListSx('rgba(231,229,228,0.95)')}>
                                    {d.plans.essential.features.map((feature: string, i: number) => (
                                        <li key={i}>
                                            {checkIcon}
                                            <Typography variant="body2" sx={{ color: '#292524', fontWeight: 600, lineHeight: 1.5, flex: 1, minWidth: 0 }}>
                                                {feature}
                                            </Typography>
                                        </li>
                                    ))}
                                </Box>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    size="large"
                                    sx={{
                                        borderRadius: '14px',
                                        fontWeight: 800,
                                        py: 1.5,
                                        borderWidth: 2,
                                        borderColor: '#dc2626',
                                        color: '#b91c1c',
                                        '&:hover': { borderWidth: 2, borderColor: '#b91c1c', bgcolor: 'rgba(254,226,226,0.5)' },
                                    }}
                                >
                                    {d.plans.essential.cta}
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Familiar — destacado (listón fuera del Card para evitar recorte por overflow/border-radius) */}
                    <Grid size={{ xs: 12, md: 4 }} sx={{ overflow: 'visible', display: 'flex' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%',
                                transform: { md: 'translateY(-16px)' },
                            }}
                        >
                            <Box
                                component="span"
                                sx={{
                                    position: 'relative',
                                    zIndex: 2,
                                    mb: -2.25,
                                    background: 'linear-gradient(90deg, #ef4444, #dc2626)',
                                    color: '#fff',
                                    px: 2.75,
                                    py: 1,
                                    borderRadius: '999px',
                                    fontSize: 10,
                                    fontWeight: 800,
                                    letterSpacing: '0.16em',
                                    textTransform: 'uppercase',
                                    boxShadow: '0 10px 28px rgba(220,38,38,0.5)',
                                    border: '2px solid rgba(255,255,255,0.35)',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {d.plans.family.badge}
                            </Box>
                            <Card
                                elevation={0}
                                sx={{
                                    flex: 1,
                                    width: '100%',
                                    borderRadius: '24px',
                                    border: '2px solid transparent',
                                    backgroundImage:
                                        'linear-gradient(rgba(255,255,255,0.98), rgba(255,250,250,0.98)), linear-gradient(135deg, #f87171, #dc2626, #991b1b)',
                                    backgroundOrigin: 'padding-box, border-box',
                                    backgroundClip: 'padding-box, border-box',
                                    boxShadow:
                                        '0 0 0 1px rgba(254,202,202,0.5), 0 24px 64px -12px rgba(220,38,38,0.45), 0 0 80px -20px rgba(220,38,38,0.35)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    overflow: 'visible',
                                    transition: 'box-shadow 0.3s ease',
                                    '&:hover': {
                                        boxShadow:
                                            '0 0 0 1px rgba(254,202,202,0.7), 0 32px 72px -12px rgba(220,38,38,0.5), 0 0 96px -16px rgba(220,38,38,0.4)',
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        height: 4,
                                        borderRadius: '22px 22px 0 0',
                                        background: 'linear-gradient(90deg, #fca5a5, #dc2626, #7f1d1d)',
                                    }}
                                />
                                <CardContent sx={{ p: { xs: 3, sm: 3.5 }, flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h5" fontWeight={800} sx={{ mb: 1, color: '#991b1b', letterSpacing: '-0.02em' }}>
                                    {d.plans.family.name}
                                </Typography>
                                <Typography sx={{ color: '#57534e', mb: 3, minHeight: 48, lineHeight: 1.55, fontSize: '0.95rem' }}>
                                    {d.plans.family.desc}
                                </Typography>
                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="h3" fontWeight={900} component="span" sx={{ color: '#0c0a09', letterSpacing: '-0.03em' }}>
                                        ${isYearly ? '12' : '15'}
                                    </Typography>
                                    <Typography component="span" sx={{ ml: 0.75, color: '#78716c', fontWeight: 600, fontSize: '1.1rem' }}>
                                        {period}
                                    </Typography>
                                </Box>
                                <Box component="ul" sx={featureListSx('rgba(254,202,202,0.9)')}>
                                    {d.plans.family.features.map((feature: string, i: number) => (
                                        <li key={i}>
                                            {checkIcon}
                                            <Typography variant="body2" sx={{ color: '#1c1917', fontWeight: 700, lineHeight: 1.5, flex: 1, minWidth: 0 }}>
                                                {feature}
                                            </Typography>
                                        </li>
                                    ))}
                                </Box>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    sx={{
                                        borderRadius: '14px',
                                        fontWeight: 800,
                                        py: 1.65,
                                        textTransform: 'none',
                                        fontSize: '1rem',
                                        bgcolor: '#dc2626',
                                        boxShadow: '0 8px 28px rgba(220,38,38,0.45)',
                                        '&:hover': { bgcolor: '#b91c1c', boxShadow: '0 12px 36px rgba(220,38,38,0.55)' },
                                    }}
                                >
                                    {d.plans.family.cta}
                                </Button>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>

                    {/* Pro */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Card
                            elevation={0}
                            sx={{
                                height: '100%',
                                borderRadius: '24px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                bgcolor: 'rgba(250,250,249,0.97)',
                                boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                display: 'flex',
                                flexDirection: 'column',
                                '&:hover': {
                                    transform: 'translateY(-6px)',
                                    boxShadow: '0 24px 48px -12px rgba(0,0,0,0.45)',
                                },
                            }}
                        >
                            <Box sx={{ height: 3, borderRadius: '24px 24px 0 0', background: 'linear-gradient(90deg, #0c0a09, #44403c)' }} />
                            <CardContent sx={{ p: { xs: 3, sm: 3.5 }, flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h5" fontWeight={800} sx={{ mb: 1, color: '#0c0a09', letterSpacing: '-0.02em' }}>
                                    {d.plans.pro.name}
                                </Typography>
                                <Typography sx={{ color: '#57534e', mb: 3, minHeight: 48, lineHeight: 1.55, fontSize: '0.95rem' }}>
                                    {d.plans.pro.desc}
                                </Typography>
                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="h3" fontWeight={900} component="span" sx={{ color: '#0c0a09', letterSpacing: '-0.03em' }}>
                                        ${isYearly ? '24' : '30'}
                                    </Typography>
                                    <Typography component="span" sx={{ ml: 0.75, color: '#78716c', fontWeight: 600, fontSize: '1.1rem' }}>
                                        {period}
                                    </Typography>
                                </Box>
                                <Box component="ul" sx={featureListSx('rgba(231,229,228,0.95)')}>
                                    {d.plans.pro.features.map((feature: string, i: number) => (
                                        <li key={i}>
                                            {checkIcon}
                                            <Typography variant="body2" sx={{ color: '#292524', fontWeight: 600, lineHeight: 1.5, flex: 1, minWidth: 0 }}>
                                                {feature}
                                            </Typography>
                                        </li>
                                    ))}
                                </Box>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    size="large"
                                    sx={{
                                        borderRadius: '14px',
                                        fontWeight: 800,
                                        py: 1.5,
                                        borderWidth: 2,
                                        borderColor: '#dc2626',
                                        color: '#b91c1c',
                                        '&:hover': { borderWidth: 2, borderColor: '#b91c1c', bgcolor: 'rgba(254,226,226,0.5)' },
                                    }}
                                >
                                    {d.plans.pro.cta}
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
