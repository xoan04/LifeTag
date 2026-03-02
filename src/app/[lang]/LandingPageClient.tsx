'use client';

import { Box, Container, Typography, Button, Grid, Card, CardContent, Chip, useTheme, CardActions, Switch } from '@mui/material';
import ShieldIcon from '@mui/icons-material/Shield';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import PeopleIcon from '@mui/icons-material/People';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LockIcon from '@mui/icons-material/Lock';
import PetsIcon from '@mui/icons-material/Pets';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import GppGoodIcon from '@mui/icons-material/GppGood';
import Link from 'next/link';
import { useState } from 'react';

export default function LandingPageClient({ dictionary, lang }: { dictionary: any; lang: string }) {
    const theme = useTheme();
    const [isYearly, setIsYearly] = useState(false);

    return (
        <Box className="min-h-screen bg-gray-50 overflow-x-hidden font-sans">
            {/* --- NAVBAR --- */}
            <Box className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
                <Container maxWidth="lg" className="flex justify-between items-center py-3 sm:py-4">
                    <Typography component="div" fontWeight="900" color="primary" className="tracking-tighter flex items-center gap-1 sm:gap-2 text-xl sm:text-2xl">
                        <HealthAndSafetyIcon color="error" className="text-[28px] sm:text-[35px]" />
                        LifeTag
                    </Typography>
                    <Box className="flex gap-1 sm:gap-4 items-center">
                        <Button
                            variant="text"
                            color="inherit"
                            className="font-bold text-gray-500 min-w-0 px-1 sm:px-2 text-sm sm:text-base"
                            onClick={() => window.location.href = `/${lang === 'en' ? 'es' : 'en'}${window.location.pathname.replace(`/${lang}`, '')}`}
                        >
                            {lang === 'en' ? 'EN' : 'ES'}
                        </Button>
                        <Link href={`/${lang}/login`} style={{ textDecoration: 'none' }}>
                            <Button variant="text" color="inherit" className="font-semibold text-gray-600 hidden sm:flex">
                                {dictionary.landing.nav.login}
                            </Button>
                        </Link>
                        <Link href={`/${lang}/register`} style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="primary" className="rounded-full px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all whitespace-nowrap">
                                {dictionary.landing.nav.getStarted}
                            </Button>
                        </Link>
                    </Box>
                </Container>
            </Box>

            {/* --- 1) HERO SECTION --- */}
            <Box className="pt-24 pb-32 text-center relative overflow-hidden bg-white">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-50 z-0"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 z-0"></div>

                <Container maxWidth="md" className="relative z-10 flex flex-col items-center gap-6">
                    <Chip label={dictionary.landing.hero.badge} color="error" variant="outlined" size="small" className="font-bold tracking-widest uppercase mb-2 bg-red-50/50" />
                    <Typography variant="h2" component="h1" fontWeight={900} className="tracking-tight text-gray-900 leading-tight">
                        {dictionary.landing.hero.title1} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
                            {dictionary.landing.hero.title2}
                        </span>
                    </Typography>
                    <Typography variant="h6" className="text-gray-500 max-w-2xl font-normal leading-relaxed">
                        {dictionary.landing.hero.subtitle}
                    </Typography>

                    <Box className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
                        <Link href={`/${lang}/register`} style={{ textDecoration: 'none', width: '100%' }}>
                            <Button variant="contained" color="error" size="large" className="rounded-full px-10 py-4 font-bold text-lg w-full shadow-lg shadow-red-200">
                                {dictionary.landing.hero.getStarted}
                            </Button>
                        </Link>
                        <Link href={`/${lang}/demo`} style={{ textDecoration: 'none', width: '100%' }}>
                            <Button variant="outlined" color="primary" size="large" className="rounded-full px-10 py-4 font-bold text-lg w-full border-2 hover:bg-gray-50">
                                {dictionary.landing.hero.viewDemo}
                            </Button>
                        </Link>
                    </Box>
                </Container>
            </Box>

            {/* --- 2) PROBLEM SECTION --- */}
            <Box className="py-24 bg-gray-50">
                <Container maxWidth="lg">
                    <Box className="text-center mb-16">
                        <Typography variant="overline" color="error" fontWeight="bold" className="tracking-widest">{dictionary.landing.problem.overline}</Typography>
                        <Typography variant="h3" fontWeight={800} className="text-gray-900 mt-2">
                            {dictionary.landing.problem.title}
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Card className="h-full rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all bg-white overflow-hidden">
                                <Box className="h-2 bg-red-500 w-full"></Box>
                                <CardContent className="p-8 text-center flex flex-col items-center gap-4">
                                    <div className="p-4 bg-red-50 rounded-2xl text-red-500"><PhoneIphoneIcon fontSize="large" /></div>
                                    <Typography variant="h6" fontWeight="bold">{dictionary.landing.problem.cards.phones.title}</Typography>
                                    <Typography color="text.secondary">{dictionary.landing.problem.cards.phones.desc}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Card className="h-full rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all bg-white overflow-hidden">
                                <Box className="h-2 bg-orange-400 w-full"></Box>
                                <CardContent className="p-8 text-center flex flex-col items-center gap-4">
                                    <div className="p-4 bg-orange-50 rounded-2xl text-orange-500"><HealthAndSafetyIcon fontSize="large" /></div>
                                    <Typography variant="h6" fontWeight="bold">{dictionary.landing.problem.cards.allergies.title}</Typography>
                                    <Typography color="text.secondary">{dictionary.landing.problem.cards.allergies.desc}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Card className="h-full rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all bg-white overflow-hidden">
                                <Box className="h-2 bg-yellow-500 w-full"></Box>
                                <CardContent className="p-8 text-center flex flex-col items-center gap-4">
                                    <div className="p-4 bg-yellow-50 rounded-2xl text-yellow-600"><NotListedLocationIcon fontSize="large" /></div>
                                    <Typography variant="h6" fontWeight="bold">{dictionary.landing.problem.cards.pets.title}</Typography>
                                    <Typography color="text.secondary">{dictionary.landing.problem.cards.pets.desc}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* --- 3) SOLUTION SECTION --- */}
            <Box className="py-24 bg-white relative">
                <Container maxWidth="lg">
                    <Grid container spacing={8} alignItems="center">
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant="overline" color="primary" fontWeight="bold" className="tracking-widest">{dictionary.landing.solution.overline}</Typography>
                            <Typography variant="h3" fontWeight={800} className="text-gray-900 mt-2 mb-6 leading-tight">
                                {dictionary.landing.solution.title}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" className="text-lg leading-relaxed mb-6">
                                {dictionary.landing.solution.desc}
                            </Typography>
                            <ul className="space-y-4">
                                {dictionary.landing.solution.points.map((item: string, i: number) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <CheckCircleOutlineIcon color="success" />
                                        <Typography fontWeight="500" className="text-gray-700">{item}</Typography>
                                    </li>
                                ))}
                            </ul>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            {/* Mock UI Representation */}
                            <Box className="bg-gray-50 rounded-[2rem] p-6 sm:p-10 border border-gray-100 shadow-xl relative mt-8 sm:mt-0">
                                <div className="absolute -top-6 -right-6 bg-red-500 text-white rounded-2xl p-4 shadow-lg flex items-center gap-2 transform rotate-3">
                                    <QrCodeScannerIcon /> <Typography fontWeight="bold">Scan Me</Typography>
                                </div>
                                <Box className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                                    <div className="bg-red-800 text-white p-6 text-center">
                                        <Typography variant="h5" fontWeight="900">JUAN PEREZ</Typography>
                                        <Chip label="BLOOD: O+" className="mt-4 bg-red-600 text-white font-bold" />
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                                            <Typography variant="subtitle2" fontWeight="bold" color="error">CRITICAL ALLERGIES</Typography>
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

            {/* --- 4) HOW IT WORKS SECTION --- */}
            <Box className="py-24 bg-gray-900 text-white">
                <Container maxWidth="lg">
                    <Box className="text-center mb-16">
                        <Typography variant="h3" fontWeight={800} className="mb-4">{dictionary.landing.howItWorks.title}</Typography>
                        <Typography variant="h6" className="text-gray-400 font-normal">{dictionary.landing.howItWorks.subtitle}</Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {[
                            { step: '01', title: dictionary.landing.howItWorks.steps.one.title, desc: dictionary.landing.howItWorks.steps.one.desc, icon: <PeopleIcon fontSize="large" /> },
                            { step: '02', title: dictionary.landing.howItWorks.steps.two.title, desc: dictionary.landing.howItWorks.steps.two.desc, icon: <DevicesOtherIcon fontSize="large" /> },
                            { step: '03', title: dictionary.landing.howItWorks.steps.three.title, desc: dictionary.landing.howItWorks.steps.three.desc, icon: <QrCodeScannerIcon fontSize="large" /> }
                        ].map((item, i) => (
                            <Grid size={{ xs: 12, md: 4 }} key={i}>
                                <Box className="text-center relative p-8">
                                    <Typography variant="h1" fontWeight={900} className="absolute top-0 left-1/2 transform -translate-x-1/2 text-gray-800/30 -z-10 text-9xl">
                                        {item.step}
                                    </Typography>
                                    <div className="text-red-400 mb-6 flex justify-center">{item.icon}</div>
                                    <Typography variant="h5" fontWeight="bold" className="mb-3">{item.title}</Typography>
                                    <Typography className="text-gray-400 leading-relaxed">{item.desc}</Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* --- 5) FEATURES GRID --- */}
            <Box className="py-24 bg-white">
                <Container maxWidth="lg">
                    <Box className="text-center mb-16">
                        <Typography variant="h3" fontWeight={800} className="text-gray-900 mb-4">{dictionary.landing.features.title}</Typography>
                        <Typography variant="h6" color="text.secondary" className="font-normal max-w-2xl mx-auto">
                            {dictionary.landing.features.subtitle}
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {[
                            { title: dictionary.landing.features.list.devices.title, desc: dictionary.landing.features.list.devices.desc, icon: <DevicesOtherIcon /> },
                            { title: dictionary.landing.features.list.control.title, desc: dictionary.landing.features.list.control.desc, icon: <LockIcon /> },
                            { title: dictionary.landing.features.list.notifications.title, desc: dictionary.landing.features.list.notifications.desc, icon: <NotificationsActiveIcon /> },
                            { title: dictionary.landing.features.list.pets.title, desc: dictionary.landing.features.list.pets.desc, icon: <PetsIcon /> },
                            { title: dictionary.landing.features.list.realtime.title, desc: dictionary.landing.features.list.realtime.desc, icon: <CloudDoneIcon /> },
                            { title: dictionary.landing.features.list.noApp.title, desc: dictionary.landing.features.list.noApp.desc, icon: <QrCodeScannerIcon /> },
                        ].map((feat, i) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                                <Box className="p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-xl transition-all h-full">
                                    <div className="p-3 bg-white w-fit rounded-xl shadow-sm text-primary border border-gray-100 mb-4">
                                        {feat.icon}
                                    </div>
                                    <Typography variant="h6" fontWeight="bold" className="mb-2 text-gray-900">{feat.title}</Typography>
                                    <Typography variant="body2" color="text.secondary" className="leading-relaxed">{feat.desc}</Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* --- 6) PRICING SECTION --- */}
            <Box className="py-24 bg-gray-50 border-t border-gray-100" id="pricing">
                <Container maxWidth="lg">
                    <Box className="text-center mb-12">
                        <Typography variant="h3" fontWeight={800} className="text-gray-900 mb-4">{dictionary.landing.pricing.title}</Typography>
                        <Typography variant="h6" color="text.secondary" className="font-normal mb-8">
                            {dictionary.landing.pricing.subtitle}
                        </Typography>

                        <div className="flex items-center justify-center gap-3">
                            <Typography className={`font-bold ${!isYearly ? 'text-gray-900' : 'text-gray-400'}`}>{dictionary.landing.pricing.monthly}</Typography>
                            <Switch checked={isYearly} onChange={(e: any) => setIsYearly(e.target.checked)} color="primary" />
                            <Typography className={`font-bold flex items-center gap-2 ${isYearly ? 'text-gray-900' : 'text-gray-400'}`}>
                                {dictionary.landing.pricing.yearly} <Chip label={dictionary.landing.pricing.save} color="success" size="small" className="font-bold bg-green-100 text-green-700" />
                            </Typography>
                        </div>
                    </Box>

                    <Grid container spacing={4} alignItems="center" justifyContent="center">
                        {/* Essential Plan */}
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Card className="rounded-3xl border border-gray-200 shadow-sm p-2">
                                <CardContent className="p-6">
                                    <Typography variant="h5" fontWeight="bold" className="mb-2">{dictionary.landing.pricing.plans.essential.name}</Typography>
                                    <Typography color="text.secondary" className="mb-6 h-12">{dictionary.landing.pricing.plans.essential.desc}</Typography>
                                    <div className="mb-6">
                                        <Typography variant="h3" fontWeight={900} display="inline">${isYearly ? '4' : '5'}</Typography>
                                        <Typography color="text.secondary" display="inline">/mo</Typography>
                                    </div>
                                    <ul className="space-y-3 mb-8">
                                        {dictionary.landing.pricing.plans.essential.features.map((feature: string, i: number) => (
                                            <li key={i} className="flex gap-2 items-start">
                                                <CheckCircleOutlineIcon color="primary" fontSize="small" className="mt-1" />
                                                <Typography variant="body2" className="text-gray-700 font-medium">{feature}</Typography>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button variant="outlined" fullWidth size="large" className="rounded-xl font-bold py-3">{dictionary.landing.pricing.plans.essential.cta}</Button>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Family Plan */}
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Card className="rounded-3xl border-2 border-primary shadow-xl p-2 relative transform md:-translate-y-4">
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase">
                                    {dictionary.landing.pricing.plans.family.badge}
                                </div>
                                <CardContent className="p-6">
                                    <Typography variant="h5" fontWeight="bold" color="primary" className="mb-2">{dictionary.landing.pricing.plans.family.name}</Typography>
                                    <Typography color="text.secondary" className="mb-6 h-12">{dictionary.landing.pricing.plans.family.desc}</Typography>
                                    <div className="mb-6">
                                        <Typography variant="h3" fontWeight={900} display="inline">${isYearly ? '12' : '15'}</Typography>
                                        <Typography color="text.secondary" display="inline">/mo</Typography>
                                    </div>
                                    <ul className="space-y-3 mb-8">
                                        {dictionary.landing.pricing.plans.family.features.map((feature: string, i: number) => (
                                            <li key={i} className="flex gap-2 items-start">
                                                <CheckCircleOutlineIcon color="primary" fontSize="small" className="mt-1" />
                                                <Typography variant="body2" className="text-gray-900 font-bold">{feature}</Typography>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button variant="contained" color="primary" fullWidth size="large" className="rounded-xl font-bold py-3 shadow-lg hover:shadow-xl">{dictionary.landing.pricing.plans.family.cta}</Button>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Pro Plan */}
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Card className="rounded-3xl border border-gray-200 shadow-sm p-2">
                                <CardContent className="p-6">
                                    <Typography variant="h5" fontWeight="bold" className="mb-2">{dictionary.landing.pricing.plans.pro.name}</Typography>
                                    <Typography color="text.secondary" className="mb-6 h-12">{dictionary.landing.pricing.plans.pro.desc}</Typography>
                                    <div className="mb-6">
                                        <Typography variant="h3" fontWeight={900} display="inline">${isYearly ? '24' : '30'}</Typography>
                                        <Typography color="text.secondary" display="inline">/mo</Typography>
                                    </div>
                                    <ul className="space-y-3 mb-8">
                                        {dictionary.landing.pricing.plans.pro.features.map((feature: string, i: number) => (
                                            <li key={i} className="flex gap-2 items-start">
                                                <CheckCircleOutlineIcon color="primary" fontSize="small" className="mt-1" />
                                                <Typography variant="body2" className="text-gray-700 font-medium">{feature}</Typography>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button variant="outlined" fullWidth size="large" className="rounded-xl font-bold py-3">{dictionary.landing.pricing.plans.pro.cta}</Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* --- 7) TRUST & SECURITY --- */}
            <Box className="py-16 bg-white border-t border-gray-100">
                <Container maxWidth="lg">
                    <Grid container spacing={4} justifyContent="center">
                        <Grid size={{ xs: 12, sm: 4 }} className="text-center">
                            <ShieldIcon color="primary" sx={{ fontSize: 50 }} className="mb-4 opacity-80" />
                            <Typography variant="h6" fontWeight="bold">{dictionary.landing.trust.tokens.title}</Typography>
                            <Typography variant="body2" color="text.secondary">{dictionary.landing.trust.tokens.desc}</Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }} className="text-center">
                            <GppGoodIcon color="primary" sx={{ fontSize: 50 }} className="mb-4 opacity-80" />
                            <Typography variant="h6" fontWeight="bold">{dictionary.landing.trust.privacy.title}</Typography>
                            <Typography variant="body2" color="text.secondary">{dictionary.landing.trust.privacy.desc}</Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }} className="text-center">
                            <CloudDoneIcon color="primary" sx={{ fontSize: 50 }} className="mb-4 opacity-80" />
                            <Typography variant="h6" fontWeight="bold">{dictionary.landing.trust.cloud.title}</Typography>
                            <Typography variant="body2" color="text.secondary">{dictionary.landing.trust.cloud.desc}</Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* --- 8) FINAL CTA --- */}
            <Box className="py-24 bg-red-900 text-center relative overflow-hidden">
                <div className="absolute top-[-50%] left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-red-800 rounded-full blur-3xl opacity-50 z-0"></div>
                <Container maxWidth="md" className="relative z-10 flex flex-col items-center">
                    <Typography variant="h2" fontWeight={900} className="text-white mb-6 tracking-tight">
                        {dictionary.landing.cta.title}
                    </Typography>
                    <Typography variant="h6" className="text-red-100 font-normal mb-10 max-w-2xl">
                        {dictionary.landing.cta.desc}
                    </Typography>
                    <Link href={`/${lang}/register`} style={{ textDecoration: 'none' }}>
                        <Button variant="contained" size="large" className="bg-white text-red-900 hover:bg-gray-100 rounded-full px-12 py-4 font-bold text-lg shadow-2xl">
                            {dictionary.landing.cta.button}
                        </Button>
                    </Link>
                </Container>
            </Box>

            {/* --- 9) FOOTER --- */}
            <Box className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
                <Container maxWidth="lg">
                    <Grid container spacing={8} className="mb-8">
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Typography variant="h5" fontWeight="900" className="text-white flex items-center gap-2 mb-4">
                                <HealthAndSafetyIcon color="error" />
                                LifeTag
                            </Typography>
                            <Typography variant="body2" className="leading-relaxed">
                                {dictionary.landing.footer.desc}
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 6, md: 2 }}>
                            <Typography className="text-white font-bold mb-4 uppercase text-sm tracking-wider">{dictionary.landing.footer.product}</Typography>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">{dictionary.landing.footer.productLinks.features}</a></li>
                                <li><a href="#pricing" className="hover:text-white transition-colors">{dictionary.landing.footer.productLinks.pricing}</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">{dictionary.landing.footer.productLinks.pets}</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">{dictionary.landing.footer.productLinks.devices}</a></li>
                            </ul>
                        </Grid>
                        <Grid size={{ xs: 6, md: 2 }}>
                            <Typography className="text-white font-bold mb-4 uppercase text-sm tracking-wider">{dictionary.landing.footer.company}</Typography>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">{dictionary.landing.footer.companyLinks.about}</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">{dictionary.landing.footer.companyLinks.blog}</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">{dictionary.landing.footer.companyLinks.contact}</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">{dictionary.landing.footer.companyLinks.partners}</a></li>
                            </ul>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Typography className="text-white font-bold mb-4 uppercase text-sm tracking-wider">{dictionary.landing.footer.subscribe.title}</Typography>
                            <Box className="flex gap-2">
                                <input type="email" placeholder={dictionary.landing.footer.subscribe.placeholder} className="bg-gray-800 w-full px-4 py-2 rounded-lg border border-gray-700 outline-none text-white focus:border-red-500 transition-colors" />
                                <Button variant="contained" color="error" className="rounded-lg px-6 font-bold shadow-none">{dictionary.landing.footer.subscribe.button}</Button>
                            </Box>
                        </Grid>
                    </Grid>
                    <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
                        <Typography variant="body2">{dictionary.landing.footer.rights}</Typography>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-white transition-colors">{dictionary.landing.footer.legal.privacy}</a>
                            <a href="#" className="hover:text-white transition-colors">{dictionary.landing.footer.legal.terms}</a>
                            <a href="#" className="hover:text-white transition-colors">{dictionary.landing.footer.legal.cookies}</a>
                        </div>
                    </div>
                </Container>
            </Box>
        </Box>
    );
}
