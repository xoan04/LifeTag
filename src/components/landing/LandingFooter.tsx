'use client';

import { Box, Container, Typography, Grid, Button } from '@mui/material';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

export function LandingFooter({ dictionary }: { dictionary: any }) {
    const d = dictionary.landing.footer;
    return (
        <Box className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
            <Container maxWidth="lg">
                <Grid container spacing={8} className="mb-8">
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h5" fontWeight="900" className="text-white flex items-center gap-2 mb-4">
                            <HealthAndSafetyIcon color="error" />
                            LifeTag
                        </Typography>
                        <Typography variant="body2" className="leading-relaxed">
                            {d.desc}
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, md: 2 }}>
                        <Typography className="text-white font-bold mb-4 uppercase text-sm tracking-wider">{d.product}</Typography>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    {d.productLinks.features}
                                </a>
                            </li>
                            <li>
                                <a href="#pricing" className="hover:text-white transition-colors">
                                    {d.productLinks.pricing}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    {d.productLinks.pets}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    {d.productLinks.devices}
                                </a>
                            </li>
                        </ul>
                    </Grid>
                    <Grid size={{ xs: 6, md: 2 }}>
                        <Typography className="text-white font-bold mb-4 uppercase text-sm tracking-wider">{d.company}</Typography>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    {d.companyLinks.about}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    {d.companyLinks.blog}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    {d.companyLinks.contact}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    {d.companyLinks.partners}
                                </a>
                            </li>
                        </ul>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography className="text-white font-bold mb-4 uppercase text-sm tracking-wider">{d.subscribe.title}</Typography>
                        <Box className="flex gap-2">
                            <input
                                type="email"
                                placeholder={d.subscribe.placeholder}
                                className="bg-gray-800 w-full px-4 py-2 rounded-lg border border-gray-700 outline-none text-white focus:border-red-500 transition-colors"
                            />
                            <Button variant="contained" color="error" className="rounded-lg px-6 font-bold shadow-none">
                                {d.subscribe.button}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
                    <Typography variant="body2">{d.rights}</Typography>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">
                            {d.legal.privacy}
                        </a>
                        <a href="#" className="hover:text-white transition-colors">
                            {d.legal.terms}
                        </a>
                        <a href="#" className="hover:text-white transition-colors">
                            {d.legal.cookies}
                        </a>
                    </div>
                </div>
            </Container>
        </Box>
    );
}
