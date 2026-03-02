'use client';
import { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Link, CircularProgress, Alert } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { useRouter } from 'next/navigation';
import { AuthUseCases } from '@/useCases/authUseCases';

export default function RegisterClient({ dictionary, lang }: { dictionary: any; lang: string }) {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            setLoading(true);
            await AuthUseCases.registerUser({
                name,
                email,
                password
            });
            router.push(`/${lang}/dashboard`);
        } catch (err: any) {
            console.error('Registration failed:', err);
            setError(err.message || 'Registration failed. Please try again.');
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
                    <Box className="flex items-center gap-2">
                        <MedicalServicesIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                        <Typography variant="h2" color="primary" fontWeight={700}>
                            LifeTag
                        </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary" className="text-center">
                        {dictionary.auth.register.subtitle}
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ width: '100%' }}>
                            {error}
                        </Alert>
                    )}

                    <form onSubmit={handleRegister} className="w-full flex flex-col gap-4 mt-2">
                        <TextField
                            fullWidth
                            label={dictionary.auth.register.name}
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            label={dictionary.auth.register.email}
                            variant="outlined"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            label={dictionary.auth.register.password}
                            variant="outlined"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            label={"Confirm " + dictionary.auth.register.password}
                            variant="outlined"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            disabled={loading}
                            className="mt-4"
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : dictionary.auth.register.submit}
                        </Button>
                    </form>

                    <Typography variant="body2" className="mt-4">
                        {dictionary.auth.register.hasAccount}{' '}
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => router.push(`/${lang}/login`)}
                            fontWeight={600}
                        >
                            {dictionary.auth.register.login}
                        </Link>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
