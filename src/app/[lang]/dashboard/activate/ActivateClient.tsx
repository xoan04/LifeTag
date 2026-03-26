'use client';
import { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, TextField, MenuItem, CircularProgress, Alert } from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import NfcIcon from '@mui/icons-material/Nfc';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import TagIcon from '@mui/icons-material/Tag';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useRouter } from 'next/navigation';
import { mockProfiles } from '@/data/mockData';
import { Profile } from '@/types/profile';
import { ENABLE_SCANNER } from '@/lib/featureFlags';
import { readNfcTagOnce, isWebNfcSupported, classifyNfcFailure } from '@/lib/nfcWeb';

export default function ActivateClient({ dictionary, lang }: { dictionary: any, lang: string }) {
    const router = useRouter();
    const dAct = dictionary.dashboard.activate;
    const [deviceId, setDeviceId] = useState('');
    const [selectedProfileId, setSelectedProfileId] = useState('');
    const [inputMode, setInputMode] = useState<'automatic' | 'manual'>(ENABLE_SCANNER ? 'automatic' : 'manual');
    const [isScanning, setIsScanning] = useState(false);
    const [loading, setLoading] = useState(false);
    const [scanError, setScanError] = useState<string | null>(null);

    const handleScanQR = () => {
        setScanError(null);
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
        if (!isWebNfcSupported()) {
            setScanError(dAct.nfcUnsupported);
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

    const handleLinkDevice = () => {
        if (!deviceId || !selectedProfileId) return;
        setLoading(true);

        // In a real app, this would be an API call to append the deviceId to the profile's publicIds array
        setTimeout(() => {
            setLoading(false);
            // Simulate success and redirect back to profiles
            router.push(`/${lang}/dashboard/profiles`);
        }, 1000);
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
                                    disabled={isScanning}
                                >
                                    {dictionary.dashboard.activate.scanNFC}
                                </Button>
                            </Box>

                            <Button
                                variant="text"
                                startIcon={<KeyboardIcon />}
                                onClick={() => setInputMode('manual')}
                                disabled={isScanning}
                            >
                                {dictionary.dashboard.activate.enterCode}
                            </Button>
                        </Box>
                    ) : (
                        <Box display="flex" flexDirection="column" gap={4}>
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
                                        startAdornment: <TagIcon color="action" sx={{ mr: 1 }} />
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
                                        <TextField
                                            select
                                            fullWidth
                                            label={dictionary.dashboard.activate.selectProfile}
                                            value={selectedProfileId}
                                            onChange={(e) => setSelectedProfileId(e.target.value)}
                                            disabled={!deviceId}
                                        >
                                            {mockProfiles.map((profile: Profile) => (
                                                <MenuItem key={profile.id} value={profile.id}>
                                                    {profile.name} ({profile.type === 'HUMAN' ? dictionary.dashboard.activate.human : dictionary.dashboard.activate.pet})
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            onClick={handleLinkDevice}
                                            disabled={!deviceId || !selectedProfileId || loading}
                                            sx={{ mt: 1 }}
                                        >
                                            {loading ? <CircularProgress size={24} color="inherit" /> : dictionary.dashboard.activate.linkExisting}
                                        </Button>
                                    </Box>

                                    <Box display="flex" alignItems="center" gap={2}>
                                        <Box sx={{ flex: 1, height: '1px', bgcolor: 'divider' }} />
                                        <Typography variant="body2" color="text.secondary">{dictionary.dashboard.activate.or}</Typography>
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
                                            onClick={() => router.push(`/${lang}/dashboard/profiles/new?tagId=${deviceId}`)}
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
