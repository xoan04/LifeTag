'use client';
import { Box, AppBar, Toolbar, Typography, Button, Container, IconButton } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter, usePathname } from 'next/navigation';

export default function DashboardLayoutClient({ children, dictionary, lang }: { children: React.ReactNode, dictionary: any, lang: string }) {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
            <AppBar position="static" color="inherit" elevation={1}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2, display: { sm: 'none' } }}>
                        <MenuIcon />
                    </IconButton>
                    <MedicalServicesIcon sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700, color: 'primary.main' }}>
                        LifeTag
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
                        <Button
                            color="inherit"
                            onClick={() => window.location.href = `/${lang === 'en' ? 'es' : 'en'}${window.location.pathname.replace(`/${lang}`, '')}`}
                            sx={{ minWidth: 0, px: 1, fontWeight: 'bold' }}
                        >
                            {lang === 'en' ? 'ES' : 'EN'}
                        </Button>
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
                        <Button color="inherit" onClick={() => router.push(`/${lang}/login`)}>{dictionary.dashboard.nav.logout}</Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
                {children}
            </Container>
        </Box>
    );
}
