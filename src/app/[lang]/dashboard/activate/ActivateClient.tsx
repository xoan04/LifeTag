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
    Stack,
    Divider,
    ToggleButton,
    ToggleButtonGroup,
} from '@mui/material';
import NfcIcon from '@mui/icons-material/Nfc';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import TagIcon from '@mui/icons-material/Tag';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LinkIcon from '@mui/icons-material/Link';
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

    /** QR = enlace público (sin escaneo); NFC = solo etiqueta física (escaneo o código manual) */
    const [linkMode, setLinkMode] = useState<'qr' | 'nfc'>('qr');

    const [deviceId, setDeviceId] = useState('');
    const [selectedProfileId, setSelectedProfileId] = useState('');
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

    const publicUrlForProfile =
        typeof window !== 'undefined' && selectedProfileId
            ? `${window.location.origin}/${lang}/id/${selectedProfileId}`
            : '';

    const handleQrLink = async () => {
        if (!selectedProfileId) return;
        setLoading(true);
        setLinkError(null);
        try {
            const token =
                typeof crypto !== 'undefined' && crypto.randomUUID
                    ? `QR-${crypto.randomUUID().replace(/-/g, '').slice(0, 20).toUpperCase()}`
                    : `QR-${Date.now().toString(36).toUpperCase()}`;
            await DeviceUseCases.registerAndActivate(token, 'QR_TAG', selectedProfileId);
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
            setInputMode('manual');
        } catch (err) {
            const kind = classifyNfcFailure(err);
            if (kind === 'cancelled') setScanError(dAct.nfcCancelled);
            else setScanError(dAct.nfcReadFailed);
        } finally {
            setIsScanning(false);
        }
    };

    const handleNfcLinkDevice = async () => {
        if (!deviceId.trim() || !selectedProfileId) return;
        setLoading(true);
        setLinkError(null);
        try {
            await DeviceUseCases.registerAndActivate(deviceId.trim(), 'NFC_TAG', selectedProfileId);
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
                    <Stack spacing={3}>
                        <Typography variant="subtitle1" fontWeight={600} textAlign="center">
                            {dAct.chooseActivationType}
                        </Typography>
                        <ToggleButtonGroup
                            exclusive
                            fullWidth
                            value={linkMode}
                            onChange={(_, v) => {
                                if (v != null) {
                                    setLinkMode(v);
                                    setDeviceId('');
                                    setScanError(null);
                                    setLinkError(null);
                                    setInputMode(ENABLE_SCANNER ? 'automatic' : 'manual');
                                }
                            }}
                            color="primary"
                            size="small"
                        >
                            <ToggleButton value="qr">{dDevices.activate.linkModeQr}</ToggleButton>
                            <ToggleButton value="nfc">{dDevices.activate.linkModeNfc}</ToggleButton>
                        </ToggleButtonGroup>

                        {linkMode === 'qr' && (
                            <>
                                <Alert severity="info">{dAct.qrNoScan}</Alert>
                                <Alert severity="info">{dDevices.activate.qrHint}</Alert>
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
                                {linkError && (
                                    <Alert severity="error" onClose={() => setLinkError(null)}>
                                        {linkError}
                                    </Alert>
                                )}
                                <FormControl fullWidth>
                                    <InputLabel>{dictionary.dashboard.activate.selectProfile}</InputLabel>
                                    <Select
                                        value={selectedProfileId}
                                        label={dictionary.dashboard.activate.selectProfile}
                                        onChange={(e) => setSelectedProfileId(e.target.value)}
                                        disabled={loadingProfiles || profiles.length === 0}
                                    >
                                        {profiles.length === 0 ? (
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
                                    </Select>
                                </FormControl>
                                {selectedProfileId && publicUrlForProfile && (
                                    <Alert icon={<LinkIcon />} severity="success">
                                        <Typography variant="subtitle2" gutterBottom>
                                            {dAct.publicLinkPreview}
                                        </Typography>
                                        <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                                            {publicUrlForProfile}
                                        </Typography>
                                    </Alert>
                                )}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    size="large"
                                    onClick={() => void handleQrLink()}
                                    disabled={loading || !selectedProfileId || loadingProfiles || profiles.length === 0}
                                >
                                    {loading ? <CircularProgress size={24} color="inherit" /> : dAct.linkExisting}
                                </Button>
                                <Divider />
                                <Typography variant="body2" color="text.secondary">
                                    {dAct.optionB}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    startIcon={<AddCircleOutlineIcon />}
                                    onClick={() => router.push(`/${lang}/dashboard/profiles/new`)}
                                >
                                    {dAct.createNew}
                                </Button>
                            </>
                        )}

                        {linkMode === 'nfc' && (
                            <>
                                <Alert severity="info">{dDevices.activate.nfcHint}</Alert>
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

                                {!deviceId && ENABLE_SCANNER && inputMode === 'automatic' ? (
                                    <Box display="flex" flexDirection="column" alignItems="center" gap={2} py={2}>
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
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            size="large"
                                            fullWidth
                                            startIcon={isScanning ? <CircularProgress size={20} /> : <NfcIcon />}
                                            sx={{ py: 2 }}
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
                                            {dAct.scanNFC}
                                        </Button>
                                        <Button
                                            variant="text"
                                            startIcon={<KeyboardIcon />}
                                            disabled={isScanning}
                                            onClick={() => setInputMode('manual')}
                                        >
                                            {dAct.enterCode}
                                        </Button>
                                    </Box>
                                ) : (
                                    <Box display="flex" flexDirection="column" gap={3}>
                                        <Box>
                                            <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                                                {dAct.step1}
                                            </Typography>
                                            <TextField
                                                fullWidth
                                                label={dAct.enterCodePlaceholder}
                                                value={deviceId}
                                                onChange={(e) => setDeviceId(e.target.value.toUpperCase())}
                                                placeholder="NFC / ID en placa"
                                                InputProps={{
                                                    startAdornment: <TagIcon color="action" sx={{ mr: 1 }} />,
                                                }}
                                            />
                                            {ENABLE_SCANNER && (
                                                <Box display="flex" justifyContent="flex-end" mt={1}>
                                                    <Button
                                                        size="small"
                                                        onClick={() => {
                                                            setDeviceId('');
                                                            setScanError(null);
                                                            setInputMode('automatic');
                                                        }}
                                                    >
                                                        {dAct.retryScanner}
                                                    </Button>
                                                </Box>
                                            )}
                                        </Box>
                                        <Box>
                                            <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                                                {dAct.step2}
                                            </Typography>
                                            {linkError && (
                                                <Alert severity="error" sx={{ mb: 2 }} onClose={() => setLinkError(null)}>
                                                    {linkError}
                                                </Alert>
                                            )}
                                            <TextField
                                                select
                                                fullWidth
                                                label={dAct.selectProfile}
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
                                                sx={{ mt: 1 }}
                                                onClick={() => void handleNfcLinkDevice()}
                                                disabled={
                                                    !deviceId.trim() ||
                                                    !selectedProfileId ||
                                                    loading ||
                                                    loadingProfiles ||
                                                    profiles.length === 0
                                                }
                                            >
                                                {loading ? (
                                                    <CircularProgress size={24} color="inherit" />
                                                ) : (
                                                    dAct.linkExisting
                                                )}
                                            </Button>
                                        </Box>
                                        <Divider />
                                        <Typography variant="body2" color="text.secondary" mb={1}>
                                            {dAct.optionB}
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            startIcon={<AddCircleOutlineIcon />}
                                            disabled={!deviceId.trim()}
                                            onClick={() =>
                                                router.push(
                                                    `/${lang}/dashboard/profiles/new?tagId=${encodeURIComponent(deviceId.trim())}`
                                                )
                                            }
                                        >
                                            {dAct.createNew}
                                        </Button>
                                    </Box>
                                )}
                            </>
                        )}
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}
