'use client';

import { Box, Container, Typography, Grid } from '@mui/material';
import ShieldIcon from '@mui/icons-material/Shield';
import GppGoodIcon from '@mui/icons-material/GppGood';
import CloudDoneIcon from '@mui/icons-material/CloudDone';

export function LandingTrust({ dictionary }: { dictionary: any }) {
    const d = dictionary.landing.trust;
    return (
        <Box className="py-16 bg-white border-t border-gray-100">
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="center">
                    <Grid size={{ xs: 12, sm: 4 }} className="text-center">
                        <ShieldIcon color="primary" sx={{ fontSize: 50 }} className="mb-4 opacity-80" />
                        <Typography variant="h6" fontWeight="bold">
                            {d.tokens.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {d.tokens.desc}
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }} className="text-center">
                        <GppGoodIcon color="primary" sx={{ fontSize: 50 }} className="mb-4 opacity-80" />
                        <Typography variant="h6" fontWeight="bold">
                            {d.privacy.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {d.privacy.desc}
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }} className="text-center">
                        <CloudDoneIcon color="primary" sx={{ fontSize: 50 }} className="mb-4 opacity-80" />
                        <Typography variant="h6" fontWeight="bold">
                            {d.cloud.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {d.cloud.desc}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
