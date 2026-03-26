'use client';

import {
    Box,
    Typography,
    Button,
    Paper,
    Container,
    Chip,
    Alert,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import PhoneIcon from '@mui/icons-material/Phone';

export default function DemoPageClient({
    dictionary,
    lang,
}: {
    dictionary: any;
    lang: string;
}) {
    // Demo con datos fijos (no depende de endpoint).
    const demo = {
        name: 'Juan Perez',
        bloodType: 'O+',
        allergies: ['Penicillin', 'Peanuts'],
        medicalConditions: ['Hypertension'],
        medications: ['Lisinopril 10mg'],
        emergencyContact1: { name: 'Maria Perez', phone: '+1234567890', relation: 'Wife' },
        emergencyContact2: { phone: '+1987654321', relation: 'Brother' },
    };

    return (
        <Box className="min-h-screen bg-gray-50">
            {/* Banner demo */}
            <Paper
                elevation={0}
                className="sticky top-0 z-50 border-b border-gray-200 rounded-none bg-amber-50/95 backdrop-blur-sm"
            >
                <Box className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 max-w-lg mx-auto">
                    <Box className="text-center sm:text-left">
                        <Typography variant="subtitle1" fontWeight={700} color="text.primary">
                            {dictionary.demo.banner}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {dictionary.demo.bannerDesc}
                        </Typography>
                    </Box>
                    <Link href={`/${lang}`} style={{ textDecoration: 'none', flexShrink: 0 }}>
                        <Button
                            variant="outlined"
                            size="small"
                            startIcon={<ArrowBackIcon />}
                            className="rounded-full font-bold"
                        >
                            {dictionary.demo.backHome}
                        </Button>
                    </Link>
                </Box>
            </Paper>

            <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', pb: '96px' }}>
                <Box
                    sx={{
                        bgcolor: '#7f1d1d',
                        color: 'white',
                        borderRadius: '0 0 24px 24px',
                        pt: 6,
                        pb: 4,
                        px: 2,
                        textAlign: 'center',
                        boxShadow: 3,
                    }}
                >
                    <Typography variant="h3" fontWeight={800}>
                        {demo.name.toUpperCase()}
                    </Typography>
                    <Box display="flex" justifyContent="center" mt={2}>
                        <Chip
                            icon={<LocalHospitalIcon style={{ color: 'white' }} />}
                            label={`${dictionary.emergency.blood}: ${demo.bloodType}`}
                            sx={{
                                bgcolor: '#991b1b',
                                color: 'white',
                                fontWeight: 700,
                                border: '2px solid rgba(255,255,255,0.2)',
                            }}
                        />
                    </Box>
                </Box>

                <Container maxWidth="sm" sx={{ mt: '-20px', px: 2, position: 'relative', zIndex: 10 }}>
                    <Alert severity="error" icon={<WarningAmberIcon fontSize="inherit" />} sx={{ borderRadius: 3, mb: 2 }}>
                        <Typography variant="subtitle1" fontWeight={700}>{dictionary.emergency.allergies}:</Typography>
                        <Typography variant="body1">{demo.allergies.join(', ')}</Typography>
                    </Alert>

                    <Paper sx={{ p: 2, borderRadius: 4, mb: 2, border: '1px solid', borderColor: 'grey.200' }}>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700, mb: 2 }}>
                            {dictionary.emergency.contactsTitle}
                        </Typography>
                        <Box display="flex" flexDirection="column" gap={1.5}>
                            <Button
                                variant="contained"
                                color="error"
                                size="large"
                                fullWidth
                                startIcon={<PhoneIcon />}
                                href={`tel:${demo.emergencyContact1.phone}`}
                                sx={{ py: 2, fontWeight: 700 }}
                            >
                                {dictionary.emergency.call} {demo.emergencyContact1.relation.toUpperCase()}: {demo.emergencyContact1.name}
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                size="large"
                                fullWidth
                                startIcon={<PhoneIcon />}
                                href={`tel:${demo.emergencyContact2.phone}`}
                                sx={{ py: 1.5, fontWeight: 600 }}
                            >
                                {dictionary.emergency.call} {demo.emergencyContact2.relation.toUpperCase()}
                            </Button>
                        </Box>
                    </Paper>

                    <Accordion sx={{ borderRadius: '16px !important', mb: 1 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6" fontWeight={700}>{dictionary.emergency.human.conditionsTitle}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul style={{ paddingLeft: 20, margin: 0 }}>
                                {demo.medicalConditions.map((c, i) => <li key={i}><Typography>{c}</Typography></li>)}
                            </ul>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion sx={{ borderRadius: '16px !important' }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6" fontWeight={700}>{dictionary.emergency.human.medicationsTitle}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul style={{ paddingLeft: 20, margin: 0 }}>
                                {demo.medications.map((m, i) => <li key={i}><Typography>{m}</Typography></li>)}
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                </Container>
            </Box>
        </Box>
    );
}
