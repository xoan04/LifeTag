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
    Stack,
    Divider,
} from '@mui/material';
import NfcIcon from '@mui/icons-material/Nfc';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import TagIcon from '@mui/icons-material/Tag';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useRouter } from 'next/navigation';
import { Profile } from '@/models/profile';
import { ENABLE_SCANNER } from '@/lib/featureFlags';
import {
    readNfcTagOnce,
    isWebNfcSupported,
    isWebNfcWriteSupported,
    isAppleMobileWeb,
    classifyNfcFailure,
    normalizeNfcDeviceToken,
    tryWriteNfcUrlRecord,
} from '@/lib/nfcWeb';
import { ProfileUseCases } from '@/useCases/profileUseCases';
import { DeviceUseCases } from '@/useCases/deviceUseCases';
import { NFC_FORM_FACTORS, type NfcFormFactor } from '@/models/device';

/**
 * Solo vinculación de etiquetas NFC físicas.
 * El QR de la página pública se muestra en cada tarjeta de perfil (no es un dispositivo registrado).
 */
export default function ActivateClient({ dictionary, lang }: { dictionary: any; lang: string }) {
    const router = useRouter();
    const dAct = dictionary.dashboard.activate;
    const dDevices = dictionary.devices;

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
    const [nfcWriteError, setNfcWriteError] = useState<string | null>(null);
    const [pendingPublicUrl, setPendingPublicUrl] = useState<string | null>(null);
    const [formFactor, setFormFactor] = useState<NfcFormFactor>('NFC_BAND');

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
        const token = normalizeNfcDeviceToken(deviceId);
        setLoading(true);
        setLinkError(null);
        setNfcWriteError(null);
        setPendingPublicUrl(null);
        const publicUrl =
            typeof window !== 'undefined'
                ? `${window.location.origin}/${lang}/id/${selectedProfileId}`
                : `/${lang}/id/${selectedProfileId}`;
        try {
            await DeviceUseCases.registerAndActivate(token, selectedProfileId, formFactor);

            if (isWebNfcWriteSupported()) {
                const ok = await tryWriteNfcUrlRecord(publicUrl);
                if (!ok) {
                    setPendingPublicUrl(publicUrl);
                    setNfcWriteError(dAct.nfcWriteFailed);
                    return;
                }
            }

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

    const handleRetryNfcWrite = async () => {
        if (!pendingPublicUrl) return;
        setLoading(true);
        setNfcWriteError(null);
        try {
            const ok = await tryWriteNfcUrlRecord(pendingPublicUrl);
            if (ok) {
                setPendingPublicUrl(null);
                router.push(`/${lang}/dashboard/profiles`);
            } else {
                setNfcWriteError(dAct.nfcWriteFailed);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSkipNfcWrite = () => {
        setPendingPublicUrl(null);
        setNfcWriteError(null);
        router.push(`/${lang}/dashboard/profiles`);
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
                        <Alert severity="info">{dDevices.activate.nfcHint}</Alert>

                        {!deviceId && ENABLE_SCANNER && inputMode === 'automatic' ? (
                            <Box display="flex" flexDirection="column" alignItems="center" gap={2} py={2}>
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

                                <Box>
                                    <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                                        {dAct.step1}
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        label={dAct.enterCodePlaceholder}
                                        value={deviceId}
                                        onChange={(e) => setDeviceId(e.target.value.toUpperCase())}
                                        placeholder="04:87:A2:B2:B5:51:80"
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
                                                    setLinkError(null);
                                                    setInputMode('automatic');
                                                }}
                                            >
                                                {dAct.retryScanner}
                                            </Button>
                                        </Box>
                                    )}
                                    <TextField
                                        select
                                        fullWidth
                                        label={dDevices.formFactor.label}
                                        value={formFactor}
                                        onChange={(e) => setFormFactor(e.target.value as NfcFormFactor)}
                                        sx={{ mt: 2 }}
                                    >
                                        {NFC_FORM_FACTORS.map((ff) => (
                                            <MenuItem key={ff} value={ff}>
                                                {dDevices.formFactor[ff]}
                                            </MenuItem>
                                        ))}
                                    </TextField>
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
                                    {isWebNfcWriteSupported() && (
                                        <Alert severity="info" sx={{ mb: 2 }}>
                                            {dAct.nfcWriteHint}
                                        </Alert>
                                    )}
                                    {nfcWriteError && (
                                        <Alert
                                            severity="warning"
                                            sx={{ mb: 2 }}
                                            action={
                                                <Stack direction="row" spacing={1} flexWrap="wrap">
                                                    <Button color="inherit" size="small" onClick={() => void handleRetryNfcWrite()}>
                                                        {dAct.nfcRetryWrite}
                                                    </Button>
                                                    <Button color="inherit" size="small" onClick={handleSkipNfcWrite}>
                                                        {dAct.nfcSkipWrite}
                                                    </Button>
                                                </Stack>
                                            }
                                        >
                                            {nfcWriteError}
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
                                                    {profile.name} ({profile.type === 'HUMAN' ? dAct.human : dAct.pet})
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
                                            profiles.length === 0 ||
                                            !!pendingPublicUrl
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
                                            `/${lang}/dashboard/profiles/new?tagId=${encodeURIComponent(
                                                normalizeNfcDeviceToken(deviceId)
                                            )}`
                                        )
                                    }
                                >
                                    {dAct.createNew}
                                </Button>
                            </Box>
                        )}
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}
