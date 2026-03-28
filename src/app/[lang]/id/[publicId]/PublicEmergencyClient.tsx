'use client';

import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import PhoneIcon from '@mui/icons-material/Phone';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PetsIcon from '@mui/icons-material/Pets';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import { motion } from 'framer-motion';
import { EmergencyProfile } from '@/models/emergencyProfile';
import { PublicProfileUseCases } from '@/useCases/publicProfileUseCases';

type LoadError = 'not_found' | 'inactive' | 'lost' | 'generic' | null;

/** Rojos alineados con la vista móvil LifeTag (hero / perfil público) */
const R = {
    headerFrom: '#7f1d1d',
    headerTo: '#5c1010',
    primaryBtn: '#b91c1c',
    primaryBtnHi: '#dc2626',
} as const;

function translateRelation(relation: string | null, lang: string): string {
    if (!relation) return '';
    const key = relation.trim().toLowerCase();
    const mapEs: Record<string, string> = {
        wife: 'Esposa',
        husband: 'Esposo',
        brother: 'Hermano',
        sister: 'Hermana',
        mother: 'Madre',
        father: 'Padre',
        son: 'Hijo',
        daughter: 'Hija',
        friend: 'Amigo(a)',
        partner: 'Pareja',
        grandfather: 'Abuelo',
        grandmother: 'Abuela',
        owner_m: 'Dueño',
        owner_f: 'Dueña',
    };
    const mapEn: Record<string, string> = {
        wife: 'Wife',
        husband: 'Husband',
        brother: 'Brother',
        sister: 'Sister',
        mother: 'Mother',
        father: 'Father',
        son: 'Son',
        daughter: 'Daughter',
        friend: 'Friend',
        partner: 'Partner',
        grandfather: 'Grandfather',
        grandmother: 'Grandmother',
        owner_m: 'Owner',
        owner_f: 'Owner',
    };
    return (lang === 'es' ? mapEs[key] : mapEn[key]) ?? relation;
}

function SkeletonEmergencyView() {
    return (
        <div className="min-h-screen animate-pulse bg-[#e8eaef]">
            <div
                className="h-48 rounded-b-[1.75rem] shadow-lg"
                style={{ background: `linear-gradient(180deg, ${R.headerFrom} 0%, ${R.headerTo} 100%)` }}
            />
            <div className="mx-auto mt-4 w-full max-w-md space-y-3 px-4 pb-10">
                <div className="h-28 rounded-2xl bg-white/80 shadow-sm ring-1 ring-slate-200/80" />
                <div className="h-32 rounded-2xl bg-white/80 shadow-sm ring-1 ring-slate-200/80" />
                <div className="h-24 rounded-2xl bg-white/80 shadow-sm ring-1 ring-slate-200/80" />
            </div>
        </div>
    );
}

function StatusBanner({ title, desc }: { title: string; desc: string }) {
    return (
        <div className="mx-auto mt-10 w-full max-w-md rounded-2xl border border-amber-200/90 bg-amber-50 p-5 shadow-sm">
            <p className="text-lg font-extrabold text-amber-950">{title}</p>
            <p className="mt-2 text-sm leading-relaxed text-amber-900/90">{desc}</p>
        </div>
    );
}

