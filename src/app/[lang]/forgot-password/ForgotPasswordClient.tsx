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

const RESEND_COOLDOWN_SECONDS = 60;

export default function ForgotPasswordClient({
    dictionary,
    lang,
}: {
    dictionary: any;
    lang: string;
}) {
    const router = useRouter();
    const [step, setStep] = useState<'email' | 'code'>('email');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);
    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: 'success' | 'error';
    }>({ open: false, message: '', severity: 'success' });

    // Timer para reenviar código (1 minuto)
    useEffect(() => {
        if (resendCooldown <= 0) return;
        const t = setInterval(() => {
            setResendCooldown((s) => {
                if (s <= 1) {
                    clearInterval(t);
                    return 0;
                }
                return s - 1;
            });
        }, 1000);
        return () => clearInterval(t);
    }, [resendCooldown]);

    const showSnackbar = (message: string, severity: 'success' | 'error') => {
        setSnackbar({ open: true, message, severity });
    };

    const handleCloseSnackbar = () => {
        setSnackbar((s) => ({ ...s, open: false }));
    };

    const handleSendCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await AuthUseCases.forgotPasswordUser({ email });
            showSnackbar(dictionary.auth.forgotPassword.snackbarSuccess, 'success');
            setStep('code');
            setResendCooldown(RESEND_COOLDOWN_SECONDS);
        } catch (_err) {
            showSnackbar(dictionary.auth.forgotPassword.snackbarError, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        if (resendCooldown > 0) return;
        setLoading(true);
        try {
            await AuthUseCases.forgotPasswordUser({ email });
            showSnackbar(dictionary.auth.forgotPassword.snackbarSuccess, 'success');
            setResendCooldown(RESEND_COOLDOWN_SECONDS);
        } catch (_err) {
            showSnackbar(dictionary.auth.forgotPassword.snackbarError, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await AuthUseCases.resetPasswordUser({ email, otp, newPassword });
            showSnackbar(dictionary.auth.resetPassword.snackbarSuccess, 'success');
            setTimeout(() => router.push(`/${lang}/login`), 1500);
        } catch (_err) {
            showSnackbar(dictionary.auth.resetPassword.snackbarError, 'error');
        } finally {
            setLoading(false);
        }
    };

    const resendLabel =
        resendCooldown > 0
            ? (dictionary.auth.forgotPassword.resendCodeIn as string).replace(
                  '{{seconds}}',
                  String(resendCooldown)
              )
            : dictionary.auth.forgotPassword.resendCode;

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
                            {dictionary.auth.forgotPassword.title}
                        </Typography>
                    </Box>

                    {step === 'email' ? (
                        <>
                            <Typography variant="body2" color="text.secondary" className="text-center">
                                {dictionary.auth.forgotPassword.subtitle}
                            </Typography>
                            <form onSubmit={handleSendCode} className="w-full flex flex-col gap-4 mt-2">
                                <TextField
                                    fullWidth
                                    label={dictionary.auth.forgotPassword.email}
                                    variant="outlined"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="email"
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
                                        dictionary.auth.forgotPassword.submit
                                    )}
                                </Button>
                            </form>
                        </>
                    ) : (
                        <>
                            <Typography variant="body2" color="text.secondary" className="text-center">
                                {dictionary.auth.forgotPassword.subtitleStep2}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" className="text-center">
                                {email}
                            </Typography>
                            <form onSubmit={handleResetPassword} className="w-full flex flex-col gap-4 mt-2">
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
                                    type="button"
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    disabled={resendCooldown > 0 || loading}
                                    onClick={handleResendCode}
                                >
                                    {resendLabel}
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    fullWidth
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : (
                                        dictionary.auth.resetPassword.submit
                                    )}
                                </Button>
                            </form>
                        </>
                    )}

                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => router.push(`/${lang}/login`)}
                        fontWeight={600}
                    >
                        {dictionary.auth.forgotPassword.backToLogin}
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
