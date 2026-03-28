'use client';

import type { ReactNode } from 'react';
import { Box, Typography, Button, Chip, Stack } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

/** Contenido de la pantalla de emergencia (mismo que en el hero). */
export function HeroPhoneEmergencyScreen({ dictionary, lang }: { dictionary: any; lang: string }) {
    const pm = dictionary.landing.hero.phoneMock;
    const e = dictionary.emergency;
    return (
        <Box
            sx={{
                flex: 1,
                minHeight: 0,
                display: 'flex',
                flexDirection: 'column',
                bgcolor: '#0c0e12',
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    minHeight: 0,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    bgcolor: '#e8eaef',
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    '&::-webkit-scrollbar': { display: 'none' },
                }}
            >
                <Box
                    sx={{
                        background: 'linear-gradient(180deg, #7f1d1d 0%, #5c1010 100%)',
                        borderRadius: '0 0 22px 22px',
                        px: 1.75,
                        pt: 1.5,
                        pb: 2.25,
                        color: '#fff',
                        boxShadow: '0 8px 24px rgba(92,16,16,0.35)',
                    }}
                >
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                        <Stack direction="row" alignItems="center" spacing={0.85}>
                            <Box
                                sx={{
                                    width: 24,
                                    height: 24,
                                    bgcolor: '#fff',
                                    borderRadius: '5px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <LocalHospitalIcon sx={{ fontSize: 15, color: '#b91c1c' }} />
                            </Box>
                            <Typography sx={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em' }}>{pm.kindHuman}</Typography>
                        </Stack>
                        <Box
                            sx={{
                                px: 1.1,
                                py: 0.35,
                                borderRadius: '999px',
                                bgcolor: 'rgba(255,255,255,0.14)',
                                fontSize: 9,
                                fontWeight: 700,
                                color: 'rgba(255,255,255,0.9)',
                                letterSpacing: '0.06em',
                            }}
                        >
                            {lang.toUpperCase()}
                        </Box>
                    </Stack>
                    <Typography sx={{ fontSize: 20, fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em', mb: 1.5 }}>
                        {pm.demoName}
                    </Typography>
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={0.5}
                        sx={{
                            alignSelf: 'flex-start',
                            bgcolor: 'rgba(0,0,0,0.22)',
                            px: 1.1,
                            py: 0.45,
                            borderRadius: '10px',
                        }}
                    >
                        <WaterDropIcon sx={{ fontSize: 14, color: '#fecaca' }} />
                        <Typography sx={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.04em' }}>
                            {e.blood}: {pm.bloodType}
                        </Typography>
                    </Stack>
                </Box>

                <Box sx={{ px: 1.35, pt: 1.35, pb: 1.75, display: 'flex', flexDirection: 'column', gap: 1.15 }}>
                    <Box
                        sx={{
                            borderRadius: '14px',
                            border: '1px solid #fecaca',
                            bgcolor: '#fff5f5',
                            p: 1.35,
                        }}
                    >
                        <Stack direction="row" alignItems="center" spacing={0.65} sx={{ mb: 1 }}>
                            <WarningAmberIcon sx={{ fontSize: 16, color: '#dc2626' }} />
                            <Typography
                                sx={{
                                    fontSize: 10,
                                    fontWeight: 800,
                                    color: '#dc2626',
                                    letterSpacing: '0.06em',
                                }}
                            >
                                {e.allergies}
                            </Typography>
                        </Stack>
                        <Chip
                            label={pm.allergy}
                            size="small"
                            sx={{
                                height: 24,
                                fontSize: 10,
                                fontWeight: 700,
                                bgcolor: '#fee2e2',
                                color: '#991b1b',
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            borderRadius: '14px',
                            border: '1px solid #e2e8f0',
                            bgcolor: '#fff',
                            p: 1.35,
                            boxShadow: '0 1px 3px rgba(15,23,42,0.06)',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 10,
                                fontWeight: 800,
                                color: '#64748b',
                                letterSpacing: '0.1em',
                                mb: 1.1,
                            }}
                        >
                            {e.contactsTitle.toUpperCase()}
                        </Typography>
                        <Button
                            fullWidth
                            disableElevation
                            variant="contained"
                            startIcon={<PhoneIcon sx={{ fontSize: 16 }} />}
                            sx={{
                                bgcolor: '#ef4444',
                                fontSize: 10,
                                fontWeight: 800,
                                py: 1,
                                textTransform: 'none',
                                borderRadius: '12px',
                                letterSpacing: '0.02em',
                                lineHeight: 1.25,
                                '&:hover': { bgcolor: '#dc2626' },
                            }}
                        >
                            {pm.callContact}
                        </Button>
                    </Box>

                    <Box
                        sx={{
                            borderRadius: '14px',
                            border: '1px solid #e2e8f0',
                            bgcolor: '#fff',
                            p: 1.35,
                            boxShadow: '0 1px 3px rgba(15,23,42,0.06)',
                        }}
                    >
                        <Stack direction="row" alignItems="center" spacing={0.65} sx={{ mb: 0.65 }}>
                            <FavoriteIcon sx={{ fontSize: 16, color: '#dc2626' }} />
                            <Typography sx={{ fontSize: 11, fontWeight: 800, color: '#0f172a' }}>{e.human.conditionsTitle}</Typography>
                        </Stack>
                        <Typography sx={{ fontSize: 11, color: '#475569', pl: 0.25, lineHeight: 1.45 }}>• {pm.condition}</Typography>
                    </Box>

                    <Box
                        sx={{
                            borderRadius: '14px',
                            border: '1px solid #e2e8f0',
                            bgcolor: '#fff',
                            p: 1.35,
                            boxShadow: '0 1px 3px rgba(15,23,42,0.06)',
                        }}
                    >
                        <Stack direction="row" alignItems="center" spacing={0.65} sx={{ mb: 0.65 }}>
                            <MedicationOutlinedIcon sx={{ fontSize: 17, color: '#d97706' }} />
                            <Typography sx={{ fontSize: 11, fontWeight: 800, color: '#0f172a' }}>{e.human.medicationsTitle}</Typography>
                        </Stack>
                        <Typography sx={{ fontSize: 11, color: '#475569', pl: 0.25, lineHeight: 1.45 }}>• {pm.medication}</Typography>
                    </Box>

                    <Typography
                        sx={{
                            fontSize: 9,
                            color: '#94a3b8',
                            textAlign: 'center',
                            fontStyle: 'italic',
                            pt: 0.35,
                            lineHeight: 1.4,
                        }}
                    >
                        {pm.footer}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

type LandingPhoneFrameProps = {
    children: ReactNode;
    /** Perspectiva 3D sutil (hero); en solución suele ir plano */
    enable3d?: boolean;
    /** Versión un poco más baja para encajar en la sección solución */
    compact?: boolean;
};

/**
 * Marco físico del teléfono: bisel, barra de estado, isla, área de pantalla e indicador home.
 * Reutilizado en hero y en la sección solución.
 */
export function LandingPhoneFrame({ children, enable3d = true, compact = false }: LandingPhoneFrameProps) {
    const sizing = compact
        ? {
              height: { xs: 'min(50vh, 440px)', sm: 'min(54vh, 480px)' } as const,
              width: {
                  xs: 'min(100%, calc(min(50vh, 440px) * 9 / 19))',
                  sm: 'min(100%, calc(min(54vh, 480px) * 9 / 19))',
              } as const,
              maxWidth: { xs: 'min(100%, 260px)', sm: 'min(100%, 300px)' } as const,
          }
        : {
              height: { xs: 'min(56vh, 500px)', sm: 'min(60vh, 540px)' } as const,
              width: {
                  xs: 'min(100%, calc(min(56vh, 500px) * 9 / 19))',
                  sm: 'min(100%, calc(min(60vh, 540px) * 9 / 19))',
              } as const,
              maxWidth: { xs: 'min(100%, 280px)', sm: 'min(100%, 320px)' } as const,
          };

    return (
        <Box
            className="relative z-[1] mx-auto w-full"
            sx={{
                height: sizing.height,
                width: sizing.width,
                maxWidth: sizing.maxWidth,
                flexShrink: 0,
                transform: enable3d ? { md: 'rotateY(-6deg) rotateX(3deg)' } : undefined,
                transformStyle: enable3d ? 'preserve-3d' : undefined,
                transition: enable3d ? 'transform 0.45s ease' : undefined,
                ...(enable3d
                    ? {
                          '&:hover': { transform: { md: 'rotateY(-3deg) rotateX(1deg) scale(1.015)' } },
                      }
                    : {}),
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    height: '100%',
                    p: '10px',
                    borderRadius: '42px',
                    background: 'linear-gradient(155deg, #454b58 0%, #22262e 35%, #0c0e12 100%)',
                    boxShadow: `
            0 40px 80px -20px rgba(0,0,0,0.9),
            0 0 0 1px rgba(255,255,255,0.07) inset,
            0 1px 0 rgba(255,255,255,0.1) inset
          `,
                }}
            >
                <Box
                    className="pointer-events-none absolute -left-[2px] top-[24%] h-12 w-[2px] rounded-l-sm"
                    sx={{ background: 'linear-gradient(180deg, #5c6370, #252830)', opacity: 0.85 }}
                />
                <Box
                    className="pointer-events-none absolute -right-[2px] top-[20%] h-16 w-[2px] rounded-r-sm"
                    sx={{ background: 'linear-gradient(180deg, #5c6370, #252830)', opacity: 0.85 }}
                />

                <Box
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '34px',
                        overflow: 'hidden',
                        bgcolor: '#07090d',
                        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.65)',
                    }}
                >
                    <Box className="flex shrink-0 items-center justify-between px-4 pt-3 pb-0.5">
                        <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.92)', fontFeatureSettings: '"tnum"' }}>
                            9:41
                        </Typography>
                        <Box
                            sx={{
                                width: 16,
                                height: 10,
                                border: '1.5px solid rgba(255,255,255,0.4)',
                                borderRadius: '2px',
                                position: 'relative',
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    right: -2.5,
                                    top: 2.5,
                                    width: 1.5,
                                    height: 3.5,
                                    bgcolor: 'rgba(255,255,255,0.3)',
                                    borderRadius: '0 1px 1px 0',
                                },
                            }}
                        />
                    </Box>

                    <Box className="flex shrink-0 justify-center pb-1.5 pt-1">
                        <Box
                            sx={{
                                width: 88,
                                height: 26,
                                borderRadius: '14px',
                                bgcolor: '#000',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.5)',
                            }}
                        />
                    </Box>

                    {children}

                    <Box className="flex shrink-0 justify-center pb-2 pt-0.5">
                        <Box sx={{ width: 100, height: 4, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.16)' }} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