function EmergencyHeader({ profile, d, lang }: { profile: EmergencyProfile; d: any; lang: string }) {
    const isHuman = profile.type === 'HUMAN';
    return (
        <header
            className="relative z-0 overflow-hidden rounded-b-[1.75rem] px-4 pb-6 pt-8 text-white shadow-[0_10px_28px_rgba(92,16,16,0.35)]"
            style={{ background: `linear-gradient(180deg, ${R.headerFrom} 0%, ${R.headerTo} 100%)` }}
        >
            <button
                type="button"
                onClick={() => {
                    window.location.href = `/${lang === 'en' ? 'es' : 'en'}${window.location.pathname.replace(`/${lang}`, '')}`;
                }}
                className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm transition hover:bg-white/20"
                aria-label={d.switchLang ?? 'Language'}
            >
                {lang === 'en' ? 'EN' : 'ES'}
            </button>

            <div className="mx-auto w-full max-w-md pr-14">
                <div className="mb-4 flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white shadow-sm">
                        {isHuman ? (
                            <LocalHospitalIcon sx={{ fontSize: 17, color: R.primaryBtnHi }} />
                        ) : (
                            <PetsIcon sx={{ fontSize: 17, color: R.primaryBtnHi }} />
                        )}
                    </span>
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-red-100/95">
                        {isHuman ? (lang === 'es' ? 'Humano' : 'Human') : lang === 'es' ? 'Mascota' : 'Pet'}
                    </span>
                </div>

                <h1 className="text-[1.65rem] font-black leading-tight tracking-tight sm:text-3xl">{profile.name}</h1>

                {isHuman && profile.bloodType && (
                    <div className="mt-4 inline-flex items-center gap-2 rounded-[10px] bg-black/25 px-3 py-2">
                        <WaterDropIcon sx={{ fontSize: 18, color: '#fecaca' }} />
                        <span className="text-sm font-extrabold tracking-wide">
                            {d.blood}: {profile.bloodType}
                        </span>
                    </div>
                )}
            </div>
        </header>
    );
}

function AllergyAlert({ allergies, d }: { allergies: string[]; d: any }) {
    if (!allergies?.length) return null;
    return (
        <section className="rounded-2xl border border-red-200/90 bg-[#fff5f5] p-4 shadow-sm ring-1 ring-red-100/60">
            <div className="mb-3 flex items-center gap-2 text-red-700">
                <WarningAmberIcon sx={{ fontSize: 20 }} />
                <p className="text-xs font-extrabold uppercase tracking-[0.08em]">{d.allergies}</p>
            </div>
            <div className="flex flex-wrap gap-2">
                {allergies.map((item, idx) => (
                    <span
                        key={`${item}-${idx}`}
                        className="rounded-lg border border-red-200/80 bg-red-100/90 px-3 py-1.5 text-sm font-bold text-red-900"
                    >
                        {item}
                    </span>
                ))}
            </div>
        </section>
    );
}

