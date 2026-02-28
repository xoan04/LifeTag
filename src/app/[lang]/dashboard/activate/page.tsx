'use client';
import { useState, useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent, TextField, MenuItem, CircularProgress, IconButton } from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import NfcIcon from '@mui/icons-material/Nfc';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import TagIcon from '@mui/icons-material/Tag';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useRouter } from 'next/navigation';
import { mockProfiles } from '@/data/mockData';
import { Profile } from '@/types/profile';

export default function ActivateDevice() {
    const router = useRouter();
    const [deviceId, setDeviceId] = useState('');
    const [selectedProfileId, setSelectedProfileId] = useState('');
    const [isScannerEnabled, setIsScannerEnabled] = useState(false);
    const [inputMode, setInputMode] = useState<'automatic' | 'manual'>('automatic');
    const [isScanning, setIsScanning] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setIsScannerEnabled(process.env.NEXT_PUBLIC_ENABLE_SCANNER === 'true');
        setInputMode(process.env.NEXT_PUBLIC_ENABLE_SCANNER === 'true' ? 'automatic' : 'manual');
    }, []);

    const handleSimulateScan = (type: 'QR' | 'NFC') => {
        setIsScanning(true);
        // Simulate scanning delay
        setTimeout(() => {
            const randomId = Math.random().toString(36).substring(2, 8).toUpperCase();
            setDeviceId(randomId);
            setIsScanning(false);
            setInputMode('manual'); // Switch to manual to show the code and allow profile selection
        }, 1500);
    };

    const handleLinkDevice = () => {
        if (!deviceId || !selectedProfileId) return;
        setLoading(true);

        // In a real app, this would be an API call to append the deviceId to the profile's publicIds array
        setTimeout(() => {
            setLoading(false);
            // Simulate success and redirect back to profiles
            router.push('/dashboard/profiles');
        }, 1000);
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Typography variant="h2" mb={1} textAlign="center">
                Activate LifeTag
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4} textAlign="center">
                Link a new physical band or tag to one of your profiles.
            </Typography>

            <Card sx={{ p: 2 }}>
                <CardContent>
                    {!deviceId && isScannerEnabled && inputMode === 'automatic' ? (
                        <Box display="flex" flexDirection="column" alignItems="center" gap={3} py={4}>
                            <Typography variant="h6" color="text.secondary">
                                Choose a scanning method
                            </Typography>

                            <Box display="flex" gap={2} width="100%">
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="large"
                                    fullWidth
                                    startIcon={isScanning ? <CircularProgress size={20} /> : <QrCodeScannerIcon />}
                                    sx={{ py: 3, display: 'flex', flexDirection: 'column', gap: 1 }}
                                    onClick={() => handleSimulateScan('QR')}
                                    disabled={isScanning}
                                >
                                    Scan QR
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    size="large"
                                    fullWidth
                                    startIcon={isScanning ? <CircularProgress size={20} /> : <NfcIcon />}
                                    sx={{ py: 3, display: 'flex', flexDirection: 'column', gap: 1 }}
                                    onClick={() => handleSimulateScan('NFC')}
                                    disabled={isScanning}
                                >
                                    Scan NFC
                                </Button>
                            </Box>

                            <Button
                                variant="text"
                                startIcon={<KeyboardIcon />}
                                onClick={() => setInputMode('manual')}
                                disabled={isScanning}
                            >
                                Enter Code Manually
                            </Button>
                        </Box>
                    ) : (
                        <Box display="flex" flexDirection="column" gap={4}>
                            {/* Step 1: Device ID */}
                            <Box>
                                <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                                    STEP 1. DEVICE ID
                                </Typography>
                                <TextField
                                    fullWidth
                                    label="Enter the 6-character code"
                                    value={deviceId}
                                    onChange={(e) => setDeviceId(e.target.value.toUpperCase())}
                                    variant="outlined"
                                    placeholder="e.g. A1B2C3"
                                    InputProps={{
                                        startAdornment: <TagIcon color="action" sx={{ mr: 1 }} />
                                    }}
                                />
                                {isScannerEnabled && (
                                    <Box display="flex" justifyContent="flex-end" mt={1}>
                                        <Button
                                            size="small"
                                            onClick={() => {
                                                setDeviceId('');
                                                setInputMode('automatic');
                                            }}
                                        >
                                            Retry Scanner
                                        </Button>
                                    </Box>
                                )}
                            </Box>

                            {/* Step 2: Action */}
                            <Box>
                                <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                                    STEP 2. SELECT ACTION
                                </Typography>

                                <Box display="flex" flexDirection="column" gap={3}>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary" mb={1}>
                                            Option A: Link to an existing profile
                                        </Typography>
                                        <TextField
                                            select
                                            fullWidth
                                            label="Select profile"
                                            value={selectedProfileId}
                                            onChange={(e) => setSelectedProfileId(e.target.value)}
                                            disabled={!deviceId}
                                        >
                                            {mockProfiles.map((profile: Profile) => (
                                                <MenuItem key={profile.id} value={profile.id}>
                                                    {profile.name} ({profile.type === 'HUMAN' ? 'Human' : 'Pet'})
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
                                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Link to Existing Profile'}
                                        </Button>
                                    </Box>

                                    <Box display="flex" alignItems="center" gap={2}>
                                        <Box sx={{ flex: 1, height: '1px', bgcolor: 'divider' }} />
                                        <Typography variant="body2" color="text.secondary">OR</Typography>
                                        <Box sx={{ flex: 1, height: '1px', bgcolor: 'divider' }} />
                                    </Box>

                                    <Box>
                                        <Typography variant="body2" color="text.secondary" mb={1}>
                                            Option B: Create a new profile for this tag
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            size="large"
                                            fullWidth
                                            startIcon={<AddCircleOutlineIcon />}
                                            disabled={!deviceId}
                                            onClick={() => router.push(`/dashboard/profiles/new?tagId=${deviceId}`)}
                                        >
                                            Create New Profile
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
