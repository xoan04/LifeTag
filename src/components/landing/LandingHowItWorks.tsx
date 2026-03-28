'use client';

import { Box, Container, Typography, Grid } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

export function LandingHowItWorks({ dictionary }: { dictionary: any }) {
    const d = dictionary.landing.howItWorks;
    const steps = [
        { step: '01', title: d.steps.one.title, desc: d.steps.one.desc, icon: <PeopleIcon fontSize="large" /> },
        { step: '02', title: d.steps.two.title, desc: d.steps.two.desc, icon: <DevicesOtherIcon fontSize="large" /> },
        { step: '03', title: d.steps.three.title, desc: d.steps.three.desc, icon: <QrCodeScannerIcon fontSize="large" /> },
    ];
    return (
        <Box className="py-24 bg-gray-900 text-white">
            <Container maxWidth="lg">
                <Box className="text-center mb-16">
                    <Typography variant="h3" fontWeight={800} className="mb-4">
                        {d.title}
                    </Typography>
                    <Typography variant="h6" className="text-gray-400 font-normal">
                        {d.subtitle}
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {steps.map((item, i) => (
                        <Grid size={{ xs: 12, md: 4 }} key={i}>
                            <Box className="text-center relative p-8">
                                <Typography
                                    variant="h1"
                                    fontWeight={900}
                                    className="absolute top-0 left-1/2 transform -translate-x-1/2 text-gray-800/30 -z-10 text-9xl"
                                >
                                    {item.step}
                                </Typography>
                                <div className="text-red-400 mb-6 flex justify-center">{item.icon}</div>
                                <Typography variant="h5" fontWeight="bold" className="mb-3">
                                    {item.title}
                                </Typography>
                                <Typography className="text-gray-400 leading-relaxed">{item.desc}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