function EmergencyContacts({
    profile,
    d,
    lang,
}: {
    profile: EmergencyProfile;
    d: any;
    lang: string;
}) {
    const isHuman = profile.type === 'HUMAN';
    const [notifying, setNotifying] = useState(false);
    const ec1Relation = translateRelation(profile.emergencyContact1_relation, lang);
    const ec2Relation = translateRelation(profile.emergencyContact2_relation, lang);

    const triggerNotifyState = () => {
        setNotifying(true);
        window.setTimeout(() => setNotifying(false), 2000);
    };

    const primaryBtn =
        'flex min-h-[3rem] w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-center text-sm font-extrabold uppercase tracking-wide text-white shadow-lg transition active:scale-[0.98]';
    const primaryStyle = {
        background: `linear-gradient(135deg, ${R.primaryBtnHi} 0%, ${R.primaryBtn} 100%)`,
        boxShadow: '0 8px 24px rgba(185, 28, 28, 0.35)',
    };

    return (
        <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.06)]">
            <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-500">{d.contactsTitle}</p>
            <div className="space-y-2.5">
                {isHuman ? (
                    <>
                        {profile.emergencyContact1_phone && (
                            <motion.a
                                whileTap={{ scale: 0.98 }}
                                href={`tel:${profile.emergencyContact1_phone}`}
                                onClick={triggerNotifyState}
                                aria-label={`call-${profile.emergencyContact1_name ?? 'contact-1'}`}
                                className={primaryBtn}
                                style={primaryStyle}
                            >
                                <PhoneIcon fontSize="small" />
                                <span className="leading-tight">
                                    {d.call} {ec1Relation ? `${ec1Relation.toUpperCase()}:` : ''} {profile.emergencyContact1_name ?? ''}
                                </span>
                            </motion.a>
                        )}
                        {profile.emergencyContact2_phone && (
                            <motion.a
                                whileTap={{ scale: 0.98 }}
                                href={`tel:${profile.emergencyContact2_phone}`}
                                onClick={triggerNotifyState}
                                aria-label="call-contact-2"
                                className="flex min-h-[3rem] w-full items-center justify-center gap-2 rounded-xl border-2 border-red-300/90 bg-red-50/50 px-4 py-3 text-center text-sm font-extrabold uppercase tracking-wide text-red-800 transition hover:bg-red-50 active:scale-[0.98]"
                            >
                                <PhoneIcon fontSize="small" />
                                {d.call} {ec2Relation.toUpperCase()}
                            </motion.a>
                        )}
                    </>
                ) : (
                    <>
                        {profile.ownerPhone && (
                            <>
                                <motion.a
                                    whileTap={{ scale: 0.98 }}
                                    href={`tel:${profile.ownerPhone}`}
                                    onClick={triggerNotifyState}
                                    aria-label="call-owner"
                                    className={primaryBtn}
                                    style={primaryStyle}
                                >
                                    <PhoneIcon fontSize="small" />
                                    {d.callOwner}
                                </motion.a>
                                <motion.a
                                    whileTap={{ scale: 0.98 }}
                                    href={`https://wa.me/${profile.ownerPhone.replace(/\D/g, '')}`}
                                    aria-label="whatsapp-owner"
                                    className="flex min-h-[3rem] w-full items-center justify-center gap-2 rounded-xl border-2 border-emerald-300/80 bg-emerald-50/40 px-4 py-3 text-sm font-extrabold text-emerald-800 transition hover:bg-emerald-50/70 active:scale-[0.98]"
                                >
                                    <WhatsAppIcon fontSize="small" />
                                    {d.whatsappOwner}
                                </motion.a>
                            </>
                        )}
                    </>
                )}
            </div>
            {notifying && (
                <p className="mt-3 text-center text-xs font-semibold text-slate-500">
                    {lang === 'es' ? 'Notificando al propietario…' : 'Notifying owner…'}
                </p>
            )}
        </section>
    );
}

function ItemChips({ items, emptyLabel }: { items: string[]; emptyLabel: string }) {
    const list = items.length ? items : [emptyLabel];
    const isEmpty = !items.length;
    return (
        <div className="flex flex-wrap gap-2">
            {list.map((text, i) => (
                <span
                    key={`${text}-${i}`}
                    className={
                        isEmpty
                            ? 'rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium italic text-slate-500'
                            : 'rounded-lg border border-slate-200/90 bg-slate-50/90 px-3 py-2 text-sm font-semibold text-slate-800'
                    }
                >
                    {text}
                </span>
            ))}
        </div>
    );
}

function InfoSection({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
    return (
        <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.05)]">
            <div className="mb-3 flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-700 ring-1 ring-red-100/80">
                    {icon}
                </span>
                <h2 className="text-sm font-extrabold leading-snug text-slate-900">{title}</h2>
            </div>
            {children}
        </section>
    );
}

