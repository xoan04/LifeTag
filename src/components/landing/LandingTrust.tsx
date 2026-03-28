'use client';

import { Box, Container, Typography, Grid } from '@mui/material';
import ShieldIcon from '@mui/icons-material/Shield';
import GppGoodIcon from '@mui/icons-material/GppGood';
import CloudDoneIcon from '@mui/icons-material/CloudDone';

export function LandingTrust({ dictionary }: { dictionary: any }) {
    const d = dictionary.landing.trust;
    const items = [
        { icon: <ShieldIcon sx={{ fontSize: 32 }} />, title: d.tokens.title, desc: d.tokens.desc },
        { icon: <GppGoodIcon sx={{ fontSize: 32 }} />, title: d.privacy.title, desc: d.privacy.desc },
        { icon: <CloudDoneIcon sx={{ fontSize: 32 }} />, title: d.cloud.title, desc: d.cloud.desc },
    ];
    return (
        <Box
            component="section"
            sx={{
                py: { xs: 6, md: 8 },
                bgcolor: '#fff',
                borderTop: '1px solid rgba(226,232,240,0.95)',
                backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)',
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={{ xs: 2.5, md: 3 }} justifyContent="center">
                    {items.map((item, i) => (
                        <Grid size={{ xs: 12, sm: 4 }} key={i}>
                            <Box
                                sx={{
                                    textAlign: 'center',
                                    p: { xs: 3, sm: 3.5 },
                                    height: '100%',
                                    borderRadius: '20px',
                                    border: '1px solid rgba(226,232,240,0.95)',
                                    bgcolor: 'rgba(248,250,252,0.8)',
                                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                                    '&:hover': {
                                        borderColor: 'rgba(148,163,184,0.35)',
                                        boxShadow: '0 12px 32px rgba(15,23,42,0.06)',
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: 64,
                                        height: 64,
                                        borderRadius: '18px',
                                        mb: 2,
                                        color: 'primary.main',
                                        bgcolor: '#fff',
                                        border: '1px solid rgba(226,232,240,0.95)',
                                        boxShadow: '0 4px 16px rgba(15,23,42,0.06)',
                                    }}
                                >
                                    {item.icon}
                                </Box>
                                <Typography variant="h6" fontWeight={800} sx={{ mb: 1, color: '#0f172a', letterSpacing: '-0.02em' }}>
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, maxWidth: 280, mx: 'auto' }}>
                                    {item.desc}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
