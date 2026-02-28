'use client';
import {
    Box, Typography, Button, Container, Chip, Accordion,
    AccordionSummary, AccordionDetails, Paper, Alert
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PetsIcon from '@mui/icons-material/Pets';
import { mockProfiles, mockDevices } from '@/data/mockData';

export default function PublicEmergencyClient({ dictionary, lang, params }: { dictionary: any; lang: string; params: { publicId: string } }) {
    const device = mockDevices.find(d => d.deviceToken === params.publicId);
    const profile = device ? mockProfiles.find(p => p.id === device.profileId) : undefined;

    if (!device || !profile) {
        return (
            <Box className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
                <Paper className="p-8 text-center max-w-sm w-full">
                    <LocalHospitalIcon color="error" sx={{ fontSize: 64, mb: 2 }} />
                    <Typography variant="h5" fontWeight="bold" gutterBottom>{dictionary.emergency.notFound.title}</Typography>
                    <Typography color="text.secondary">
                        {dictionary.emergency.notFound.desc}
                    </Typography>
                </Paper>
            </Box>
        );
    }

    if (!profile.isActive || device.status !== 'active') {
        return (
            <Box className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
                <Paper className="p-8 text-center max-w-sm w-full border-t-8 border-gray-400">
                    <Typography variant="h5" fontWeight="bold" gutterBottom>{dictionary.emergency.inactive.title}</Typography>
                    <Typography color="text.secondary">
                        {device.status === 'lost'
                            ? dictionary.emergency.inactive.lost
                            : dictionary.emergency.inactive.disabled}
                    </Typography>
                </Paper>
            </Box>
        );
    }

    const isHuman = profile.type === 'HUMAN';

    return (
        <Box className="min-h-screen bg-gray-50 pb-24">
            {/* Top Section */}
            <Box className="bg-red-800 text-white rounded-b-3xl pt-12 pb-8 px-4 text-center shadow-lg relative">
                <Box className="absolute top-4 left-4 bg-white/20 p-2 rounded-full">
                    {isHuman ? <LocalHospitalIcon /> : <PetsIcon />}
                </Box>
                <Button
                    onClick={() => window.location.href = `/${lang === 'en' ? 'es' : 'en'}${window.location.pathname.replace(`/${lang}`, '')}`}
                    className="absolute top-6 right-4 bg-white/20 hover:bg-white/30 text-white font-bold px-3 py-1 rounded-full min-w-0"
                >
                    {lang === 'en' ? 'ES' : 'EN'}
                </Button>
                <Typography variant="h3" fontWeight={800} className="mb-2 tracking-tight">
                    {profile.name.toUpperCase()}
                </Typography>

                {isHuman && (
                    <Box className="flex justify-center mt-4">
                        <Chip
                            icon={<LocalHospitalIcon style={{ color: 'white' }} />}
                            label={`${dictionary.emergency.blood}: ${profile.bloodType}`}
                            className="bg-red-600 text-white font-bold text-lg p-6 rounded-2xl border-2 border-white/20 shadow-inner"
                        />
                    </Box>
                )}
            </Box>

            <Container maxWidth="sm" className="mt-[-20px] px-4 space-y-4 relative z-10">

                {/* Alerts Section */}
                {isHuman && profile.allergies && profile.allergies.length > 0 && (
                    <Alert severity="error" icon={<WarningAmberIcon fontSize="inherit" />} className="rounded-xl border border-red-200">
                        <Typography variant="subtitle1" fontWeight={700}>{dictionary.emergency.allergies}:</Typography>
                        <Typography variant="body1">{profile.allergies.join(', ')}</Typography>
                    </Alert>
                )}

                {/* Immediate Action Buttons */}
                <Paper className="p-4 rounded-2xl shadow-sm border border-gray-100 space-y-3">
                    <Typography variant="subtitle2" color="text.secondary" className="uppercase font-bold tracking-wider mb-2">
                        {dictionary.emergency.contactsTitle}
                    </Typography>

                    {isHuman ? (
                        <>
                            <Button
                                variant="contained"
                                color="error" // using standard MUI color 'error', 'success', 'warning', 'info' natively supported
                                size="large"
                                fullWidth
                                startIcon={<PhoneIcon />}
                                href={`tel:${profile.emergencyContact1.phone}`}
                                className="py-4 text-lg font-bold"
                            >
                                {dictionary.emergency.call} {profile.emergencyContact1.relation.toUpperCase()}: {profile.emergencyContact1.name}
                            </Button>
                            {profile.emergencyContact2 && (
                                <Button
                                    variant="outlined"
                                    color="error" // standard MUI color
                                    size="large" fullWidth
                                    startIcon={<PhoneIcon />}
                                    href={`tel:${profile.emergencyContact2.phone}`}
                                    className="py-3 font-semibold"
                                >
                                    {dictionary.emergency.call} {profile.emergencyContact2.relation.toUpperCase()}
                                </Button>
                            )}
                        </>
                    ) : (
                        <>
                            <Button
                                variant="contained" color="error" size="large" fullWidth
                                startIcon={<PhoneIcon />} href={`tel:${profile.ownerPhone}`}
                                className="py-4 text-lg font-bold"
                            >
                                {dictionary.emergency.callOwner}
                            </Button>
                            <Button
                                variant="outlined" color="success" size="large" fullWidth
                                startIcon={<WhatsAppIcon />} href={`https://wa.me/${profile.ownerPhone.replace(/\D/g, '')}`}
                                className="py-3 font-semibold"
                            >
                                {dictionary.emergency.whatsappOwner}
                            </Button>
                        </>
                    )}
                </Paper>

                {/* Details Accordions */}
                <Box className="space-y-2 pt-4">
                    {isHuman ? (
                        <>
                            <Accordion className="rounded-2xl before:hidden shadow-sm border border-gray-100">
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="h6" fontWeight={700}>{dictionary.emergency.human.conditionsTitle}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {profile.medicalConditions.map((cond, i) => (
                                            <li key={i}><Typography variant="body1">{cond}</Typography></li>
                                        ))}
                                    </ul>
                                    {profile.medicalConditions.length === 0 && <Typography color="text.secondary">{dictionary.emergency.human.none}</Typography>}
                                </AccordionDetails>
                            </Accordion>

                            <Accordion className="rounded-2xl before:hidden shadow-sm border border-gray-100">
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="h6" fontWeight={700}>{dictionary.emergency.human.medicationsTitle}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {profile.medications.map((med, i) => (
                                            <li key={i}><Typography variant="body1">{med}</Typography></li>
                                        ))}
                                    </ul>
                                    {profile.medications.length === 0 && <Typography color="text.secondary">{dictionary.emergency.human.none}</Typography>}
                                </AccordionDetails>
                            </Accordion>
                        </>
                    ) : (
                        <>
                            <Accordion className="rounded-2xl before:hidden shadow-sm border border-gray-100">
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="h6" fontWeight={700}>{dictionary.emergency.pet.detailsTitle}</Typography>
                                </AccordionSummary>
                                <AccordionDetails className="space-y-3">
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" className="uppercase font-bold">{dictionary.emergency.pet.breedSpecies}</Typography>
                                        <Typography variant="body1">{profile.breed} ({profile.species})</Typography>
                                    </Box>
                                    {profile.reward && (
                                        <Alert severity="success" className="mt-2">
                                            <Typography variant="subtitle2" fontWeight={700}>{dictionary.emergency.pet.reward}:</Typography>
                                            <Typography variant="body2">{profile.reward}</Typography>
                                        </Alert>
                                    )}
                                </AccordionDetails>
                            </Accordion>

                            <Accordion className="rounded-2xl before:hidden shadow-sm border border-gray-100">
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="h6" fontWeight={700}>{dictionary.emergency.pet.vetTitle}</Typography>
                                </AccordionSummary>
                                <AccordionDetails className="space-y-3">
                                    <Typography variant="body1" fontWeight={600}>{profile.veterinarian.name}</Typography>
                                    <Button startIcon={<PhoneIcon />} href={`tel:${profile.veterinarian.phone}`} variant="text">
                                        {profile.veterinarian.phone}
                                    </Button>
                                    <Box className="mt-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200">
                                        <Typography variant="caption" fontWeight="bold">{dictionary.emergency.pet.vaccination}:</Typography>
                                        <p>{profile.vaccinationStatus}</p>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </>
                    )}
                </Box>
            </Container>
        </Box>
    );
}
