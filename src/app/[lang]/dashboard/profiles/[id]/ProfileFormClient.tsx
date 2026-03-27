'use client';
import { useState, useEffect, useCallback } from 'react';
import {
    Box, Typography, Button, TextField, Select, MenuItem, InputLabel, FormControl,
    Switch, FormControlLabel, Accordion, AccordionSummary, AccordionDetails,
    Paper, IconButton, Divider, CircularProgress, Alert,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import { useRouter } from 'next/navigation';
import { ProfileUseCases } from '@/useCases/profileUseCases';
import { ProfileType, CreateProfileRequest } from '@/models/profile';

const HUMAN_RELATION_KEYS = ['mother', 'father', 'brother', 'son', 'daughter', 'grandfather', 'grandmother'] as const;
const PET_RELATION_KEYS = ['owner_m', 'owner_f'] as const;

export default function ProfileFormClient({
    dictionary,
    lang,
    params,
}: {
    dictionary: any;
    lang: string;
    params: { id: string };
}) {
    const router = useRouter();
    const isNew = params.id === 'new';
    const d = dictionary.profile;
    const dRel = d.emergencyRelations;

    const [loading, setLoading] = useState(!isNew);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);

    const [type, setType] = useState<ProfileType>('HUMAN');
    const [isActive, setIsActive] = useState(true);
    const [name, setName] = useState('');

    const [bloodType, setBloodType] = useState('');
    const [allergies, setAllergies] = useState('');
    const [conditions, setConditions] = useState('');
    const [medications, setMedications] = useState('');
    const [contact1Name, setContact1Name] = useState('');
    const [contact1Phone, setContact1Phone] = useState('');
    const [contact1Relation, setContact1Relation] = useState('');
    const [contact2Name, setContact2Name] = useState('');
    const [contact2Phone, setContact2Phone] = useState('');
    const [contact2Relation, setContact2Relation] = useState('');

    const [species, setSpecies] = useState('');
    const [breed, setBreed] = useState('');
    const [vaccination, setVaccination] = useState('');
    const [vetName, setVetName] = useState('');
    const [vetPhone, setVetPhone] = useState('');
    const [ownerPhone, setOwnerPhone] = useState('');
    const [targetReward, setTargetReward] = useState('');

    const loadProfile = useCallback(async () => {
        if (isNew) return;
        setLoading(true);
        setLoadError(null);
        try {
            const profile = await ProfileUseCases.getProfile(params.id);
            setType(profile.type);
            setIsActive(profile.isActive);
            setName(profile.name);
            if (profile.type === 'HUMAN') {
                setBloodType(profile.bloodType || '');
                setAllergies((profile.allergies || []).join(', '));
                setConditions((profile.medicalConditions || []).join(', '));
                setMedications((profile.medications || []).join(', '));
                setContact1Name(profile.emergencyContact1_name || '');
                setContact1Phone(profile.emergencyContact1_phone || '');
                setContact1Relation(profile.emergencyContact1_relation || '');
                setContact2Name(profile.emergencyContact2_name || '');
                setContact2Phone(profile.emergencyContact2_phone || '');
                setContact2Relation(profile.emergencyContact2_relation || '');
            } else {
                setSpecies(profile.species || '');
                setBreed(profile.breed || '');
                setVaccination(profile.vaccinationStatus || '');
                setVetName(profile.veterinarian_name || '');
                setVetPhone(profile.veterinarian_phone || '');
                setOwnerPhone(profile.ownerPhone || '');
                setTargetReward(profile.targetReward || '');
                setContact1Name(profile.emergencyContact1_name || '');
                setContact1Phone(profile.emergencyContact1_phone || '');
                setContact1Relation(profile.emergencyContact1_relation || '');
                setContact2Name(profile.emergencyContact2_name || '');
                setContact2Phone(profile.emergencyContact2_phone || '');
                setContact2Relation(profile.emergencyContact2_relation || '');
            }
        } catch {
            setLoadError(dictionary.auth?.login?.errorGeneric ?? 'Error');
        } finally {
            setLoading(false);
        }
    }, [isNew, params.id, dictionary]);

    useEffect(() => {
        void loadProfile();
    }, [loadProfile]);

    const handleSave = async () => {
        setSaving(true);
        setSaveError(null);
        try {
            if (isNew) {
                let body: CreateProfileRequest;
                if (type === 'HUMAN') {
                    body = {
                        type: 'HUMAN',
                        name,
                        isActive,
                        bloodType: bloodType || undefined,
                        allergies: allergies ? allergies.split(',').map((s) => s.trim()).filter(Boolean) : undefined,
                        medicalConditions: conditions ? conditions.split(',').map((s) => s.trim()).filter(Boolean) : undefined,
                        medications: medications ? medications.split(',').map((s) => s.trim()).filter(Boolean) : undefined,
                        emergencyContact1_name: contact1Name || undefined,
                        emergencyContact1_phone: contact1Phone || undefined,
                        emergencyContact1_relation: contact1Relation || undefined,
                        emergencyContact2_name: contact2Name || undefined,
                        emergencyContact2_phone: contact2Phone || undefined,
                        emergencyContact2_relation: contact2Relation || undefined,
                    };
                } else {
                    body = {
                        type: 'PET',
                        name,
                        isActive,
                        species: species || undefined,
                        breed: breed || undefined,
                        vaccinationStatus: vaccination || undefined,
                        targetReward: targetReward || undefined,
                        ownerPhone: ownerPhone || undefined,
                        veterinarian_name: vetName || undefined,
                        veterinarian_phone: vetPhone || undefined,
                        emergencyContact1_name: contact1Name || undefined,
                        emergencyContact1_phone: contact1Phone || undefined,
                        emergencyContact1_relation: contact1Relation || undefined,
                        emergencyContact2_name: contact2Name || undefined,
                        emergencyContact2_phone: contact2Phone || undefined,
                        emergencyContact2_relation: contact2Relation || undefined,
                    };
                }
                await ProfileUseCases.createProfile(body);
            } else {
                if (type === 'HUMAN') {
                    await ProfileUseCases.updateProfile(params.id, {
                        name,
                        isActive,
                        bloodType: bloodType || undefined,
                        allergies: allergies ? allergies.split(',').map((s) => s.trim()).filter(Boolean) : [],
                        medicalConditions: conditions ? conditions.split(',').map((s) => s.trim()).filter(Boolean) : [],
                        medications: medications ? medications.split(',').map((s) => s.trim()).filter(Boolean) : [],
                        emergencyContact1_name: contact1Name || undefined,
                        emergencyContact1_phone: contact1Phone || undefined,
                        emergencyContact1_relation: contact1Relation || undefined,
                        emergencyContact2_name: contact2Name || undefined,
                        emergencyContact2_phone: contact2Phone || undefined,
                        emergencyContact2_relation: contact2Relation || undefined,
                    });
                } else {
                    await ProfileUseCases.updateProfile(params.id, {
                        name,
                        isActive,
                        species: species || undefined,
                        breed: breed || undefined,
                        vaccinationStatus: vaccination || undefined,
                        targetReward: targetReward || undefined,
                        ownerPhone: ownerPhone || undefined,
                        veterinarian_name: vetName || undefined,
                        veterinarian_phone: vetPhone || undefined,
                        emergencyContact1_name: contact1Name || undefined,
                        emergencyContact1_phone: contact1Phone || undefined,
                        emergencyContact1_relation: contact1Relation || undefined,
                        emergencyContact2_name: contact2Name || undefined,
                        emergencyContact2_phone: contact2Phone || undefined,
                        emergencyContact2_relation: contact2Relation || undefined,
                    });
                }
            }
            router.push(`/${lang}/dashboard/profiles`);
        } catch (err: unknown) {
            setSaveError(err instanceof Error ? err.message : dictionary.auth?.login?.errorGeneric);
        } finally {
            setSaving(false);
        }
    };

    const relationMenuHuman = (
        <FormControl fullWidth>
            <InputLabel>{d.fields.relation}</InputLabel>
            <Select
                value={contact1Relation}
                label={d.fields.relation}
                onChange={(e) => setContact1Relation(e.target.value)}
                displayEmpty
            >
                <MenuItem value="">
                    <em>—</em>
                </MenuItem>
                {HUMAN_RELATION_KEYS.map((key) => (
                    <MenuItem key={key} value={key}>
                        {dRel.human[key]}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );

    const relationMenuHuman2 = (
        <FormControl fullWidth>
            <InputLabel>{d.fields.relation}</InputLabel>
            <Select
                value={contact2Relation}
                label={d.fields.relation}
                onChange={(e) => setContact2Relation(e.target.value)}
                displayEmpty
            >
                <MenuItem value="">
                    <em>—</em>
                </MenuItem>
                {HUMAN_RELATION_KEYS.map((key) => (
                    <MenuItem key={`c2-${key}`} value={key}>
                        {dRel.human[key]}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );

    const relationMenuPet = (value: string, onChange: (v: string) => void) => (
        <FormControl fullWidth>
            <InputLabel>{d.fields.relation}</InputLabel>
            <Select value={value} label={d.fields.relation} onChange={(e) => onChange(e.target.value)} displayEmpty>
                <MenuItem value="">
                    <em>—</em>
                </MenuItem>
                {PET_RELATION_KEYS.map((key) => (
                    <MenuItem key={key} value={key}>
                        {dRel.pet[key]}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" py={8}>
                <CircularProgress />
            </Box>
        );
    }

    if (loadError) {
        return (
            <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
                <Alert severity="error">{loadError}</Alert>
                <Button sx={{ mt: 2 }} onClick={() => router.back()}>
                    {dictionary.demo?.backHome ?? 'Volver'}
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ pb: 8, maxWidth: '800px', margin: '0 auto' }}>
            <Box display="flex" alignItems="center" mb={4} gap={2}>
                <IconButton onClick={() => router.back()} sx={{ color: 'text.primary' }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h2" flexGrow={1}>
                    {isNew ? dictionary.dashboard?.home?.addProfile ?? 'Nuevo perfil' : dictionary.profile?.basic}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                    onClick={() => void handleSave()}
                    disabled={saving || !name.trim()}
                    sx={{ display: { xs: 'none', sm: 'flex' } }}
                >
                    {d.save}
                </Button>
            </Box>

            {saveError && (
                <Alert severity="error" sx={{ mb: 2 }} onClose={() => setSaveError(null)}>
                    {saveError}
                </Alert>
            )}

            <Paper sx={{ p: { xs: 2, sm: 4 }, mb: 4 }}>
                <Typography variant="h6" gutterBottom color="primary.main" fontWeight={600}>
                    {d.basic}
                </Typography>
                <Box display="flex" flexDirection="column" gap={3} mt={2}>
                    <FormControl fullWidth>
                        <InputLabel>{d.human} / {d.pet}</InputLabel>
                        <Select
                            value={type}
                            label={`${d.human} / ${d.pet}`}
                            onChange={(e) => setType(e.target.value as ProfileType)}
                            disabled={!isNew}
                        >
                            <MenuItem value="HUMAN">{d.human}</MenuItem>
                            <MenuItem value="PET">{d.pet}</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        label={d.fields.name}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <FormControlLabel
                        control={<Switch checked={isActive} onChange={(e) => setIsActive(e.target.checked)} color="success" />}
                        label={dictionary.account?.subscription?.status ?? 'Activo'}
                    />
                </Box>
            </Paper>

            {type === 'HUMAN' && (
                <Box display="flex" flexDirection="column" gap={2}>
                    <Accordion defaultExpanded elevation={1} sx={{ borderRadius: 2, '&:before': { display: 'none' } }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography fontWeight={600}>{d.medical}</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>{d.fields.bloodType}</InputLabel>
                                <Select
                                    value={bloodType}
                                    label={d.fields.bloodType}
                                    onChange={(e) => setBloodType(e.target.value)}
                                >
                                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'].map((bt) => (
                                        <MenuItem key={bt} value={bt}>
                                            {bt}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                fullWidth
                                label={d.fields.allergies}
                                multiline
                                rows={2}
                                value={allergies}
                                onChange={(e) => setAllergies(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label={d.fields.conditions}
                                multiline
                                rows={2}
                                value={conditions}
                                onChange={(e) => setConditions(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label={d.fields.medications}
                                multiline
                                rows={2}
                                value={medications}
                                onChange={(e) => setMedications(e.target.value)}
                            />
                        </AccordionDetails>
                    </Accordion>

                    <Accordion defaultExpanded elevation={1} sx={{ borderRadius: 2, '&:before': { display: 'none' } }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography fontWeight={600}>{d.contacts}</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <Typography variant="subtitle2" color="text.secondary">
                                {dictionary.emergency?.contactsTitle ?? 'Contacto 1'}
                            </Typography>
                            <TextField
                                fullWidth
                                label={d.fields.contactName}
                                value={contact1Name}
                                onChange={(e) => setContact1Name(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label={d.fields.contactPhone}
                                value={contact1Phone}
                                onChange={(e) => setContact1Phone(e.target.value)}
                                type="tel"
                            />
                            {relationMenuHuman}
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="subtitle2" color="text.secondary">
                                {dictionary.emergency?.contactsTitle ?? 'Contacto'} 2
                            </Typography>
                            <TextField
                                fullWidth
                                label={d.fields.contactName}
                                value={contact2Name}
                                onChange={(e) => setContact2Name(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label={d.fields.contactPhone}
                                value={contact2Phone}
                                onChange={(e) => setContact2Phone(e.target.value)}
                                type="tel"
                            />
                            {relationMenuHuman2}
                        </AccordionDetails>
                    </Accordion>
                </Box>
            )}

            {type === 'PET' && (
                <Box display="flex" flexDirection="column" gap={2}>
                    <Accordion defaultExpanded elevation={1} sx={{ borderRadius: 2, '&:before': { display: 'none' } }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography fontWeight={600}>{d.pet}</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <TextField fullWidth label={dictionary.emergency?.pet?.breedSpecies ?? 'Especie'} value={species} onChange={(e) => setSpecies(e.target.value)} required />
                            <TextField fullWidth label={dictionary.emergency?.pet?.breedSpecies ?? 'Raza'} value={breed} onChange={(e) => setBreed(e.target.value)} />
                            <TextField fullWidth label={dictionary.emergency?.pet?.vaccination ?? 'Vacunas'} multiline rows={2} value={vaccination} onChange={(e) => setVaccination(e.target.value)} />
                            <TextField fullWidth label={dictionary.emergency?.pet?.reward ?? 'Recompensa'} value={targetReward} onChange={(e) => setTargetReward(e.target.value)} />
                            <TextField fullWidth label={dictionary.emergency?.callOwner ?? 'Tel. dueño'} value={ownerPhone} onChange={(e) => setOwnerPhone(e.target.value)} type="tel" />
                            <TextField fullWidth label={dictionary.emergency?.pet?.vetTitle ?? 'Veterinario'} value={vetName} onChange={(e) => setVetName(e.target.value)} />
                            <TextField fullWidth label={dictionary.emergency?.pet?.vetTitle ?? 'Tel. vet'} value={vetPhone} onChange={(e) => setVetPhone(e.target.value)} type="tel" />
                        </AccordionDetails>
                    </Accordion>

                    <Accordion defaultExpanded elevation={1} sx={{ borderRadius: 2, '&:before': { display: 'none' } }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography fontWeight={600}>{d.contacts}</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <TextField fullWidth label={d.fields.contactName} value={contact1Name} onChange={(e) => setContact1Name(e.target.value)} />
                            <TextField fullWidth label={d.fields.contactPhone} value={contact1Phone} onChange={(e) => setContact1Phone(e.target.value)} type="tel" />
                            {relationMenuPet(contact1Relation, setContact1Relation)}
                            <Divider />
                            <TextField fullWidth label={`${d.fields.contactName} 2`} value={contact2Name} onChange={(e) => setContact2Name(e.target.value)} />
                            <TextField fullWidth label={`${d.fields.contactPhone} 2`} value={contact2Phone} onChange={(e) => setContact2Phone(e.target.value)} type="tel" />
                            {relationMenuPet(contact2Relation, setContact2Relation)}
                        </AccordionDetails>
                    </Accordion>
                </Box>
            )}

            <Box sx={{ mt: 4, display: { xs: 'block', sm: 'none' } }}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                    onClick={() => void handleSave()}
                    disabled={saving || !name.trim()}
                >
                    {d.save}
                </Button>
            </Box>
        </Box>
    );
}
