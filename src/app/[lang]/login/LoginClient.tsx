'use client';

import { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Link, CircularProgress, Alert } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { useRouter } from 'next/navigation';
import { AuthUseCases } from '@/useCases/authUseCases';

export default function LoginClient({ dictionary, lang }: { dictionary: any; lang: string }) {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            setLoading(true);
            await AuthUseCases.loginUser({ email, password });
            router.push(`/${lang}/dashboard`);
        } catch (err: any) {
            setError(err?.message ?? dictionary.auth.login.errorGeneric);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box className="min-h-screen flex items-center justify-center p-4 relative">
            <Button
                onClick={() => window.location.href = `/${lang === 'en' ? 'es' : 'en'}${window.location.pathname.replace(`/${lang}`, '')}`}
                variant="outlined"
                color="primary"
                sx={{ position: 'absolute', top: 16, right: 16, fontWeight: 'bold' }}
            >
                {lang === 'en' ? 'EN' : 'ES'}
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

                    {error && (
                        <Alert severity="error" onClose={() => setError(null)} sx={{ width: '100%' }}>
                            {error}
                        </Alert>
                    )}

                    <form onSubmit={handleLogin} className="w-full flex flex-col gap-4 mt-2">
                        <TextField
                            fullWidth
                            label={dictionary.auth.login.email}
                            variant="outlined"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                        <TextField
                            fullWidth
                            label={dictionary.auth.login.password}
                            variant="outlined"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Link
                                component="button"
                                type="button"
                                variant="body2"
                                onClick={() => router.push(`/${lang}/forgot-password`)}
                            >
                                {dictionary.auth.login.forgot}
                            </Link>
                        </Box>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            disabled={loading}
                            className="mt-4"
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : dictionary.auth.login.submit}
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
