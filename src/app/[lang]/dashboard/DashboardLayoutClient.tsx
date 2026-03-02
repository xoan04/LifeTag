'use client';
import { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Container, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter, usePathname } from 'next/navigation';
import { AuthUseCases } from '@/useCases/authUseCases';

export default function DashboardLayoutClient({ children, dictionary, lang }: { children: React.ReactNode, dictionary: any, lang: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = () => {
        AuthUseCases.logout();
        router.push(`/${lang}/login`);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2, color: 'primary.main', fontWeight: 'bold' }}>
                LifeTag
            </Typography>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }} onClick={() => router.push(`/${lang}/dashboard`)}>
                        <ListItemText primary={dictionary.dashboard.nav.overview} primaryTypographyProps={{ fontWeight: pathname === `/${lang}/dashboard` ? 700 : 400 }} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }} onClick={() => router.push(`/${lang}/dashboard/profiles`)}>
                        <ListItemText primary={dictionary.dashboard.nav.profiles} primaryTypographyProps={{ fontWeight: pathname.includes('/dashboard/profiles') ? 700 : 400 }} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }} onClick={() => router.push(`/${lang}/dashboard/account`)}>
                        <ListItemText primary={dictionary.account.title} primaryTypographyProps={{ fontWeight: pathname.includes('/dashboard/account') ? 700 : 400 }} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }} onClick={handleLogout}>
                        <ListItemText primary={dictionary.dashboard.nav.logout} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
            <AppBar position="static" color="inherit" elevation={1}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2, display: { sm: 'none' } }} onClick={handleDrawerToggle}>
                        <MenuIcon />
                    </IconButton>
                    <MedicalServicesIcon sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700, color: 'primary.main' }}>
                        LifeTag
                    </Typography>

                    <Button
                        color="inherit"
                        onClick={() => window.location.href = `/${lang === 'en' ? 'es' : 'en'}${window.location.pathname.replace(`/${lang}`, '')}`}
                        sx={{ minWidth: 0, px: 1, mr: { xs: 0, sm: 2 }, fontWeight: 'bold' }}
                    >
                        {lang === 'en' ? 'EN' : 'ES'}
                    </Button>

                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
                        <Button
                            color="inherit"
                            onClick={() => router.push(`/${lang}/dashboard`)}
                            sx={{ fontWeight: pathname === `/${lang}/dashboard` ? 700 : 400 }}
                        >
                            {dictionary.dashboard.nav.overview}
                        </Button>
                        <Button
                            color="inherit"
                            onClick={() => router.push(`/${lang}/dashboard/profiles`)}
                            sx={{ fontWeight: pathname.includes('/dashboard/profiles') ? 700 : 400 }}
                        >
                            {dictionary.dashboard.nav.profiles}
                        </Button>
                        <Button
                            color="inherit"
                            onClick={() => router.push(`/${lang}/dashboard/account`)}
                            sx={{ fontWeight: pathname.includes('/dashboard/account') ? 700 : 400 }}
                        >
                            {dictionary.account.title}
                        </Button>
                        <Button color="inherit" onClick={handleLogout}>{dictionary.dashboard.nav.logout}</Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <nav>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
                {children}
            </Container>
        </Box>
    );
}
