'use client';
import { Box, Card, CardContent, Typography, TextField, Button, Link } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { useRouter } from 'next/navigation';

export default function LoginClient({ dictionary, lang }: { dictionary: any; lang: string }) {
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/${lang}/dashboard`);
    };

    return (
        <Box className="min-h-screen flex items-center justify-center p-4 relative">
            <Button
                onClick={() => window.location.href = `/${lang === 'en' ? 'es' : 'en'}${window.location.pathname.replace(`/${lang}`, '')}`}
                variant="outlined"
                color="primary"
                sx={{ position: 'absolute', top: 16, right: 16, fontWeight: 'bold' }}
            >
                {lang === 'en' ? 'ES' : 'EN'}
            </Button>
            <Card className="max-w-md w-full p-4">
                <CardContent className="flex flex-col items-center gap-6">
                    <Box className="flex items-center gap-2 text-primary-main">
                        <MedicalServicesIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                        <Typography variant="h2" color="primary" fontWeight={700}>
                            LifeTag
                        </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary" className="text-center">
                        {dictionary.auth.login.subtitle}
                    </Typography>

                    <form onSubmit={handleLogin} className="w-full flex flex-col gap-4 mt-2">
                        <TextField
                            fullWidth
                            label={dictionary.auth.login.email}
                            variant="outlined"
                            type="email"
                            required
                        />
                        <TextField
                            fullWidth
                            label={dictionary.auth.login.password}
                            variant="outlined"
                            type="password"
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            className="mt-4"
                        >
                            {dictionary.auth.login.submit}
                        </Button>
                    </form>

                    <Typography variant="body2" className="mt-4">
                        {dictionary.auth.login.noAccount}{' '}
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => router.push(`/${lang}/register`)}
                            fontWeight={600}
                        >
                            {dictionary.auth.login.register}
                        </Link>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
