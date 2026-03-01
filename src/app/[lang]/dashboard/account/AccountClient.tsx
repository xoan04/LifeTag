'use client';
import { useState, useEffect } from 'react';
import {
    Box, Typography, TextField, Button, Card, CardContent,
    Divider, Grid, MenuItem, Select, FormControl, InputLabel,
    Alert, CircularProgress, Paper
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import { UserUseCases } from '@/useCases/userUseCases';
import { User } from '@/models/auth';

export default function AccountClient({ dictionary, lang }: { dictionary: any, lang: string }) {
    const [user, setUser] = useState<User | null>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [plan, setPlan] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Try from localStorage first for instant feel
                const localUser = localStorage.getItem('lifeTag_user');
                if (localUser) {
                    const parsed = JSON.parse(localUser);
                    setUser(parsed);
                    setName(parsed.name || '');
                    setEmail(parsed.email || '');
                    setPlan(parsed.subscriptionPlan || 'FREE');
                }

                // Then fetch fresh data
                const freshUser = await UserUseCases.getProfile();
                setUser(freshUser);
                setName(freshUser.name || '');
                setEmail(freshUser.email || '');
                setPlan(freshUser.subscriptionPlan || 'FREE');
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);
        try {
            await UserUseCases.updateProfile({ name, email });
            setMessage({ type: 'success', text: 'Profile updated successfully' });
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Error updating profile' });
        } finally {
            setSaving(false);
        }
    };

    const handleUpdatePlan = async () => {
        setSaving(true);
        setMessage(null);
        try {
            await UserUseCases.changePlan(plan);
            setMessage({ type: 'success', text: 'Plan updated successfully' });
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Error updating plan' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', py: 4 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom color="primary">
                {dictionary.account.title}
            </Typography>

            {message && (
                <Alert severity={message.type} sx={{ mb: 3 }} onClose={() => setMessage(null)}>
                    {message.text}
                </Alert>
            )}

            <Grid container spacing={4}>
                {/* Profile Section */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent sx={{ p: 4 }}>
                            <Box display="flex" alignItems="center" gap={1} mb={3}>
                                <PersonIcon color="primary" />
                                <Typography variant="h6" fontWeight={600}>
                                    {dictionary.account.profile.title}
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" mb={4}>
                                {dictionary.account.profile.subtitle}
                            </Typography>

                            <form onSubmit={handleSaveProfile}>
                                <Box display="flex" flexDirection="column" gap={3}>
                                    <TextField
                                        fullWidth
                                        label={dictionary.account.profile.name}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <TextField
                                        fullWidth
                                        label={dictionary.account.profile.email}
                                        value={email}
                                        disabled // Usually email is not editable directly in simple flows
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={saving}
                                        sx={{ alignSelf: 'flex-start', mt: 1 }}
                                    >
                                        {saving ? <CircularProgress size={24} /> : dictionary.account.profile.save}
                                    </Button>
                                </Box>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Subscription Section */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent sx={{ p: 4 }}>
                            <Box display="flex" alignItems="center" gap={1} mb={3}>
                                <CardMembershipIcon color="primary" />
                                <Typography variant="h6" fontWeight={600}>
                                    {dictionary.account.subscription.title}
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" mb={4}>
                                {dictionary.account.subscription.subtitle}
                            </Typography>

                            <Box display="flex" flexDirection="column" gap={3}>
                                <FormControl fullWidth>
                                    <InputLabel>{dictionary.account.subscription.currentPlan}</InputLabel>
                                    <Select
                                        value={plan}
                                        label={dictionary.account.subscription.currentPlan}
                                        onChange={(e) => setPlan(e.target.value)}
                                    >
                                        <MenuItem value="FREE">FREE - Basic Protection</MenuItem>
                                        <MenuItem value="PRO">PRO - Advanced Features</MenuItem>
                                        <MenuItem value="ELITE">ELITE - Full Coverage</MenuItem>
                                    </Select>
                                </FormControl>

                                <Paper variant="outlined" sx={{ p: 2, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                                    <Typography variant="subtitle2" fontWeight={700}>
                                        {plan === 'FREE' ? 'Upgrade to PRO for more storage!' : 'You are currently on ' + plan}
                                    </Typography>
                                </Paper>

                                <Button
                                    variant="outlined"
                                    onClick={handleUpdatePlan}
                                    disabled={saving || plan === user?.subscriptionPlan}
                                    sx={{ alignSelf: 'flex-start' }}
                                >
                                    {saving ? <CircularProgress size={24} /> : dictionary.account.subscription.updatePlan}
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
