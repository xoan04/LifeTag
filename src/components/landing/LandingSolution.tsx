'use client';

import { Box, Container, Typography, Grid, Chip, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

export function LandingSolution({ dictionary }: { dictionary: any }) {
    const d = dictionary.landing.solution;
    return (
        <Box className="py-24 bg-white relative">
            <Container maxWidth="lg">
                <Grid container spacing={8} alignItems="center">
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="overline" color="primary" fontWeight="bold" className="tracking-widest">
                            {d.overline}
                        </Typography>
                        <Typography variant="h3" fontWeight={800} className="text-gray-900 mt-2 mb-6 leading-tight">
                            {d.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" className="text-lg leading-relaxed mb-6">
                            {d.desc}
                        </Typography>
                        <ul className="space-y-4">
                            {d.points.map((item: string, i: number) => (
                                <li key={i} className="flex items-center gap-3">
                                    <CheckCircleOutlineIcon color="success" />
                                    <Typography fontWeight="500" className="text-gray-700">
                                        {item}
                                    </Typography>
                                </li>
                            ))}
                        </ul>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box className="bg-gray-50 rounded-[2rem] p-6 sm:p-10 border border-gray-100 shadow-xl relative mt-8 sm:mt-0">
                            <div className="absolute -top-6 -right-6 bg-red-500 text-white rounded-2xl p-4 shadow-lg flex items-center gap-2 transform rotate-3">
                                <QrCodeScannerIcon /> <Typography fontWeight="bold">Scan Me</Typography>
                            </div>
                            <Box className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                                <div className="bg-red-800 text-white p-6 text-center">
                                    <Typography variant="h5" fontWeight="900">
                                        JUAN PEREZ
                                    </Typography>
                                    <Chip label="BLOOD: O+" className="mt-4 bg-red-600 text-white font-bold" />
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                                        <Typography variant="subtitle2" fontWeight="bold" color="error">
                                            CRITICAL ALLERGIES
                                        </Typography>
                                        <Typography>Penicillin, Peanuts</Typography>
                                    </div>
                                    <Button variant="contained" color="error" fullWidth className="py-3 font-bold text-lg rounded-xl">
                                        CALL WIFE: MARIA
                                    </Button>
                                </div>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
