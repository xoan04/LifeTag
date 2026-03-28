'use client';

import { Box, Container, Typography, Grid, Button } from '@mui/material';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

export function LandingFooter({ dictionary }: { dictionary: any }) {
    const d = dictionary.landing.footer;
    return (
        <Box
            component="footer"
            sx={{
                bgcolor: '#0c0a09',
                color: 'rgba(214,211,209,0.85)',
                py: { xs: 6, md: 8 },
                borderTop: '1px solid rgba(255,255,255,0.06)',
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.5), transparent)',
                },
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={{ xs: 4, md: 6 }} sx={{ mb: 6 }}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h5" fontWeight={900} sx={{ color: '#fff', display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <HealthAndSafetyIcon color="error" sx={{ fontSize: 32 }} />
                            LifeTag
                        </Typography>
                        <Typography variant="body2" sx={{ lineHeight: 1.75, maxWidth: 320 }}>
                            {d.desc}
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, md: 2 }}>
                        <Typography sx={{ color: '#fff', fontWeight: 800, mb: 2, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                            {d.product}
                        </Typography>
                        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, '& li': { mb: 1.25 } }}>
                            <li>
                                <a href="#" className="text-sm hover:text-white transition-colors">
                                    {d.productLinks.features}
                                </a>
                            </li>
                            <li>
                                <a href="#pricing" className="text-sm hover:text-white transition-colors">
                                    {d.productLinks.pricing}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-white transition-colors">
                                    {d.productLinks.pets}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-white transition-colors">
                                    {d.productLinks.devices}
                                </a>
                            </li>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 6, md: 2 }}>
                        <Typography sx={{ color: '#fff', fontWeight: 800, mb: 2, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                            {d.company}
                        </Typography>
                        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, '& li': { mb: 1.25 } }}>
                            <li>
                                <a href="#" className="text-sm hover:text-white transition-colors">
                                    {d.companyLinks.about}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-white transition-colors">
                                    {d.companyLinks.blog}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-white transition-colors">
                                    {d.companyLinks.contact}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-white transition-colors">
                                    {d.companyLinks.partners}
                                </a>
                            </li>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography sx={{ color: '#fff', fontWeight: 800, mb: 2, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                            {d.subscribe.title}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1.5 }}>
                            <Box
                                component="input"
                                type="email"
                                placeholder={d.subscribe.placeholder}
                                sx={{
                                    flex: 1,
                                    bgcolor: 'rgba(28,25,23,0.9)',
                                    px: 2,
                                    py: 1.5,
                                    borderRadius: '12px',
                                    border: '1px solid rgba(68,64,60,0.8)',
                                    outline: 'none',
                                    color: '#fff',
                                    fontSize: 14,
                                    '&::placeholder': { color: 'rgba(168,162,158,0.8)' },
                                    '&:focus': { borderColor: 'rgba(220,38,38,0.6)', boxShadow: '0 0 0 3px rgba(220,38,38,0.12)' },
                                }}
                            />
                            <Button
                                variant="contained"
                                color="error"
                                sx={{ borderRadius: '12px', px: 3, fontWeight: 800, boxShadow: 'none', whiteSpace: 'nowrap' }}
                            >
                                {d.subscribe.button}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        borderTop: '1px solid rgba(68,64,60,0.6)',
                        pt: 4,
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <Typography variant="body2">{d.rights}</Typography>
                    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
                        <a href="#" className="text-sm hover:text-white transition-colors">
                            {d.legal.privacy}
                        </a>
                        <a href="#" className="text-sm hover:text-white transition-colors">
                            {d.legal.terms}
                        </a>
                        <a href="#" className="text-sm hover:text-white transition-colors">
                            {d.legal.cookies}
                        </a>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
