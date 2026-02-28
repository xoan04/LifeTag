'use client';
import { Box, Typography, Button, Grid, Card, CardContent, Chip, IconButton, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import LaunchIcon from '@mui/icons-material/Launch';
import PetsIcon from '@mui/icons-material/Pets';
import PersonIcon from '@mui/icons-material/Person';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { useRouter } from 'next/navigation';
import { mockProfiles, mockDevices } from '@/data/mockData';

export default function ProfilesClient({ dictionary, lang }: { dictionary: any; lang: string }) {
    const router = useRouter();

    return (
        <Box sx={{ position: 'relative', minHeight: '80vh' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h2">{dictionary.dashboard.nav.profiles}</Typography>
                <Box display="flex" gap={2}>
                    <Button
                        variant="contained"
                        startIcon={<QrCodeScannerIcon />}
                        sx={{ display: { xs: 'none', sm: 'flex' } }}
                        onClick={() => router.push(`/${lang}/dashboard/activate`)}
                    >
                        {dictionary.dashboard.home.activateDevice}
                    </Button>
                </Box>
            </Box>

            <Grid container spacing={3}>
                {mockProfiles.map(profile => {
                    const profileDevices = mockDevices.filter(d => d.profileId === profile.id);
                    const hasDevices = profileDevices.length > 0;
                    const firstDeviceToken = hasDevices ? profileDevices[0].deviceToken : '';

                    return (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={profile.id}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            {profile.type === 'HUMAN' ? <PersonIcon color="secondary" /> : <PetsIcon sx={{ color: '#F57C00' }} />}
                                            <Typography variant="h6" fontWeight="bold">
                                                {profile.name}
                                            </Typography>
                                        </Box>
                                        <Chip
                                            label={profile.isActive ? 'Active' : 'Inactive'}
                                            color={profile.isActive ? 'success' : 'default'}
                                            size="small"
                                        />
                                    </Box>

                                    <Box mb={3}>
                                        <Typography variant="body2" color="text.secondary">
                                            {profile.type === 'HUMAN' ? dictionary.profile.human : dictionary.profile.pet}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {dictionary.profile.devices}: {profileDevices.length}
                                        </Typography>
                                    </Box>

                                    <Box display="flex" gap={1} mt="auto">
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            startIcon={<EditIcon />}
                                            onClick={() => router.push(`/${lang}/dashboard/profiles/${profile.id}`)}
                                            fullWidth
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            size="small"
                                            startIcon={<LaunchIcon />}
                                            onClick={() => window.open(`/${lang}/id/${firstDeviceToken}`, '_blank')}
                                            disabled={!hasDevices}
                                            fullWidth
                                        >
                                            View
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>

            <Fab
                color="primary"
                aria-label="activate"
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    display: { xs: 'flex', sm: 'none' }
                }}
                onClick={() => router.push(`/${lang}/dashboard/activate`)}
            >
                <QrCodeScannerIcon />
            </Fab>
        </Box>
    );
}
