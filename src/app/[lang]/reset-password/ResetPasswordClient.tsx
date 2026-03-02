'use client';

import { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Link,
    CircularProgress,
    Snackbar,
    Alert,
} from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { useRouter } from 'next/navigation';
import { AuthUseCases } from '@/useCases/authUseCases';

export default function ResetPasswordClient({
    dictionary,
    lang,
    initialEmail = '',
}: {
    dictionary: any;
    lang: string;
    initialEmail?: string;
}) {
    const router = useRouter();
    const [email, setEmail] = useState(initialEmail);
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: 'success' | 'error';
    }>({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        setEmail(initialEmail);
    }, [initialEmail]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await AuthUseCases.resetPasswordUser({ email, otp, newPassword });
            setSnackbar({
                open: true,
                message: dictionary.auth.resetPassword.snackbarSuccess,
                severity: 'success',
            });
            setOtp('');
            setNewPassword('');
            setTimeout(() => router.push(`/${lang}/login`), 1500);
        } catch (_err) {
            setSnackbar({
                open: true,
                message: dictionary.auth.resetPassword.snackbarError,
                severity: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar((s) => ({ ...s, open: false }));
    };

    return (
        <Box className="min-h-screen flex items-center justify-center p-4 relative">
            <Button
                onClick={() =>
                    (window.location.href = `/${lang === 'en' ? 'es' : 'en'}${window.location.pathname.replace(`/${lang}`, '')}`)
                }
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
                        <Typography variant="h5" color="primary" fontWeight={700}>
                            {dictionary.auth.resetPassword.title}
                        </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" className="text-center">
                        {dictionary.auth.resetPassword.subtitle}
                    </Typography>

                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 mt-2">
                        <TextField
                            fullWidth
                            label={dictionary.auth.resetPassword.email}
                            variant="outlined"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                        <TextField
                            fullWidth
                            label={dictionary.auth.resetPassword.otp}
                            variant="outlined"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            inputProps={{ maxLength: 6, inputMode: 'numeric' }}
                            placeholder="000000"
                        />
                        <TextField
                            fullWidth
                            label={dictionary.auth.resetPassword.newPassword}
                            variant="outlined"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            disabled={loading}
                            className="mt-2"
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                dictionary.auth.resetPassword.submit
                            )}
                        </Button>
                    </form>

                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => router.push(`/${lang}/login`)}
                        fontWeight={600}
                    >
                        {dictionary.auth.resetPassword.backToLogin}
                    </Link>
                </CardContent>
            </Card>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled">
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
