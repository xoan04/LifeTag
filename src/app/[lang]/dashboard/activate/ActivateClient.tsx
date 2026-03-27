'use client';
import { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    TextField,
    MenuItem,
    CircularProgress,
    Alert,
    FormControl,
    InputLabel,
    Select,
} from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import NfcIcon from '@mui/icons-material/Nfc';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import TagIcon from '@mui/icons-material/Tag';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useRouter } from 'next/navigation';
import { Profile } from '@/models/profile';
import { ENABLE_SCANNER } from '@/lib/featureFlags';
import { readNfcTagOnce, isWebNfcSupported, isAppleMobileWeb, classifyNfcFailure } from '@/lib/nfcWeb';
import { ProfileUseCases } from '@/useCases/profileUseCases';
import { DeviceUseCases } from '@/useCases/deviceUseCases';

export default function ActivateClient({ dictionary, lang }: { dictionary: any; lang: string }) {
    const router = useRouter();
    const dAct = dictionary.dashboard.activate;
    const dDevices = dictionary.devices;

    const [deviceId, setDeviceId] = useState('');
    const [selectedProfileId, setSelectedProfileId] = useState('');
    const [deviceType, setDeviceType] = useState<'QR_TAG' | 'NFC_TAG'>('QR_TAG');
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [loadingProfiles, setLoadingProfiles] = useState(true);
    const [profilesLoadError, setProfilesLoadError] = useState<string | null>(null);

    const [inputMode, setInputMode] = useState<'automatic' | 'manual'>(ENABLE_SCANNER ? 'automatic' : 'manual');
    const [isScanning, setIsScanning] = useState(false);
    const [loading, setLoading] = useState(false);
    const [scanError, setScanError] = useState<string | null>(null);
    const [linkError, setLinkError] = useState<string | null>(null);

    const loadProfiles = useCallback(async () => {
        setLoadingProfiles(true);
        setProfilesLoadError(null);
        try {
            setProfiles(await ProfileUseCases.getProfiles());
        } catch {
            setProfilesLoadError(dictionary.auth?.login?.errorGeneric ?? 'Error al cargar perfiles.');
        } finally {
            setLoadingProfiles(false);
        }
    }, [dictionary]);

    useEffect(() => {
        void loadProfiles();
    }, [loadProfiles]);

    const handleScanQR = () => {
        setScanError(null);
        setLinkError(null);
        setDeviceType('QR_TAG');
        setIsScanning(true);
        setTimeout(() => {
            const randomId = Math.random().toString(36).substring(2, 8).toUpperCase();
            setDeviceId(randomId);
            setIsScanning(false);
            setInputMode('manual');
        }, 1500);
    };

    const handleScanNFC = async () => {
        setScanError(null);
        setLinkError(null);
        if (!isWebNfcSupported()) {
            setScanError(isAppleMobileWeb() ? dAct.nfcUnsupportedApple : dAct.nfcUnsupported);
            return;
        }
        setIsScanning(true);
        try {
            const token = await readNfcTagOnce();
            setDeviceId(token);
            setDeviceType('NFC_TAG');
            setInputMode('manual');
        } catch (err) {
            const kind = classifyNfcFailure(err);
            if (kind === 'cancelled') setScanError(dAct.nfcCancelled);
            else setScanError(dAct.nfcReadFailed);
        } finally {
            setIsScanning(false);
        }
    };

    const handleLinkDevice = async () => {
        if (!deviceId || !selectedProfileId) return;
        setLoading(true);
        setLinkError(null);
        try {
            await DeviceUseCases.registerAndActivate(deviceId.trim(), deviceType, selectedProfileId);
            router.push(`/${lang}/dashboard/profiles`);
        } catch (err) {
            setLinkError(
                DeviceUseCases.resolveErrorMessage(err, {
                    ...dDevices.register,
                    ...dDevices.activate,
                })
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Typography variant="h2" mb={1} textAlign="center">
                {dictionary.dashboard.activate.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4} textAlign="center">
                {dictionary.dashboard.activate.subtitle}
            </Typography>

            <Card sx={{ p: 2 }}>
                <CardContent>
                    {!deviceId && ENABLE_SCANNER && inputMode === 'automatic' ? (
                        <Box display="flex" flexDirection="column" alignItems="center" gap={3} py={4}>
                            <Typography variant="h6" color="text.secondary">
                                {dictionary.dashboard.activate.chooseMethod}
                            </Typography>

                            {isAppleMobileWeb() && (
                                <Alert severity="info" sx={{ width: '100%' }}>
                                    {dAct.nfcUnsupportedApple}
                                </Alert>
                            )}

                            {scanError && (
                                <Alert severity="warning" onClose={() => setScanError(null)} sx={{ width: '100%' }}>
                                    {scanError}
                                </Alert>
                            )}

                            <Box display="flex" gap={2} width="100%">
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="large"
                                    fullWidth
                                    startIcon={isScanning ? <CircularProgress size={20} /> : <QrCodeScannerIcon />}
                                    sx={{ py: 3, display: 'flex', flexDirection: 'column', gap: 1 }}
                                    onClick={handleScanQR}
                                    disabled={isScanning}
                                >
                                    {dictionary.dashboard.activate.scanQR}
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    size="large"
                                    fullWidth
                                    startIcon={isScanning ? <CircularProgress size={20} /> : <NfcIcon />}
                                    sx={{ py: 3, display: 'flex', flexDirection: 'column', gap: 1 }}
                                    onClick={() => void handleScanNFC()}
                                    disabled={isScanning || !isWebNfcSupported()}
                                    title={
                                        !isWebNfcSupported()
                                            ? isAppleMobileWeb()
                                                ? dAct.nfcUnsupportedApple
                                                : dAct.nfcUnsupported
                                            : undefined
                                    }
                                >
                                    {dictionary.dashboard.activate.scanNFC}
                                </Button>
                            </Box>

                            <Button
                                variant="text"
                                startIcon={<KeyboardIcon />}
                                onClick={() => {
                                    setDeviceType('QR_TAG');
                                    setInputMode('manual');
                                }}
                                disabled={isScanning}
                            >
                                {dictionary.dashboard.activate.enterCode}
                            </Button>
                        </Box>
                    ) : (
                        <Box display="flex" flexDirection="column" gap={4}>
                            {profilesLoadError && (
                                <Alert
                                    severity="error"
                                    action={
                                        <Button color="inherit" size="small" onClick={() => void loadProfiles()}>
                                            {dAct.retryScanner}
                                        </Button>
                                    }
                                >
                                    {profilesLoadError}
                                </Alert>
                            )}

                            {/* Step 1: Device ID */}
                            <Box>
                                <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                                    {dictionary.dashboard.activate.step1}
                                </Typography>
                                <TextField
                                    fullWidth
                                    label={dictionary.dashboard.activate.enterCodePlaceholder}
                                    value={deviceId}
                                    onChange={(e) => setDeviceId(e.target.value.toUpperCase())}
                                    variant="outlined"
                                    placeholder="e.g. A1B2C3"
                                    InputProps={{
                                        startAdornment: <TagIcon color="action" sx={{ mr: 1 }} />,
                                    }}
                                />
                                <FormControl fullWidth sx={{ mt: 2 }}>
                                    <InputLabel id="activate-device-type-label">{dAct.deviceTypeLabel}</InputLabel>
                                    <Select
                                        labelId="activate-device-type-label"
                                        label={dAct.deviceTypeLabel}
                                        value={deviceType}
                                        onChange={(e) => setDeviceType(e.target.value as 'QR_TAG' | 'NFC_TAG')}
                                    >
                                        <MenuItem value="QR_TAG">{dDevices.type.QR_TAG}</MenuItem>
                                        <MenuItem value="NFC_TAG">{dDevices.type.NFC_TAG}</MenuItem>
                                    </Select>
                                </FormControl>
                                {ENABLE_SCANNER && (
                                    <Box display="flex" justifyContent="flex-end" mt={1}>
                                        <Button
                                            size="small"
                                            onClick={() => {
                                                setDeviceId('');
                                                setScanError(null);
                                                setLinkError(null);
                                                setInputMode('automatic');
                                            }}
                                        >
                                            {dictionary.dashboard.activate.retryScanner}
                                        </Button>
                                    </Box>
                                )}
                            </Box>

                            {/* Step 2: Action */}
                            <Box>
                                <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                                    {dictionary.dashboard.activate.step2}
                                </Typography>

                                <Box display="flex" flexDirection="column" gap={3}>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary" mb={1}>
                                            {dictionary.dashboard.activate.optionA}
                                        </Typography>
                                        {linkError && (
                                            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setLinkError(null)}>
                                                {linkError}
                                            </Alert>
                                        )}
                                        <TextField
                                            select
                                            fullWidth
                                            label={dictionary.dashboard.activate.selectProfile}
                                            value={selectedProfileId}
                                            onChange={(e) => setSelectedProfileId(e.target.value)}
                                            disabled={!deviceId || loadingProfiles}
                                        >
                                            {loadingProfiles ? (
                                                <MenuItem value="" disabled>
                                                    …
                                                </MenuItem>
                                            ) : profiles.length === 0 ? (
                                                <MenuItem value="" disabled>
                                                    {dAct.noProfiles}
                                                </MenuItem>
                                            ) : (
                                                profiles.map((profile) => (
                                                    <MenuItem key={profile.id} value={profile.id}>
                                                        {profile.name} (
                                                        {profile.type === 'HUMAN' ? dAct.human : dAct.pet})
                                                    </MenuItem>
                                                ))
                                            )}
                                        </TextField>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            onClick={() => void handleLinkDevice()}
                                            disabled={
                                                !deviceId ||
                                                !selectedProfileId ||
                                                loading ||
                                                loadingProfiles ||
                                                profiles.length === 0
                                            }
                                            sx={{ mt: 1 }}
                                        >
                                            {loading ? (
                                                <CircularProgress size={24} color="inherit" />
                                            ) : (
                                                dictionary.dashboard.activate.linkExisting
                                            )}
                                        </Button>
                                    </Box>

                                    <Box display="flex" alignItems="center" gap={2}>
                                        <Box sx={{ flex: 1, height: '1px', bgcolor: 'divider' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            {dictionary.dashboard.activate.or}
                                        </Typography>
                                        <Box sx={{ flex: 1, height: '1px', bgcolor: 'divider' }} />
                                    </Box>

                                    <Box>
                                        <Typography variant="body2" color="text.secondary" mb={1}>
                                            {dictionary.dashboard.activate.optionB}
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            size="large"
                                            fullWidth
                                            startIcon={<AddCircleOutlineIcon />}
                                            disabled={!deviceId}
                                            onClick={() => router.push(`/${lang}/dashboard/profiles/new?tagId=${encodeURIComponent(deviceId)}`)}
                                        >
                                            {dictionary.dashboard.activate.createNew}
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}
