'use client';
import { useState, useEffect } from 'react';
import {
    Box, Typography, Button, Container, Chip, Accordion,
    AccordionSummary, AccordionDetails, Paper, Alert, CircularProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PetsIcon from '@mui/icons-material/Pets';

import { EmergencyUseCases } from '@/useCases/emergencyUseCases';
import { EmergencyProfile } from '@/models/emergencyProfile';

export default function PublicEmergencyClient({
    dictionary,
    lang,
    params,
}: {
    dictionary: any;
    lang: string;
    params: { publicId: string };
}) {
    const d = dictionary.emergency;
    const [profile, setProfile] = useState<EmergencyProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<'not_found' | 'inactive' | 'generic' | null>(null);

    useEffect(() => {
        // Captura geolocalización del escaneador si el browser lo permite (best-effort)
        const fetchProfile = (lat?: number, lng?: number) => {
            EmergencyUseCases.getEmergencyProfile({
                publicId: params.publicId, // Se envía a la URL del backend
                lat,
                lng,
            })
                .then(data => {
                    if (!data.isActive) {
                        setError('inactive');
                    } else {
                        setProfile(data);
                    }
                })
                .catch(err => {
                    const msg = (err?.message ?? '').toLowerCase();
                    if (msg.includes('404') || msg.includes('not found')) {
                        setError('not_found');
                    } else if (msg.includes('inactive') || msg.includes('disabled')) {
                        setError('inactive');
                    } else {
                        setError('generic');
                    }
                })
                .finally(() => setLoading(false));
        };

        if (typeof navigator !== 'undefined' && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                pos => fetchProfile(pos.coords.latitude, pos.coords.longitude),
                () => fetchProfile(), // si rechaza permisos, igual carga sin coords
                { timeout: 4000 }
            );
        } else {
            fetchProfile();
        }
    }, [params.publicId]);

    // ─── Estados de carga / error ────────────────────────────────────────────

    if (loading) {
        return (
            <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center">
                <CircularProgress color="error" size={48} />
            </Box>
        );
    }

    if (error === 'not_found' || error === 'generic') {
        return (
            <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" p={4} bgcolor="grey.100">
                <Paper sx={{ p: 4, textAlign: 'center', maxWidth: 360, width: '100%' }}>
                    <LocalHospitalIcon color="error" sx={{ fontSize: 64, mb: 2 }} />
                    <Typography variant="h5" fontWeight="bold" gutterBottom>{d.notFound.title}</Typography>
                    <Typography color="text.secondary">{d.notFound.desc}</Typography>
                </Paper>
            </Box>
        );
    }

    if (error === 'inactive' || (profile && !profile.isActive)) {
        return (
            <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" p={4} bgcolor="grey.100">
                <Paper sx={{ p: 4, textAlign: 'center', maxWidth: 360, width: '100%', borderTop: '8px solid grey' }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>{d.inactive.title}</Typography>
                    <Typography color="text.secondary">{d.inactive.disabled}</Typography>
                </Paper>
            </Box>
        );
    }

    if (!profile) return null;

    const isHuman = profile.type === 'HUMAN';

    // Helpers de acceso a campos planos del backend
    const ec1Phone = profile.emergencyContact1_phone;
    const ec1Name = profile.emergencyContact1_name;
    const ec1Relation = profile.emergencyContact1_relation;
    const ec2Phone = profile.emergencyContact2_phone;
    const ec2Relation = profile.emergencyContact2_relation;

    const langToggle = () => {
        window.location.href = `/${lang === 'en' ? 'es' : 'en'}${window.location.pathname.replace(`/${lang}`, '')}`;
    };

    // ─── Vista principal ──────────────────────────────────────────────────────

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', pb: '96px' }}>

            {/* ── Header rojo ── */}
            <Box sx={{
                bgcolor: '#7f1d1d', color: 'white', borderRadius: '0 0 24px 24px',
                pt: 6, pb: 4, px: 2, textAlign: 'center', position: 'relative', boxShadow: 3,
            }}>
                {/* Ícono tipo perfil */}
                <Box sx={{ position: 'absolute', top: 16, left: 16, bgcolor: 'rgba(255,255,255,0.2)', p: 1, borderRadius: '50%' }}>
                    {isHuman ? <LocalHospitalIcon /> : <PetsIcon />}
                </Box>

                {/* Toggle idioma */}
                <Button
                    onClick={langToggle}
                    sx={{ position: 'absolute', top: 20, right: 16, bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 'bold', minWidth: 0, px: 1.5, borderRadius: 8 }}
                >
                    {lang === 'en' ? 'EN' : 'ES'}
                </Button>

                <Typography variant="h3" fontWeight={800} sx={{ letterSpacing: '-0.5px' }}>
                    {profile.name.toUpperCase()}
                </Typography>

                {/* Chip tipo de sangre solo para humanos */}
                {isHuman && profile.bloodType && (
                    <Box display="flex" justifyContent="center" mt={2}>
                        <Chip
                            icon={<LocalHospitalIcon style={{ color: 'white' }} />}
                            label={`${d.blood}: ${profile.bloodType}`}
                            sx={{ bgcolor: '#991b1b', color: 'white', fontWeight: 700, fontSize: '1rem', px: 2, py: 3, border: '2px solid rgba(255,255,255,0.2)' }}
                        />
                    </Box>
                )}
            </Box>

            <Container maxWidth="sm" sx={{ mt: '-20px', px: 2, position: 'relative', zIndex: 10 }}>

                {/* ── Alerta de alergias ── */}
                {isHuman && profile.allergies?.length > 0 && (
                    <Alert severity="error" icon={<WarningAmberIcon fontSize="inherit" />} sx={{ borderRadius: 3, mb: 2 }}>
                        <Typography variant="subtitle1" fontWeight={700}>{d.allergies}:</Typography>
                        <Typography variant="body1">{profile.allergies.join(', ')}</Typography>
                    </Alert>
                )}

                {/* ── Contactos de emergencia ── */}
                <Paper sx={{ p: 2, borderRadius: 4, mb: 2, border: '1px solid', borderColor: 'grey.200' }}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700, letterSpacing: 1, mb: 2 }}>
                        {d.contactsTitle}
                    </Typography>

                    {isHuman ? (
                        <Box display="flex" flexDirection="column" gap={1.5}>
                            {ec1Phone && (
                                <Button variant="contained" color="error" size="large" fullWidth startIcon={<PhoneIcon />}
                                    href={`tel:${ec1Phone}`} sx={{ py: 2, fontSize: '1rem', fontWeight: 700 }}>
                                    {d.call} {ec1Relation?.toUpperCase()}: {ec1Name}
                                </Button>
                            )}
                            {ec2Phone && (
                                <Button variant="outlined" color="error" size="large" fullWidth startIcon={<PhoneIcon />}
                                    href={`tel:${ec2Phone}`} sx={{ py: 1.5, fontWeight: 600 }}>
                                    {d.call} {ec2Relation?.toUpperCase()}
                                </Button>
                            )}
                        </Box>
                    ) : (
                        <Box display="flex" flexDirection="column" gap={1.5}>
                            {profile.ownerPhone && (
                                <>
                                    <Button variant="contained" color="error" size="large" fullWidth startIcon={<PhoneIcon />}
                                        href={`tel:${profile.ownerPhone}`} sx={{ py: 2, fontSize: '1rem', fontWeight: 700 }}>
                                        {d.callOwner}
                                    </Button>
                                    <Button variant="outlined" color="success" size="large" fullWidth startIcon={<WhatsAppIcon />}
                                        href={`https://wa.me/${profile.ownerPhone.replace(/\D/g, '')}`} sx={{ py: 1.5, fontWeight: 600 }}>
                                        {d.whatsappOwner}
                                    </Button>
                                </>
                            )}
                        </Box>
                    )}
                </Paper>

                {/* ── Accordions de detalles ── */}
                <Box display="flex" flexDirection="column" gap={1} pt={1}>
                    {isHuman ? (
                        <>
                            <Accordion sx={{ borderRadius: '16px !important', '&:before': { display: 'none' }, boxShadow: 1, border: '1px solid', borderColor: 'grey.100' }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="h6" fontWeight={700}>{d.human.conditionsTitle}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {profile.medicalConditions.length === 0
                                        ? <Typography color="text.secondary">{d.human.none}</Typography>
                                        : <ul style={{ paddingLeft: 20, margin: 0 }}>
                                            {profile.medicalConditions.map((c, i) => <li key={i}><Typography>{c}</Typography></li>)}
                                        </ul>
                                    }
                                </AccordionDetails>
                            </Accordion>

                            <Accordion sx={{ borderRadius: '16px !important', '&:before': { display: 'none' }, boxShadow: 1, border: '1px solid', borderColor: 'grey.100' }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="h6" fontWeight={700}>{d.human.medicationsTitle}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {profile.medications.length === 0
                                        ? <Typography color="text.secondary">{d.human.none}</Typography>
                                        : <ul style={{ paddingLeft: 20, margin: 0 }}>
                                            {profile.medications.map((m, i) => <li key={i}><Typography>{m}</Typography></li>)}
                                        </ul>
                                    }
                                </AccordionDetails>
                            </Accordion>
                        </>
                    ) : (
                        <>
                            <Accordion sx={{ borderRadius: '16px !important', '&:before': { display: 'none' }, boxShadow: 1, border: '1px solid', borderColor: 'grey.100' }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="h6" fontWeight={700}>{d.pet.detailsTitle}</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                    {(profile.breed || profile.species) && (
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ textTransform: 'uppercase' }}>
                                                {d.pet.breedSpecies}
                                            </Typography>
                                            <Typography>{[profile.breed, profile.species].filter(Boolean).join(' / ')}</Typography>
                                        </Box>
                                    )}
                                    {profile.targetReward && (
                                        <Alert severity="success">
                                            <Typography variant="subtitle2" fontWeight={700}>{d.pet.reward}:</Typography>
                                            <Typography variant="body2">{profile.targetReward}</Typography>
                                        </Alert>
                                    )}
                                </AccordionDetails>
                            </Accordion>

                            {(profile.veterinarian_name || profile.veterinarian_phone) && (
                                <Accordion sx={{ borderRadius: '16px !important', '&:before': { display: 'none' }, boxShadow: 1, border: '1px solid', borderColor: 'grey.100' }}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography variant="h6" fontWeight={700}>{d.pet.vetTitle}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                        {profile.veterinarian_name && (
                                            <Typography fontWeight={600}>{profile.veterinarian_name}</Typography>
                                        )}
                                        {profile.veterinarian_phone && (
                                            <Button startIcon={<PhoneIcon />} href={`tel:${profile.veterinarian_phone}`} variant="text">
                                                {profile.veterinarian_phone}
                                            </Button>
                                        )}
                                        {profile.vaccinationStatus && (
                                            <Box sx={{ mt: 1, bgcolor: 'grey.50', p: 1.5, borderRadius: 2, border: '1px solid', borderColor: 'grey.200' }}>
                                                <Typography variant="caption" fontWeight="bold">{d.pet.vaccination}:</Typography>
                                                <Typography>{profile.vaccinationStatus}</Typography>
                                            </Box>
                                        )}
                                    </AccordionDetails>
                                </Accordion>
                            )}
                        </>
                    )}
                </Box>
            </Container>
        </Box>
    );
}
