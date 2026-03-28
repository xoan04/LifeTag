'use client';

import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';

export function LandingProblem({ dictionary }: { dictionary: any }) {
    const d = dictionary.landing.problem;
    return (
        <Box className="py-24 bg-gray-50">
            <Container maxWidth="lg">
                <Box className="text-center mb-16">
                    <Typography variant="overline" color="error" fontWeight="bold" className="tracking-widest">
                        {d.overline}
                    </Typography>
                    <Typography variant="h3" fontWeight={800} className="text-gray-900 mt-2">
                        {d.title}
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Card className="h-full rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all bg-white overflow-hidden">
                            <Box className="h-2 bg-red-500 w-full" />
                            <CardContent className="p-8 text-center flex flex-col items-center gap-4">
                                <div className="p-4 bg-red-50 rounded-2xl text-red-500">
                                    <PhoneIphoneIcon fontSize="large" />
                                </div>
                                <Typography variant="h6" fontWeight="bold">
                                    {d.cards.phones.title}
                                </Typography>
                                <Typography color="text.secondary">{d.cards.phones.desc}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Card className="h-full rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all bg-white overflow-hidden">
                            <Box className="h-2 bg-orange-400 w-full" />
                            <CardContent className="p-8 text-center flex flex-col items-center gap-4">
                                <div className="p-4 bg-orange-50 rounded-2xl text-orange-500">
                                    <HealthAndSafetyIcon fontSize="large" />
                                </div>
                                <Typography variant="h6" fontWeight="bold">
                                    {d.cards.allergies.title}
                                </Typography>
                                <Typography color="text.secondary">{d.cards.allergies.desc}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Card className="h-full rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all bg-white overflow-hidden">
                            <Box className="h-2 bg-yellow-500 w-full" />
                            <CardContent className="p-8 text-center flex flex-col items-center gap-4">
                                <div className="p-4 bg-yellow-50 rounded-2xl text-yellow-600">
                                    <NotListedLocationIcon fontSize="large" />
                                </div>
                                <Typography variant="h6" fontWeight="bold">
                                    {d.cards.pets.title}
                                </Typography>
                                <Typography color="text.secondary">{d.cards.pets.desc}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
