'use client';
import { Grid, Card, CardContent, Typography, Box, Button } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import PetsIcon from '@mui/icons-material/Pets';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useRouter } from 'next/navigation';
import { mockProfiles, mockScanLogs } from '@/data/mockData';

export default function DashboardClient({ dictionary, lang }: { dictionary: any, lang: string }) {
    const router = useRouter();

    const activeProfiles = mockProfiles.filter(p => p.isActive).length;
    const humanProfiles = mockProfiles.filter(p => p.type === 'HUMAN').length;
    const petProfiles = mockProfiles.filter(p => p.type === 'PET').length;

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h2" color="text.primary">
                    {dictionary.dashboard.home.welcome}
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={() => router.push(`/${lang}/dashboard/activate`)}
                >
                    {dictionary.dashboard.home.activateDevice}
                </Button>
            </Box>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Box>
                                    <Typography color="textSecondary" gutterBottom variant="overline">
                                        {dictionary.dashboard.home.activeProfiles}
                                    </Typography>
                                    <Typography variant="h3">{mockProfiles.length}</Typography>
                                </Box>
                                <PeopleIcon color="primary" sx={{ fontSize: 40, opacity: 0.8 }} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Box>
                                    <Typography color="textSecondary" gutterBottom variant="overline">
                                        Human Profiles
                                    </Typography>
                                    <Typography variant="h3">{humanProfiles}</Typography>
                                </Box>
                                <PeopleIcon color="secondary" sx={{ fontSize: 40, opacity: 0.8 }} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Box>
                                    <Typography color="textSecondary" gutterBottom variant="overline">
                                        Pet Profiles
                                    </Typography>
                                    <Typography variant="h3">{petProfiles}</Typography>
                                </Box>
                                <PetsIcon sx={{ fontSize: 40, opacity: 0.8, color: '#F57C00' }} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Box>
                                    <Typography color="textSecondary" gutterBottom variant="overline">
                                        {dictionary.dashboard.home.recentScans}
                                    </Typography>
                                    <Typography variant="h3">{mockScanLogs.length}</Typography>
                                </Box>
                                <QrCodeScannerIcon sx={{ fontSize: 40, opacity: 0.8, color: '#4CAF50' }} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
