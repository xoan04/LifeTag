'use client';
import { useState, useEffect } from 'react';
import {
    Grid, Card, CardContent, Typography, Box, Button, CircularProgress, Skeleton,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import PetsIcon from '@mui/icons-material/Pets';
import DevicesIcon from '@mui/icons-material/Devices';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useRouter } from 'next/navigation';

import { ProfileUseCases } from '@/useCases/profileUseCases';
import { DeviceUseCases } from '@/useCases/deviceUseCases';
import { Profile } from '@/models/profile';
import { Device } from '@/models/device';

export default function DashboardClient({ dictionary, lang }: { dictionary: any; lang: string }) {
    const router = useRouter();
    const d = dictionary.dashboard.home;

    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [devices, setDevices] = useState<Device[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            ProfileUseCases.getProfiles(),
            DeviceUseCases.getDevices(),
        ])
            .then(([p, d]) => { setProfiles(p); setDevices(d); })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const activeProfiles = profiles.filter(p => p.isActive).length;
    const humanProfiles = profiles.filter(p => p.type === 'HUMAN').length;
    const petProfiles = profiles.filter(p => p.type === 'PET').length;
    const activeDevices = devices.filter(dv => dv.status === 'ACTIVE').length;

    const stats = [
        { label: d.activeProfiles, value: activeProfiles, icon: <PeopleIcon color="primary" sx={{ fontSize: 40, opacity: 0.8 }} /> },
        { label: d.humanProfiles, value: humanProfiles, icon: <PeopleIcon color="secondary" sx={{ fontSize: 40, opacity: 0.8 }} /> },
        { label: d.petProfiles, value: petProfiles, icon: <PetsIcon sx={{ fontSize: 40, opacity: 0.8, color: '#F57C00' }} /> },
        { label: d.activeDevices, value: activeDevices, icon: <DevicesIcon sx={{ fontSize: 40, opacity: 0.8, color: '#4CAF50' }} /> },
    ];

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} flexWrap="wrap" gap={2}>
                <Typography variant="h4" fontWeight={700} color="text.primary">
                    {d.welcome}
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={() => router.push(`/${lang}/dashboard/activate`)}
                >
                    {d.activateDevice}
                </Button>
            </Box>

            <Grid container spacing={3}>
                {stats.map(({ label, value, icon }) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={label}>
                        <Card>
                            <CardContent>
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Box>
                                        <Typography color="textSecondary" gutterBottom variant="overline">
                                            {label}
                                        </Typography>
                                        {loading ? (
                                            <Skeleton variant="text" width={40} height={48} />
                                        ) : (
                                            <Typography variant="h3">{value}</Typography>
                                        )}
                                    </Box>
                                    {icon}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
