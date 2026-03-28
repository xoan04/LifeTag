'use client';

import { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    IconButton,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Divider,
} from '@mui/material';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import Link from 'next/link';

export function LandingNav({ dictionary, lang }: { dictionary: any; lang: string }) {
    const d = dictionary.landing.nav;
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleLang = () => {
        window.location.href = `/${lang === 'en' ? 'es' : 'en'}${window.location.pathname.replace(`/${lang}`, '')}`;
    };

    const closeDrawer = () => setDrawerOpen(false);

    const langLabel = lang === 'en' ? 'EN' : 'ES';
    const otherLangLabel = lang === 'en' ? 'ES' : 'EN';

    return (
        <Box
            component="header"
            sx={{
                position: 'sticky',
                top: 0,
                zIndex: 1100,
                borderBottom: '1px solid rgba(148,163,184,0.18)',
                background: 'rgba(255,255,255,0.78)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                boxShadow: '0 1px 0 rgba(255,255,255,0.65) inset',
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 1.5,
                    py: { xs: 1.25, sm: 1.5, md: 2 },
                    minHeight: { xs: 56, md: 64 },
                }}
            >
                <Link href={`/${lang}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', minWidth: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.75, sm: 1.25 }, minWidth: 0 }}>
                        <HealthAndSafetyIcon color="error" sx={{ fontSize: { xs: 26, md: 32 }, flexShrink: 0 }} />
                        <Typography
                            component="span"
                            fontWeight={900}
                            color="primary"
                            sx={{
                                fontSize: { xs: '1.125rem', sm: '1.35rem', md: '1.5rem' },
                                letterSpacing: '-0.035em',
                                lineHeight: 1,
                                whiteSpace: 'nowrap',
                            }}
                        >
                            LifeTag
                        </Typography>
                    </Box>
                </Link>

                {/* Escritorio / tablet ancha */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
                    <Button
                        variant="text"
                        color="inherit"
                        onClick={toggleLang}
                        sx={{
                            fontWeight: 800,
                            color: 'text.secondary',
                            minWidth: 48,
                            px: 1.5,
                            borderRadius: 2,
                            '&:hover': { bgcolor: 'rgba(15,23,42,0.06)' },
                        }}
                    >
                        {langLabel}
                    </Button>
                    <Link href={`/${lang}/login`} style={{ textDecoration: 'none' }}>
                        <Button
                            variant="text"
                            color="inherit"
                            sx={{
                                fontWeight: 600,
                                color: 'text.primary',
                                px: 2,
                                borderRadius: 2,
                                '&:hover': { bgcolor: 'rgba(15,23,42,0.06)' },
                            }}
                        >
                            {d.login}
                        </Button>
                    </Link>
                    <Link href={`/${lang}/register`} style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                borderRadius: '999px',
                                px: 3,
                                py: 1,
                                fontWeight: 800,
                                fontSize: '0.875rem',
                                textTransform: 'none',
                                boxShadow: '0 6px 20px rgba(220,38,38,0.28)',
                                '&:hover': { boxShadow: '0 8px 24px rgba(220,38,38,0.36)' },
                            }}
                        >
                            {d.getStarted}
                        </Button>
                    </Link>
                </Box>

                {/* Móvil: CTA compacto + menú (login e idioma dentro del drawer) */}
                <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 0.75, flexShrink: 0 }}>
                    <Link href={`/${lang}/register`} style={{ textDecoration: 'none' }} onClick={closeDrawer}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            sx={{
                                borderRadius: '999px',
                                fontWeight: 800,
                                px: 2,
                                py: 0.65,
                                fontSize: '0.8125rem',
                                textTransform: 'none',
                                whiteSpace: 'nowrap',
                                boxShadow: '0 4px 14px rgba(220,38,38,0.3)',
                                '&:hover': { boxShadow: '0 6px 18px rgba(220,38,38,0.38)' },
                            }}
                        >
                            {d.getStarted}
                        </Button>
                    </Link>
                    <IconButton
                        edge="end"
                        aria-label={d.menuAria ?? 'Menu'}
                        onClick={() => setDrawerOpen(true)}
                        sx={{
                            color: 'text.primary',
                            bgcolor: 'rgba(15,23,42,0.04)',
                            '&:hover': { bgcolor: 'rgba(15,23,42,0.08)' },
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Box>
            </Container>

            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={closeDrawer}
                PaperProps={{
                    sx: {
                        width: 'min(100%, 300px)',
                        borderTopLeftRadius: 16,
                        borderBottomLeftRadius: 16,
                        bgcolor: 'rgba(255,255,255,0.98)',
                        backdropFilter: 'blur(12px)',
                    },
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 2 }}>
                    <Typography variant="subtitle1" fontWeight={800} color="text.primary">
                        {d.menu ?? 'Menu'}
                    </Typography>
                    <IconButton aria-label="Close" onClick={closeDrawer} size="small" sx={{ bgcolor: 'rgba(15,23,42,0.06)' }}>
                        <CloseRoundedIcon fontSize="small" />
                    </IconButton>
                </Box>
                <Divider />
                <List sx={{ px: 1, py: 1 }} disablePadding>
                    <ListItemButton
                        component={Link}
                        href={`/${lang}/login`}
                        onClick={closeDrawer}
                        sx={{ borderRadius: 2, py: 1.5 }}
                    >
                        <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>
                            <LoginRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary={d.login} primaryTypographyProps={{ fontWeight: 600 }} />
                    </ListItemButton>
                    <ListItemButton
                        component={Link}
                        href={`/${lang}/register`}
                        onClick={closeDrawer}
                        sx={{ borderRadius: 2, py: 1.5 }}
                    >
                        <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>
                            <PersonAddAltRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary={d.getStarted} primaryTypographyProps={{ fontWeight: 700 }} />
                    </ListItemButton>
                    <Divider sx={{ my: 1 }} />
                    <ListItemButton
                        onClick={() => {
                            toggleLang();
                            closeDrawer();
                        }}
                        sx={{ borderRadius: 2, py: 1.5 }}
                    >
                        <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
                            <LanguageRoundedIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={d.switchToOtherLang ?? otherLangLabel}
                            secondary={d.language}
                            primaryTypographyProps={{ fontWeight: 600, fontSize: '0.95rem' }}
                            secondaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
                        />
                    </ListItemButton>
                </List>
            </Drawer>
        </Box>
    );
}
