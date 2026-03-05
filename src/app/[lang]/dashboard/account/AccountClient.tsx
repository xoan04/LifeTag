'use client';
import { useState, useEffect } from 'react';
import {
    Box, Typography, TextField, Button, Card, CardContent,
    Alert, CircularProgress, Chip, Stack, LinearProgress, Divider,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import StarIcon from '@mui/icons-material/Star';
import { UserUseCases } from '@/useCases/userUseCases';
import { PlanUseCases } from '@/useCases/planUseCases';
import { User } from '@/models/auth';
import { MembershipResponse } from '@/models/plan';

export default function AccountClient({ dictionary, lang }: { dictionary: any; lang: string }) {
    const [user, setUser] = useState<User | null>(null);
    const [membership, setMembership] = useState<MembershipResponse | null>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Optimistic UI: cargar desde localStorage al instante
                const localUser = localStorage.getItem('lifeTag_user');
                if (localUser) {
                    try {
                        const parsed = JSON.parse(localUser);
                        setUser(parsed);
                        setName(parsed.name || '');
                        setEmail(parsed.email || '');
                    } catch (_) { }
                }

                // Fuente de verdad: API
                const [freshUser, freshMembership] = await Promise.all([
                    UserUseCases.getMe(),
                    UserUseCases.getMembership(),
                ]);
                setUser(freshUser);
                setMembership(freshMembership);
                setName(freshUser.name || '');
                setEmail(freshUser.email || '');
            } catch (error) {
                console.error('Error fetching account data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);
        try {
            const updated = await UserUseCases.updateProfile({ name, email });
            setUser(updated);
            setMessage({ type: 'success', text: dictionary.account.profile.saveSuccess });
            setIsEditingProfile(false);
        } catch (error: any) {
            setMessage({ type: 'error', text: error?.message ?? dictionary.account.profile.saveError });
        } finally {
            setSaving(false);
        }
    };

    const handleCancelEdit = () => {
        if (user) {
            setName(user.name ?? '');
            setEmail(user.email ?? '');
        }
        setIsEditingProfile(false);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress />
            </Box>
        );
    }

    const profilePct = membership && membership.maxProfiles > 0
        ? Math.round((membership.profilesUsed / membership.maxProfiles) * 100)
        : null;

    const devicePct = membership && membership.maxDevices > 0 && membership.maxDevices < 999
        ? Math.round((membership.devicesUsed / membership.maxDevices) * 100)
        : null;

    return (
        <Box sx={{ maxWidth: 860, mx: 'auto', py: 4 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom color="primary">
                {dictionary.account.title}
            </Typography>

            {message && (
                <Alert severity={message.type} sx={{ mb: 3 }} onClose={() => setMessage(null)}>
                    {message.text}
                </Alert>
            )}

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
                {/* ── Perfil ── */}
                <Card variant="outlined" sx={{ flex: 1 }}>
                    <CardContent sx={{ p: 4 }}>
                        <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1} mb={3}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <PersonIcon color="primary" />
                                <Typography variant="h6" fontWeight={600}>
                                    {dictionary.account.profile.title}
                                </Typography>
                            </Box>
                            {!isEditingProfile ? (
                                <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<EditIcon />}
                                    onClick={() => setIsEditingProfile(true)}
                                >
                                    {dictionary.account.profile.edit}
                                </Button>
                            ) : (
                                <Button variant="outlined" size="small" color="inherit" onClick={handleCancelEdit}>
                                    {dictionary.account.profile.cancel}
                                </Button>
                            )}
                        </Box>
                        <Typography variant="body2" color="text.secondary" mb={4}>
                            {dictionary.account.profile.subtitle}
                        </Typography>

                        <form onSubmit={handleSaveProfile}>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    label={dictionary.account.profile.name}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    InputProps={{ readOnly: !isEditingProfile }}
                                />
                                <TextField
                                    fullWidth
                                    label={dictionary.account.profile.email}
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    InputProps={{ readOnly: !isEditingProfile }}
                                />
                                {isEditingProfile && (
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={saving}
                                        sx={{ alignSelf: 'flex-start' }}
                                    >
                                        {saving ? <CircularProgress size={22} /> : dictionary.account.profile.save}
                                    </Button>
                                )}
                            </Stack>
                        </form>
                    </CardContent>
                </Card>

                {/* ── Suscripción ── */}
                <Card variant="outlined" sx={{ flex: 1 }}>
                    <CardContent sx={{ p: 4 }}>
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                            <CardMembershipIcon color="primary" />
                            <Typography variant="h6" fontWeight={600}>
                                {dictionary.account.subscription.title}
                            </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" mb={3}>
                            {dictionary.account.subscription.subtitle}
                        </Typography>

                        <Stack spacing={2}>
                            {/* Plan badge */}
                            <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                                <Chip
                                    label={membership?.subscriptionPlan ?? user?.subscriptionPlan ?? '—'}
                                    color="primary"
                                    variant="outlined"
                                    size="small"
                                />
                                {membership?.isSuperAccount && (
                                    <Chip
                                        icon={<StarIcon fontSize="small" />}
                                        label="Super Account"
                                        color="warning"
                                        size="small"
                                    />
                                )}
                                {membership?.isDemo && !membership.isSuperAccount && (
                                    <Chip label="Demo (solo lectura)" color="default" size="small" />
                                )}
                            </Box>

                            {membership ? (
                                <>
                                    <Divider />

                                    {/* Perfiles */}
                                    <Box>
                                        <Box display="flex" justifyContent="space-between" mb={0.5}>
                                            <Typography variant="caption" color="text.secondary">Perfiles</Typography>
                                            <Typography variant="caption" fontWeight={600}>
                                                {membership.isSuperAccount
                                                    ? `${membership.profilesUsed} / ∞`
                                                    : `${membership.profilesUsed} / ${membership.maxProfiles}`}
                                            </Typography>
                                        </Box>
                                        {profilePct !== null && (
                                            <LinearProgress
                                                variant="determinate"
                                                value={Math.min(profilePct, 100)}
                                                color={profilePct >= 90 ? 'error' : 'primary'}
                                                sx={{ borderRadius: 1, height: 6 }}
                                            />
                                        )}
                                    </Box>

                                    {/* Dispositivos */}
                                    <Box>
                                        <Box display="flex" justifyContent="space-between" mb={0.5}>
                                            <Typography variant="caption" color="text.secondary">Dispositivos</Typography>
                                            <Typography variant="caption" fontWeight={600}>
                                                {membership.isSuperAccount || membership.maxDevices >= 999
                                                    ? `${membership.devicesUsed} / ∞`
                                                    : `${membership.devicesUsed} / ${membership.maxDevices}`}
                                            </Typography>
                                        </Box>
                                        {devicePct !== null && (
                                            <LinearProgress
                                                variant="determinate"
                                                value={Math.min(devicePct, 100)}
                                                color={devicePct >= 90 ? 'error' : 'primary'}
                                                sx={{ borderRadius: 1, height: 6 }}
                                            />
                                        )}
                                    </Box>

                                    {/* Mensaje demo */}
                                    {membership.isDemo && !membership.isSuperAccount && (
                                        <Alert severity="info" sx={{ mt: 1 }}>
                                            {PlanUseCases.demoPlanMessage()}
                                        </Alert>
                                    )}
                                </>
                            ) : (
                                <CircularProgress size={20} />
                            )}
                        </Stack>
                    </CardContent>
                </Card>
            </Stack>
        </Box>
    );
}
