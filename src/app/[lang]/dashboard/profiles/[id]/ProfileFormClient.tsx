'use client';
import { useState, useEffect } from 'react';
import {
    Box, Typography, Button, TextField, Select, MenuItem, InputLabel, FormControl,
    Switch, FormControlLabel, Accordion, AccordionSummary, AccordionDetails,
    Paper, IconButton, Divider, Chip, Stack
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import { useRouter } from 'next/navigation';
import { ProfileType, Device } from '@/types/profile';
import { mockProfiles, mockDevices } from '@/data/mockData';

export default function ProfileFormClient({ dictionary, lang, params }: { dictionary: any; lang: string; params: { id: string } }) {
    const router = useRouter();
    const isNew = params.id === 'new';

    const [type, setType] = useState<ProfileType>('HUMAN');
    const [isActive, setIsActive] = useState(true);
    const [name, setName] = useState('');
    const [devices, setDevices] = useState<Device[]>([]);

    // Human Fields
    const [bloodType, setBloodType] = useState('');
    const [allergies, setAllergies] = useState('');
    const [conditions, setConditions] = useState('');
    const [medications, setMedications] = useState('');
    const [contact1Name, setContact1Name] = useState('');
    const [contact1Phone, setContact1Phone] = useState('');

    // Pet Fields
    const [species, setSpecies] = useState('');
    const [breed, setBreed] = useState('');
    const [vaccination, setVaccination] = useState('');
    const [vetName, setVetName] = useState('');
    const [vetPhone, setVetPhone] = useState('');
    const [ownerPhone, setOwnerPhone] = useState('');

    useEffect(() => {
        if (!isNew) {
            const profile = mockProfiles.find(p => p.id === params.id);
            if (profile) {
                setType(profile.type);
                setIsActive(profile.isActive);
                setName(profile.name);
                setDevices(mockDevices.filter(d => d.profileId === profile.id));
                // Human
                if (profile.type === 'HUMAN') {
                    setBloodType(profile.bloodType || '');
                    setAllergies((profile.allergies || []).join(', '));
                    setConditions((profile.medicalConditions || []).join(', '));
                    setMedications((profile.medications || []).join(', '));
                    setContact1Name(profile.emergencyContact1?.name || '');
                    setContact1Phone(profile.emergencyContact1?.phone || '');
                } else {
                    // Pet
                    setSpecies(profile.species || '');
                    setBreed(profile.breed || '');
                    setVaccination(profile.vaccinationStatus || '');
                    setVetName(profile.veterinarian?.name || '');
                    setVetPhone(profile.veterinarian?.phone || '');
                    setOwnerPhone(profile.ownerPhone || '');
                }
            }
        }
    }, [isNew, params.id]);

    const handleUnlink = (deviceIdToRemove: string) => {
        setDevices(prev => prev.filter(d => d.id !== deviceIdToRemove));
    };

    const handleSave = () => {
        router.push(`/${lang}/dashboard/profiles`);
    };

    return (
        <Box sx={{ pb: 8, maxWidth: '800px', margin: '0 auto' }}>
            <Box display="flex" alignItems="center" mb={4} gap={2}>
                <IconButton onClick={() => router.back()} sx={{ color: 'text.primary' }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h2" flexGrow={1}>
                    {isNew ? 'Create Profile' : 'Edit Profile'}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    sx={{ display: { xs: 'none', sm: 'flex' } }}
                >
                    {dictionary.profile.save}
                </Button>
            </Box>

            <Paper sx={{ p: { xs: 2, sm: 4 }, mb: 4 }}>
                <Typography variant="h6" gutterBottom color="primary.main" fontWeight={600}>
                    {dictionary.profile.basic}
                </Typography>
                <Box display="flex" flexDirection="column" gap={3} mt={2}>
                    <FormControl fullWidth>
                        <InputLabel>Profile Type</InputLabel>
                        <Select
                            value={type}
                            label="Profile Type"
                            onChange={(e) => setType(e.target.value as ProfileType)}
                            disabled={!isNew}
                        >
                            <MenuItem value="HUMAN">{dictionary.profile.human}</MenuItem>
                            <MenuItem value="PET">{dictionary.profile.pet}</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        label={dictionary.profile.fields.name}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <FormControlLabel
                        control={<Switch checked={isActive} onChange={(e) => setIsActive(e.target.checked)} color="success" />}
                        label="Profile Active"
                    />

                    {!isNew && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                {dictionary.profile.devices}
                            </Typography>
                            {devices.length === 0 ? (
                                <Typography variant="body2" color="text.secondary">No tags linked.</Typography>
                            ) : (
                                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                    {devices.map(device => (
                                        <Chip
                                            key={device.id}
                                            label={`${device.deviceToken} (${device.deviceType})`}
                                            onDelete={() => handleUnlink(device.id)}
                                            color={device.status === 'active' ? 'primary' : 'default'}
                                            variant="outlined"
                                        />
                                    ))}
                                </Stack>
                            )}
                        </Box>
                    )}
                </Box>
            </Paper>

            {type === 'HUMAN' && (
                <Box display="flex" flexDirection="column" gap={2}>
                    <Accordion defaultExpanded elevation={1} sx={{ borderRadius: 2, '&:before': { display: 'none' } }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography fontWeight={600}>{dictionary.profile.medical}</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>{dictionary.profile.fields.bloodType}</InputLabel>
                                <Select
                                    value={bloodType}
                                    label={dictionary.profile.fields.bloodType}
                                    onChange={(e) => setBloodType(e.target.value)}
                                >
                                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'].map(bt => (
                                        <MenuItem key={bt} value={bt}>{bt}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                fullWidth label={dictionary.profile.fields.allergies} multiline rows={2}
                                value={allergies} onChange={(e) => setAllergies(e.target.value)}
                            />
                            <TextField
                                fullWidth label={dictionary.profile.fields.conditions} multiline rows={2}
                                value={conditions} onChange={(e) => setConditions(e.target.value)}
                            />
                            <TextField
                                fullWidth label={dictionary.profile.fields.medications} multiline rows={2}
                                value={medications} onChange={(e) => setMedications(e.target.value)}
                            />
                        </AccordionDetails>
                    </Accordion>

                    <Accordion defaultExpanded elevation={1} sx={{ borderRadius: 2, '&:before': { display: 'none' } }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography fontWeight={600}>{dictionary.profile.contacts}</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <TextField fullWidth label="Name" value={contact1Name} onChange={(e) => setContact1Name(e.target.value)} required />
                            <TextField fullWidth label="Phone Number" value={contact1Phone} onChange={(e) => setContact1Phone(e.target.value)} type="tel" required />
                        </AccordionDetails>
                    </Accordion>
                </Box>
            )}

            {type === 'PET' && (
                <Box display="flex" flexDirection="column" gap={2}>
                    <Accordion defaultExpanded elevation={1} sx={{ borderRadius: 2, '&:before': { display: 'none' } }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography fontWeight={600}>{dictionary.profile.pet} Details</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <TextField fullWidth label="Species" value={species} onChange={(e) => setSpecies(e.target.value)} required />
                            <TextField fullWidth label="Breed" value={breed} onChange={(e) => setBreed(e.target.value)} />
                            <TextField fullWidth label="Vaccination Status" multiline rows={2} value={vaccination} onChange={(e) => setVaccination(e.target.value)} />
                            <TextField fullWidth label="Owner Phone Number" value={ownerPhone} onChange={(e) => setOwnerPhone(e.target.value)} type="tel" required />
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
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                >
                    {dictionary.profile.save}
                </Button>
            </Box>
        </Box>
    );
}