function MedicalInfo({ profile, d }: { profile: EmergencyProfile; d: any }) {
    const isHuman = profile.type === 'HUMAN';
    return (
        <div className="space-y-3">
            {isHuman ? (
                <>
                    <InfoSection
                        icon={<FavoriteIcon sx={{ fontSize: 20 }} />}
                        title={d.human.conditionsTitle}
                    >
                        <ItemChips items={profile.medicalConditions} emptyLabel={d.human.none} />
                    </InfoSection>
                    <InfoSection
                        icon={<MedicationOutlinedIcon sx={{ fontSize: 21, color: '#b91c1c' }} />}
                        title={d.human.medicationsTitle}
                    >
                        <ItemChips items={profile.medications} emptyLabel={d.human.none} />
                    </InfoSection>
                </>
            ) : (
                <>
                    <InfoSection icon={<PetsIcon sx={{ fontSize: 20 }} />} title={d.pet.detailsTitle}>
                        <p className="text-sm text-slate-700">
                            <span className="font-bold text-slate-900">{d.pet.breedSpecies}</span>{' '}
                            {[profile.breed, profile.species].filter(Boolean).join(' · ') || '—'}
                        </p>
                        {profile.targetReward && (
                            <p className="mt-3 rounded-lg border border-amber-200/90 bg-amber-50 px-3 py-2 text-sm font-bold text-amber-950">
                                {d.pet.reward}: {profile.targetReward}
                            </p>
                        )}
                    </InfoSection>
                    <InfoSection icon={<LocalHospitalIcon sx={{ fontSize: 20 }} />} title={d.pet.vetTitle}>
                        {profile.veterinarian_name && <p className="text-sm font-medium text-slate-800">{profile.veterinarian_name}</p>}
                        {profile.veterinarian_phone && (
                            <a
                                href={`tel:${profile.veterinarian_phone}`}
                                className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-slate-50/80 px-4 text-sm font-bold text-slate-800 transition hover:bg-slate-100"
                            >
                                <PhoneIcon fontSize="small" />
                                {profile.veterinarian_phone}
                            </a>
                        )}
                        {profile.vaccinationStatus && (
                            <p className="mt-3 text-sm text-slate-600">
                                <span className="font-bold text-slate-800">{d.pet.vaccination}:</span> {profile.vaccinationStatus}
                            </p>
                        )}
                    </InfoSection>
                </>
            )}
            <p className="px-1 pt-1 text-center text-[11px] font-medium italic text-slate-500">{d.footerNote}</p>
        </div>
    );
}

export default function PublicEmergencyClient({
    dictionary,
    lang,
    publicId,
}: {
    dictionary: any;
    lang: string;
    publicId: string;
}) {
    const d = dictionary.emergency;
    const [profile, setProfile] = useState<EmergencyProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<LoadError>(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setError(null);
        setProfile(null);

        PublicProfileUseCases.getPublicEmergencyProfile({ publicId })
            .then((data) => {
                if (cancelled) return;
                if (!data.isActive) {
                    setError('inactive');
                } else {
                    setProfile(data);
                }
            })
            .catch((err) => {
                if (cancelled) return;
                const msg = (err?.message ?? '').toLowerCase();
                if (msg.includes('404') || msg.includes('not found')) setError('not_found');
                else if (msg.includes('lost')) setError('lost');
                else if (msg.includes('inactive') || msg.includes('disabled')) setError('inactive');
                else setError('generic');
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [publicId]);

    const statusText = useMemo(() => {
        if (error === 'inactive') return { title: d.inactive.title, desc: d.inactive.disabled };
        if (error === 'lost') return { title: d.inactive.title, desc: d.inactive.lost };
        return null;
    }, [error, d]);

    if (loading) return <SkeletonEmergencyView />;

    if (error === 'not_found' || error === 'generic') {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#e8eaef] p-4">
                <div className="w-full max-w-sm rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-[0_8px_32px_rgba(15,23,42,0.08)]">
                    <LocalHospitalIcon className="!mb-3 !text-6xl" sx={{ color: R.primaryBtnHi }} />
                    <h2 className="text-xl font-black text-slate-900">{d.notFound.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{d.notFound.desc}</p>
                </div>
            </div>
        );
    }

    if (statusText) {
        return (
            <div className="min-h-screen bg-[#e8eaef] px-4 py-10">
                <StatusBanner title={statusText.title} desc={statusText.desc} />
            </div>
        );
    }

    if (!profile) return null;

    return (
        <main className="min-h-screen bg-[#e8eaef] pb-8">
            <EmergencyHeader profile={profile} d={d} lang={lang} />

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                className="relative z-10 mx-auto mt-4 w-full max-w-md space-y-3 px-4"
            >
                {profile.type === 'HUMAN' && <AllergyAlert allergies={profile.allergies} d={d} />}

                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}>
                    <EmergencyContacts profile={profile} d={d} lang={lang} />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
                    <MedicalInfo profile={profile} d={d} />
                </motion.div>
            </motion.div>
        </main>
    );
}
