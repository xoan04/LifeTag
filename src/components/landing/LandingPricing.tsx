'use client';

import { useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Chip, Switch, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export function LandingPricing({ dictionary }: { dictionary: any }) {
    const d = dictionary.landing.pricing;
    const [isYearly, setIsYearly] = useState(false);

    return (
        <Box className="py-24 bg-gray-50 border-t border-gray-100" id="pricing">
            <Container maxWidth="lg">
                <Box className="text-center mb-12">
                    <Typography variant="h3" fontWeight={800} className="text-gray-900 mb-4">
                        {d.title}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" className="font-normal mb-8">
                        {d.subtitle}
                    </Typography>

                    <div className="flex items-center justify-center gap-3">
                        <Typography className={`font-bold ${!isYearly ? 'text-gray-900' : 'text-gray-400'}`}>
                            {d.monthly}
                        </Typography>
                        <Switch checked={isYearly} onChange={(e) => setIsYearly(e.target.checked)} color="primary" />
                        <Typography
                            className={`font-bold flex items-center gap-2 ${isYearly ? 'text-gray-900' : 'text-gray-400'}`}
                        >
                            {d.yearly}{' '}
                            <Chip label={d.save} color="success" size="small" className="font-bold bg-green-100 text-green-700" />
                        </Typography>
                    </div>
                </Box>

                <Grid container spacing={4} alignItems="center" justifyContent="center">
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Card className="rounded-3xl border border-gray-200 shadow-sm p-2">
                            <CardContent className="p-6">
                                <Typography variant="h5" fontWeight="bold" className="mb-2">
                                    {d.plans.essential.name}
                                </Typography>
                                <Typography color="text.secondary" className="mb-6 h-12">
                                    {d.plans.essential.desc}
                                </Typography>
                                <div className="mb-6">
                                    <Typography variant="h3" fontWeight={900} display="inline">
                                        ${isYearly ? '4' : '5'}
                                    </Typography>
                                    <Typography color="text.secondary" display="inline">
                                        /mo
                                    </Typography>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {d.plans.essential.features.map((feature: string, i: number) => (
                                        <li key={i} className="flex gap-2 items-start">
                                            <CheckCircleOutlineIcon color="primary" fontSize="small" className="mt-1" />
                                            <Typography variant="body2" className="text-gray-700 font-medium">
                                                {feature}
                                            </Typography>
                                        </li>
                                    ))}
                                </ul>
                                <Button variant="outlined" fullWidth size="large" className="rounded-xl font-bold py-3">
                                    {d.plans.essential.cta}
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Card className="rounded-3xl border-2 border-primary shadow-xl p-2 relative transform md:-translate-y-4">
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase">
                                {d.plans.family.badge}
                            </div>
                            <CardContent className="p-6">
                                <Typography variant="h5" fontWeight="bold" color="primary" className="mb-2">
                                    {d.plans.family.name}
                                </Typography>
                                <Typography color="text.secondary" className="mb-6 h-12">
                                    {d.plans.family.desc}
                                </Typography>
                                <div className="mb-6">
                                    <Typography variant="h3" fontWeight={900} display="inline">
                                        ${isYearly ? '12' : '15'}
                                    </Typography>
                                    <Typography color="text.secondary" display="inline">
                                        /mo
                                    </Typography>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {d.plans.family.features.map((feature: string, i: number) => (
                                        <li key={i} className="flex gap-2 items-start">
                                            <CheckCircleOutlineIcon color="primary" fontSize="small" className="mt-1" />
                                            <Typography variant="body2" className="text-gray-900 font-bold">
                                                {feature}
                                            </Typography>
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    size="large"
                                    className="rounded-xl font-bold py-3 shadow-lg hover:shadow-xl"
                                >
                                    {d.plans.family.cta}
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Card className="rounded-3xl border border-gray-200 shadow-sm p-2">
                            <CardContent className="p-6">
                                <Typography variant="h5" fontWeight="bold" className="mb-2">
                                    {d.plans.pro.name}
                                </Typography>
                                <Typography color="text.secondary" className="mb-6 h-12">
                                    {d.plans.pro.desc}
                                </Typography>
                                <div className="mb-6">
                                    <Typography variant="h3" fontWeight={900} display="inline">
                                        ${isYearly ? '24' : '30'}
                                    </Typography>
                                    <Typography color="text.secondary" display="inline">
                                        /mo
                                    </Typography>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {d.plans.pro.features.map((feature: string, i: number) => (
                                        <li key={i} className="flex gap-2 items-start">
                                            <CheckCircleOutlineIcon color="primary" fontSize="small" className="mt-1" />
                                            <Typography variant="body2" className="text-gray-700 font-medium">
                                                {feature}
                                            </Typography>
                                        </li>
                                    ))}
                                </ul>
                                <Button variant="outlined" fullWidth size="large" className="rounded-xl font-bold py-3">
                                    {d.plans.pro.cta}
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
