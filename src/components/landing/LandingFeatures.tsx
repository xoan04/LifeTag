'use client';

import { Box, Container, Typography, Grid } from '@mui/material';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import LockIcon from '@mui/icons-material/Lock';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PetsIcon from '@mui/icons-material/Pets';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

export function LandingFeatures({ dictionary }: { dictionary: any }) {
    const list = dictionary.landing.features.list;
    const feats = [
        { title: list.devices.title, desc: list.devices.desc, icon: <DevicesOtherIcon /> },
        { title: list.control.title, desc: list.control.desc, icon: <LockIcon /> },
        { title: list.notifications.title, desc: list.notifications.desc, icon: <NotificationsActiveIcon /> },
        { title: list.pets.title, desc: list.pets.desc, icon: <PetsIcon /> },
        { title: list.realtime.title, desc: list.realtime.desc, icon: <CloudDoneIcon /> },
        { title: list.noApp.title, desc: list.noApp.desc, icon: <QrCodeScannerIcon /> },
    ];
    const d = dictionary.landing.features;
    return (
        <Box className="py-24 bg-white">
            <Container maxWidth="lg">
                <Box className="text-center mb-16">
                    <Typography variant="h3" fontWeight={800} className="text-gray-900 mb-4">
                        {d.title}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" className="font-normal max-w-2xl mx-auto">
                        {d.subtitle}
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {feats.map((feat, i) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                            <Box className="p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-xl transition-all h-full">
                                <div className="p-3 bg-white w-fit rounded-xl shadow-sm text-primary border border-gray-100 mb-4">
                                    {feat.icon}
                                </div>
                                <Typography variant="h6" fontWeight="bold" className="mb-2 text-gray-900">
                                    {feat.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" className="leading-relaxed">
                                    {feat.desc}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
