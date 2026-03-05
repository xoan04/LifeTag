'use client';
import { useState, useEffect, useCallback } from 'react';
import {
    Box, Typography, Button, Grid, Card, CardContent, Chip, Fab,
    Tab, Tabs, CircularProgress, Alert, Snackbar, Stack, Divider,
    IconButton, Tooltip, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, MenuItem, Select, FormControl, InputLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LaunchIcon from '@mui/icons-material/Launch';
import PetsIcon from '@mui/icons-material/Pets';
import PersonIcon from '@mui/icons-material/Person';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import DevicesIcon from '@mui/icons-material/Devices';
import LinkIcon from '@mui/icons-material/Link';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import NfcIcon from '@mui/icons-material/Nfc';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { useRouter } from 'next/navigation';

import { ProfileUseCases } from '@/useCases/profileUseCases';
import { DeviceUseCases } from '@/useCases/deviceUseCases';
import { Profile } from '@/models/profile';
import { Device } from '@/models/device';
import { ENABLE_SCANNER } from '@/lib/featureFlags';

// ─── Tab panel helper ────────────────────────────────────────────────────────

function TabPanel({ children, value, index }: { children: React.ReactNode; value: number; index: number }) {
    return value === index ? <Box pt={3}>{children}</Box> : null;
}

// ─── Componente principal ────────────────────────────────────────────────────

export default function ProfilesClient({ dictionary, lang }: { dictionary: any; lang: string }) {
    const router = useRouter();
    const dict = dictionary;
    const dProfiles = dict.dashboard.nav;
    const dProfile = dict.profile;
    const dDevices = dict.devices;

    // ── Estado de datos ──────────────────────────────────────────────────────
    const [tab, setTab] = useState(0);
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [devices, setDevices] = useState<Device[]>([]);
    const [loadingProfiles, setLoadingProfiles] = useState(true);
    const [loadingDevices, setLoadingDevices] = useState(true);

    // ── Toast ────────────────────────────────────────────────────────────────
    const [toast, setToast] = useState<{ open: boolean; type: 'success' | 'error'; text: string }>({
        open: false, type: 'success', text: '',
    });
    const showToast = (type: 'success' | 'error', text: string) =>
        setToast({ open: true, type, text });

    // ── Dialog: Activar dispositivo ──────────────────────────────────────────
    const [activateOpen, setActivateOpen] = useState(false);
    const [activateToken, setActivateToken] = useState('');
    const [activateType, setActivateType] = useState<'QR_TAG' | 'NFC_TAG'>('QR_TAG');
    const [activateProfileId, setActivateProfileId] = useState('');
    const [activating, setActivating] = useState(false);

    // ── Estado del Escáner (NEXT_PUBLIC_ENABLE_SCANNER: true = QR/NFC, false = solo input) ──
    const [inputMode, setInputMode] = useState<'automatic' | 'manual'>(ENABLE_SCANNER ? 'automatic' : 'manual');
    const [isScanning, setIsScanning] = useState(false);

    const handleSimulateScan = (type: 'QR' | 'NFC') => {
        setIsScanning(true);
        // Simulate scanning delay
        setTimeout(() => {
            const randomId = Math.random().toString(36).substring(2, 8).toUpperCase();
            setActivateToken(randomId);
            setIsScanning(false);
            setInputMode('manual');
        }, 1500);
    };

    // ── Dialog: Eliminar perfil ──────────────────────────────────────────────
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<Profile | null>(null);
    const [deleting, setDeleting] = useState(false);

    // ── Dialog: Eliminar device ──────────────────────────────────────────────
    const [deleteDeviceOpen, setDeleteDeviceOpen] = useState(false);
    const [deleteDeviceTarget, setDeleteDeviceTarget] = useState<Device | null>(null);
    const [deletingDevice, setDeletingDevice] = useState(false);

    // ── Dialog: Reportar device perdido ─────────────────────────────────────
    const [reportLostOpen, setReportLostOpen] = useState(false);
    const [reportLostTarget, setReportLostTarget] = useState<Device | null>(null);
    const [reportingLost, setReportingLost] = useState(false);

    // ── Cargar datos ─────────────────────────────────────────────────────────
    const loadProfiles = useCallback(async () => {
        setLoadingProfiles(true);
        try {
            setProfiles(await ProfileUseCases.getProfiles());
        } catch {
            showToast('error', dict.auth.login.errorGeneric);
        } finally {
            setLoadingProfiles(false);
        }
    }, [dict]);

    const loadDevices = useCallback(async () => {
        setLoadingDevices(true);
        try {
            setDevices(await DeviceUseCases.getDevices());
        } catch {
            showToast('error', dict.auth.login.errorGeneric);
        } finally {
            setLoadingDevices(false);
        }
    }, [dict]);

    useEffect(() => { loadProfiles(); }, [loadProfiles]);
    useEffect(() => { loadDevices(); }, [loadDevices]);

    // ── Eliminar perfil ───────────────────────────────────────────────────────
    const handleDeleteConfirm = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            await ProfileUseCases.deleteProfile(deleteTarget.id);
            showToast('success', `"${deleteTarget.name}" eliminado.`);
            setDeleteOpen(false);
            setDeleteTarget(null);
            loadProfiles();
        } catch (err: any) {
            showToast('error', err?.message ?? dict.auth.login.errorGeneric);
        } finally {
            setDeleting(false);
        }
    };

    // ── Activar + vincular device ─────────────────────────────────────────────
    const handleActivate = async () => {
        if (!activateToken || !activateProfileId) return;
        setActivating(true);
        try {
            await DeviceUseCases.registerAndActivate(activateToken, activateType, activateProfileId);
            showToast('success', dDevices.activate.successToast);
            setActivateOpen(false);
            setActivateToken('');
            setActivateProfileId('');
            loadDevices();
            loadProfiles();
        } catch (err) {
            showToast('error', DeviceUseCases.resolveErrorMessage(err, {
                ...dDevices.register,
                ...dDevices.activate,
            }));
        } finally {
            setActivating(false);
        }
    };

    // ── Eliminar device ───────────────────────────────────────────────────────
    const handleDeleteDevice = async () => {
        if (!deleteDeviceTarget) return;
        setDeletingDevice(true);
        try {
            await DeviceUseCases.deleteDevice(deleteDeviceTarget.id);
            showToast('success', dDevices.delete.successToast);
            setDeleteDeviceOpen(false);
            setDeleteDeviceTarget(null);
            loadDevices();
            loadProfiles();
        } catch {
            showToast('error', dDevices.delete.errorGeneric);
        } finally {
            setDeletingDevice(false);
        }
    };

    // ── Reportar device como perdido ─────────────────────────────────────────
    const handleReportLost = async () => {
        if (!reportLostTarget) return;
        setReportingLost(true);
        try {
            await DeviceUseCases.reportLost(reportLostTarget.id);
            showToast('success', dDevices.reportLost.successToast);
            setReportLostOpen(false);
            setReportLostTarget(null);
            loadDevices();
        } catch {
            showToast('error', dDevices.reportLost.errorGeneric);
        } finally {
            setReportingLost(false);
        }
    };

    // ─────────────────────────────────────────────────────────────────────────
    return (
        <Box sx={{ position: 'relative', minHeight: '80vh' }}>

            {/* ── Header ── */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
                <Typography variant="h4" fontWeight={700}>{dProfiles.profiles}</Typography>
                <Stack direction="row" spacing={1}>
                    <Button
                        variant="outlined"
                        startIcon={<LinkIcon />}
                        onClick={() => { setActivateOpen(true); }}
                        sx={{ display: { xs: 'none', sm: 'flex' } }}
                    >
                        {dict.dashboard.home.activateDevice}
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => router.push(`/${lang}/dashboard/activate`)}
                        sx={{ display: { xs: 'none', sm: 'flex' } }}
                    >
                        {dict.dashboard.home.addProfile}
                    </Button>
                </Stack>
            </Box>

            {/* ── Tabs ── */}
            <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tab
                    icon={<PersonIcon fontSize="small" />}
                    iconPosition="start"
                    label={dProfiles.profiles}
                    id="tab-profiles"
                />
                <Tab
                    icon={<DevicesIcon fontSize="small" />}
                    iconPosition="start"
                    label={dProfiles.devices}
                    id="tab-devices"
                />
            </Tabs>

            {/* ═══ TAB 0: PROFILES ═══ */}
            <TabPanel value={tab} index={0}>
                {loadingProfiles ? (
                    <Box display="flex" justifyContent="center" py={6}><CircularProgress /></Box>
                ) : profiles.length === 0 ? (
                    <Box textAlign="center" py={8}>
                        <Typography color="text.secondary" mb={2}>{dDevices.empty}</Typography>
                        <Button variant="contained" startIcon={<AddIcon />} onClick={() => router.push(`/${lang}/dashboard/activate`)}>
                            {dict.dashboard.home.addProfile}
                        </Button>
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {profiles.map(profile => {
                            const isHuman = profile.type === 'HUMAN';
                            const devicesLinked = profile.devices?.length ?? 0;
                            const firstToken = profile.devices?.[0]?.deviceToken;

                            return (
                                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={profile.id}>
                                    <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'box-shadow .2s', '&:hover': { boxShadow: 4 } }}>
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            {/* ── nombre + estado ── */}
                                            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1.5}>
                                                <Box display="flex" alignItems="center" gap={1}>
                                                    {isHuman
                                                        ? <PersonIcon color="primary" />
                                                        : <PetsIcon sx={{ color: '#F57C00' }} />
                                                    }
                                                    <Typography variant="h6" fontWeight={700} lineHeight={1.2}>
                                                        {profile.name}
                                                    </Typography>
                                                </Box>
                                                <Chip
                                                    label={profile.isActive ? 'Activo' : 'Inactivo'}
                                                    color={profile.isActive ? 'success' : 'default'}
                                                    size="small"
                                                />
                                            </Box>

                                            {/* ── tipo ── */}
                                            <Typography variant="body2" color="text.secondary" mb={1}>
                                                {isHuman ? dProfile.human : dProfile.pet}
                                            </Typography>

                                            {/* ── info específica ── */}
                                            {isHuman && profile.bloodType && (
                                                <Chip label={`${dProfile.fields.bloodType}: ${profile.bloodType}`} size="small" variant="outlined" sx={{ mb: 1, mr: 0.5 }} />
                                            )}
                                            {!isHuman && profile.species && (
                                                <Chip label={profile.species} size="small" variant="outlined" sx={{ mb: 1, mr: 0.5 }} />
                                            )}

                                            <Divider sx={{ my: 1.5 }} />

                                            {/* ── dispositivos ── */}
                                            <Typography variant="caption" color="text.secondary">
                                                {dProfile.devices}: <strong>{devicesLinked}</strong>
                                            </Typography>
                                        </CardContent>

                                        {/* ── acciones ── */}
                                        <Box display="flex" gap={1} p={2} pt={0}>
                                            <Tooltip title="Edit">
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    startIcon={<EditIcon />}
                                                    onClick={() => router.push(`/${lang}/dashboard/profiles/${profile.id}`)}
                                                    fullWidth
                                                >
                                                    {dProfile.fields.name !== undefined ? 'Editar' : 'Edit'}
                                                </Button>
                                            </Tooltip>
                                            {firstToken && (
                                                <Tooltip title="Ver perfil público">
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        size="small"
                                                        startIcon={<LaunchIcon />}
                                                        onClick={() => window.open(`/${lang}/id/${firstToken}`, '_blank')}
                                                        fullWidth
                                                    >
                                                        Ver
                                                    </Button>
                                                </Tooltip>
                                            )}
                                            <Tooltip title="Eliminar">
                                                <IconButton
                                                    size="small"
                                                    color="error"
                                                    onClick={() => { setDeleteTarget(profile); setDeleteOpen(true); }}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                )}
            </TabPanel>

            {/* ═══ TAB 1: DEVICES ═══ */}
            <TabPanel value={tab} index={1}>
                {loadingDevices ? (
                    <Box display="flex" justifyContent="center" py={6}><CircularProgress /></Box>
                ) : devices.length === 0 ? (
                    <Box textAlign="center" py={8}>
                        <DevicesIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                        <Typography color="text.secondary" mb={2}>{dDevices.empty}</Typography>
                        <Button variant="contained" startIcon={<LinkIcon />} onClick={() => setActivateOpen(true)}>
                            {dDevices.emptyAction}
                        </Button>
                    </Box>
                ) : (
                    <Stack spacing={2}>
                        {devices.map(device => (
                            <Card variant="outlined" key={device.id} sx={{ transition: 'box-shadow .2s', '&:hover': { boxShadow: 3 } }}>
                                <CardContent>
                                    <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1}>
                                        {/* ── Info izquierda ── */}
                                        <Box display="flex" alignItems="center" gap={1.5}>
                                            <QrCodeScannerIcon color="action" />
                                            <Box>
                                                <Typography fontWeight={700}>{device.deviceToken}</Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {dDevices.type[device.deviceType] ?? device.deviceType}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        {/* ── Chips + acciones derecha ── */}
                                        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                                            <Chip
                                                label={dDevices.status[device.status] ?? device.status}
                                                color={device.status === 'ACTIVE' ? 'success' : device.status === 'UNACTIVATED' ? 'warning' : 'default'}
                                                size="small"
                                            />
                                            {device.profile && (
                                                <Chip
                                                    icon={device.profile.type === 'HUMAN' ? <PersonIcon fontSize="small" /> : <PetsIcon fontSize="small" />}
                                                    label={device.profile.name}
                                                    size="small"
                                                    variant="outlined"
                                                    color="primary"
                                                />
                                            )}
                                            {!device.profile && (
                                                <Chip label={dDevices.notLinked} size="small" color="default" />
                                            )}

                                            {/* ── Botones de acción ── */}
                                            <Tooltip title={dDevices.reportLost.button}>
                                                <IconButton
                                                    size="small"
                                                    color="warning"
                                                    onClick={() => { setReportLostTarget(device); setReportLostOpen(true); }}
                                                    disabled={device.status !== 'ACTIVE'}
                                                >
                                                    <ReportProblemIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title={dDevices.delete.button}>
                                                <IconButton
                                                    size="small"
                                                    color="error"
                                                    onClick={() => { setDeleteDeviceTarget(device); setDeleteDeviceOpen(true); }}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </Stack>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>
                )}
            </TabPanel>

            {/* ═══ FABs móvil ═══ */}
            <Fab
                color="primary"
                aria-label="add-profile"
                sx={{ position: 'fixed', bottom: 88, right: 24, display: { xs: 'flex', sm: 'none' } }}
                onClick={() => router.push(`/${lang}/dashboard/activate`)}
            >
                <AddIcon />
            </Fab>
            <Fab
                color="secondary"
                aria-label="activate-device"
                sx={{ position: 'fixed', bottom: 24, right: 24, display: { xs: 'flex', sm: 'none' } }}
                onClick={() => setActivateOpen(true)}
            >
                <LinkIcon />
            </Fab>

            {/* ═══ Dialog: Activar + vincular device ═══ */}
            <Dialog open={activateOpen} onClose={() => setActivateOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle>{dDevices.activate.title}</DialogTitle>
                <DialogContent>
                    {!activateToken && ENABLE_SCANNER && inputMode === 'automatic' ? (
                        <Box display="flex" flexDirection="column" alignItems="center" gap={3} pt={2}>
                            <Typography variant="body2" color="text.secondary" textAlign="center">
                                {dict.dashboard?.activate?.chooseMethod || 'Selecciona un método de escaneo'}
                            </Typography>
                            <Box display="flex" gap={2} width="100%">
                                <Button
                                    variant="outlined" color="primary" size="large" fullWidth
                                    startIcon={isScanning ? <CircularProgress size={20} /> : <QrCodeScannerIcon />}
                                    sx={{ py: 2, display: 'flex', flexDirection: 'column', gap: 1 }}
                                    onClick={() => handleSimulateScan('QR')}
                                    disabled={isScanning}
                                >
                                    {dict.dashboard?.activate?.scanQR || 'QR'}
                                </Button>
                                <Button
                                    variant="outlined" color="secondary" size="large" fullWidth
                                    startIcon={isScanning ? <CircularProgress size={20} /> : <NfcIcon />}
                                    sx={{ py: 2, display: 'flex', flexDirection: 'column', gap: 1 }}
                                    onClick={() => handleSimulateScan('NFC')}
                                    disabled={isScanning}
                                >
                                    {dict.dashboard?.activate?.scanNFC || 'NFC'}
                                </Button>
                            </Box>
                            <Button
                                variant="text" startIcon={<KeyboardIcon />} disabled={isScanning}
                                onClick={() => setInputMode('manual')}
                            >
                                {dict.dashboard?.activate?.enterCode || 'Ingresar código manualmente'}
                            </Button>
                        </Box>
                    ) : (
                        <Stack spacing={3} mt={1}>
                            <TextField
                                label={dDevices.register.tokenLabel}
                                placeholder={dDevices.register.tokenPlaceholder}
                                value={activateToken}
                                onChange={e => setActivateToken(e.target.value.toUpperCase())}
                                fullWidth
                                autoFocus
                            />
                            {ENABLE_SCANNER && (
                                <Box display="flex" justifyContent="flex-end" mt={-2}>
                                    <Button
                                        size="small"
                                        onClick={() => {
                                            setActivateToken('');
                                            setInputMode('automatic');
                                        }}
                                    >
                                        {dict.dashboard?.activate?.retryScanner ?? 'Reintentar escáner'}
                                    </Button>
                                </Box>
                            )}
                            <FormControl fullWidth>
                                <InputLabel>{dDevices.register.typeLabel}</InputLabel>
                                <Select
                                    value={activateType}
                                    label={dDevices.register.typeLabel}
                                    onChange={e => setActivateType(e.target.value as 'QR_TAG' | 'NFC_TAG')}
                                >
                                    <MenuItem value="QR_TAG">{dDevices.type.QR_TAG}</MenuItem>
                                    <MenuItem value="NFC_TAG">{dDevices.type.NFC_TAG}</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel>{dDevices.activate.profileLabel}</InputLabel>
                                <Select
                                    value={activateProfileId}
                                    label={dDevices.activate.profileLabel}
                                    onChange={e => setActivateProfileId(e.target.value)}
                                    disabled={loadingProfiles || profiles.length === 0}
                                >
                                    {profiles.map(p => (
                                        <MenuItem key={p.id} value={p.id}>
                                            {p.type === 'HUMAN' ? '👤' : '🐾'} {p.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Stack>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setActivateOpen(false)} color="inherit">
                        {dict.account.profile.cancel}
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleActivate}
                        disabled={activating || !activateToken || !activateProfileId}
                    >
                        {activating ? <CircularProgress size={22} /> : dDevices.activate.submit}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* ═══ Dialog: Confirmar eliminar perfil ═══ */}
            <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle>¿Eliminar perfil?</DialogTitle>
                <DialogContent>
                    <Typography>
                        Se eliminará <strong>{deleteTarget?.name}</strong> y todos sus dispositivos vinculados. Esta acción no se puede deshacer.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteOpen(false)} color="inherit">
                        {dict.account.profile.cancel}
                    </Button>
                    <Button variant="contained" color="error" onClick={handleDeleteConfirm} disabled={deleting}>
                        {deleting ? <CircularProgress size={22} /> : 'Eliminar'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* ═══ Dialog: Confirmar eliminar device ═══ */}
            <Dialog open={deleteDeviceOpen} onClose={() => setDeleteDeviceOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle>{dDevices.delete.confirm}</DialogTitle>
                <DialogContent>
                    <Typography>{dDevices.delete.confirmDesc}</Typography>
                    {deleteDeviceTarget && (
                        <Typography mt={1} fontWeight={700}>{deleteDeviceTarget.deviceToken}</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDeviceOpen(false)} color="inherit">
                        {dict.account.profile.cancel}
                    </Button>
                    <Button variant="contained" color="error" onClick={handleDeleteDevice} disabled={deletingDevice}>
                        {deletingDevice ? <CircularProgress size={22} /> : dDevices.delete.button}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* ═══ Dialog: Confirmar reportar perdido ═══ */}
            <Dialog open={reportLostOpen} onClose={() => setReportLostOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle>{dDevices.reportLost.button}</DialogTitle>
                <DialogContent>
                    <Typography>
                        Se marcará <strong>{reportLostTarget?.deviceToken}</strong> como perdido. La página de emergencia mostrará un aviso de dispositivo perdido.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setReportLostOpen(false)} color="inherit">
                        {dict.account.profile.cancel}
                    </Button>
                    <Button variant="contained" color="warning" onClick={handleReportLost} disabled={reportingLost}>
                        {reportingLost ? <CircularProgress size={22} /> : dDevices.reportLost.button}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* ═══ Toast ═══ */}
            <Snackbar
                open={toast.open}
                autoHideDuration={4000}
                onClose={() => setToast(t => ({ ...t, open: false }))}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity={toast.type} onClose={() => setToast(t => ({ ...t, open: false }))} variant="filled">
                    {toast.text}
                </Alert>
            </Snackbar>
        </Box>
    );
}
