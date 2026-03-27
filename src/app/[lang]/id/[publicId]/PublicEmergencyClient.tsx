'use client';

import { useEffect, useMemo, useState } from 'react';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import PhoneIcon from '@mui/icons-material/Phone';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PetsIcon from '@mui/icons-material/Pets';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { motion } from 'framer-motion';
import { EmergencyUseCases } from '@/useCases/emergencyUseCases';
import { EmergencyProfile } from '@/models/emergencyProfile';

type LoadError = 'not_found' | 'inactive' | 'lost' | 'generic' | null;

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
        <div className="min-h-screen bg-slate-100 animate-pulse">
            <div className="h-52 bg-slate-800 rounded-b-3xl" />
            <div className="mx-auto -mt-8 w-full max-w-md space-y-3 px-4 pb-10">
                <div className="h-24 rounded-2xl bg-slate-200" />
                <div className="h-36 rounded-2xl bg-slate-200" />
                <div className="h-24 rounded-2xl bg-slate-200" />
                <div className="h-24 rounded-2xl bg-slate-200" />
            </div>
        </div>
    );
}

function StatusBanner({ title, desc }: { title: string; desc: string }) {
    return (
        <div className="mx-auto mt-10 w-full max-w-md rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-lg font-extrabold text-amber-900">{title}</p>
            <p className="mt-1 text-sm text-amber-800">{desc}</p>
        </div>
    );
}

function EmergencyHeader({ profile, d, lang }: { profile: EmergencyProfile; d: any; lang: string }) {
    const isHuman = profile.type === 'HUMAN';
    return (
        <header className="rounded-b-3xl bg-red-900 px-4 pb-4 pt-6 text-white shadow-lg">
            <button
                onClick={() => {
                    window.location.href = `/${lang === 'en' ? 'es' : 'en'}${window.location.pathname.replace(`/${lang}`, '')}`;
                }}
                className="absolute right-4 top-4 rounded-full bg-white/20 px-3 py-1 text-xs font-bold"
                aria-label="switch-language"
                type="button"
            >
                {lang === 'en' ? 'EN' : 'ES'}
            </button>
            <div className="mx-auto w-full max-w-md">
                <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-red-100">
                    {isHuman ? <LocalHospitalIcon fontSize="small" /> : <PetsIcon fontSize="small" />}
                    <span>{isHuman ? (lang === 'es' ? 'HUMANO' : 'HUMAN') : (lang === 'es' ? 'MASCOTA' : 'PET')}</span>
                </div>
                <h1 className="text-3xl font-black leading-tight">{profile.name}</h1>
                {isHuman && profile.bloodType && (
                    <div className="mt-3 inline-flex items-center gap-2 rounded-xl bg-red-700 px-3 py-2 text-base font-extrabold">
                        <span>🩸</span>
                        <span>{d.blood}: {profile.bloodType}</span>
                    </div>
                )}
            </div>
        </header>
    );
}

function AllergyAlert({ allergies, d }: { allergies: string[]; d: any }) {
    if (!allergies?.length) return null;
    return (
        <section className="rounded-2xl border border-red-200 bg-red-50 p-3">
            <div className="mb-2 flex items-center gap-2 text-red-700">
                <WarningAmberIcon fontSize="small" />
                <p className="text-base font-extrabold uppercase">{d.allergies}</p>
            </div>
            <div className="flex flex-wrap gap-2">
                {allergies.map((item, idx) => (
                    <span key={`${item}-${idx}`} className="rounded-full bg-red-100 px-3 py-1 text-sm font-bold text-red-800">
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

    return (
        <section className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-200">
            <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-slate-500">{d.contactsTitle}</p>
            <div className="space-y-2">
                {isHuman ? (
                    <>
                        {profile.emergencyContact1_phone && (
                            <motion.a
                                whileTap={{ scale: 0.97 }}
                                href={`tel:${profile.emergencyContact1_phone}`}
                                onClick={triggerNotifyState}
                                aria-label={`call-${profile.emergencyContact1_name ?? 'contact-1'}`}
                                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-3 py-3 text-center text-sm font-bold text-white"
                            >
                                <PhoneIcon fontSize="small" />
                                {d.call} {ec1Relation ? `${ec1Relation.toUpperCase()}:` : ''} {profile.emergencyContact1_name ?? ''}
                            </motion.a>
                        )}
                        {profile.emergencyContact2_phone && (
                            <motion.a
                                whileTap={{ scale: 0.97 }}
                                href={`tel:${profile.emergencyContact2_phone}`}
                                onClick={triggerNotifyState}
                                aria-label="call-contact-2"
                                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-red-300 px-3 py-3 text-center text-sm font-bold text-red-700"
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
                                    whileTap={{ scale: 0.97 }}
                                    href={`tel:${profile.ownerPhone}`}
                                    onClick={triggerNotifyState}
                                    aria-label="call-owner"
                                    className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-3 py-3 text-sm font-bold text-white"
                                >
                                    <PhoneIcon fontSize="small" />
                                    {d.callOwner}
                                </motion.a>
                                <motion.a
                                    whileTap={{ scale: 0.97 }}
                                    href={`https://wa.me/${profile.ownerPhone.replace(/\D/g, '')}`}
                                    aria-label="whatsapp-owner"
                                    className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-emerald-300 px-3 py-3 text-sm font-bold text-emerald-700"
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
                <p className="mt-2 text-center text-xs font-semibold text-slate-500">
                    {lang === 'es' ? 'Notificando al propietario...' : 'Notifying owner...'}
                </p>
            )}
        </section>
    );
}

function MedicalInfo({ profile, d, lang }: { profile: EmergencyProfile; d: any; lang: string }) {
    const isHuman = profile.type === 'HUMAN';
    const baseCard = 'rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-200';
    return (
        <div className="space-y-2">
            {isHuman ? (
                <>
                    <section className={baseCard}>
                        <p className="text-sm font-extrabold text-slate-900">❤️ {d.human.conditionsTitle}</p>
                        <ul className="mt-1 space-y-1 text-sm text-slate-700">
                            {(profile.medicalConditions.length ? profile.medicalConditions : [d.human.none]).map((c, i) => (
                                <li key={`${c}-${i}`} className="leading-tight">• {c}</li>
                            ))}
                        </ul>
                    </section>
                    <section className={baseCard}>
                        <p className="text-sm font-extrabold text-slate-900">💊 {d.human.medicationsTitle}</p>
                        <ul className="mt-1 space-y-1 text-sm text-slate-700">
                            {(profile.medications.length ? profile.medications : [d.human.none]).map((m, i) => (
                                <li key={`${m}-${i}`} className="leading-tight">• {m}</li>
                            ))}
                        </ul>
                    </section>
                </>
            ) : (
                <>
                    <section className={baseCard}>
                        <p className="text-sm font-extrabold text-slate-900">🐾 {d.pet.detailsTitle}</p>
                        <p className="mt-1 text-sm text-slate-700">
                            <span className="font-semibold">{d.pet.breedSpecies}:</span> {[profile.breed, profile.species].filter(Boolean).join(' / ') || '-'}
                        </p>
                        {profile.targetReward && (
                            <p className="mt-1 text-sm font-semibold text-emerald-700">{d.pet.reward}: {profile.targetReward}</p>
                        )}
                    </section>
                    <section className={baseCard}>
                        <p className="text-sm font-extrabold text-slate-900">🏥 {d.pet.vetTitle}</p>
                        {profile.veterinarian_name && <p className="mt-1 text-sm text-slate-700">{profile.veterinarian_name}</p>}
                        {profile.veterinarian_phone && (
                            <a
                                href={`tel:${profile.veterinarian_phone}`}
                                className="mt-2 inline-flex min-h-12 items-center rounded-lg border border-slate-300 px-3 text-sm font-semibold text-slate-700"
                            >
                                <PhoneIcon fontSize="small" />
                                <span className="ml-1">{profile.veterinarian_phone}</span>
                            </a>
                        )}
                        {profile.vaccinationStatus && (
                            <p className="mt-2 text-sm text-slate-700">
                                <span className="font-semibold">{d.pet.vaccination}:</span> {profile.vaccinationStatus}
                            </p>
                        )}
                    </section>
                </>
            )}
            <p className="pt-1 text-center text-[11px] text-slate-500">
                {lang === 'es' ? 'Información crítica de emergencia' : 'Critical emergency information'}
            </p>
        </div>
    );
}

export default function PublicEmergencyClient({
    dictionary,
    lang,
    params,
}: {
    dictionary: any;
    lang: string;
    params: { publicId: string };
}) {
    const d = dictionary.emergency;
    const [profile, setProfile] = useState<EmergencyProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<LoadError>(null);

    useEffect(() => {
        EmergencyUseCases.getEmergencyProfile({ publicId: params.publicId })
            .then((data) => {
                if (!data.isActive) {
                    setError('inactive');
                } else {
                    setProfile(data);
                }
            })
            .catch((err) => {
                const msg = (err?.message ?? '').toLowerCase();
                if (msg.includes('404') || msg.includes('not found')) setError('not_found');
                else if (msg.includes('lost')) setError('lost');
                else if (msg.includes('inactive') || msg.includes('disabled')) setError('inactive');
                else setError('generic');
            })
            .finally(() => setLoading(false));
    }, [params.publicId]);

    const statusText = useMemo(() => {
        if (error === 'inactive') return { title: d.inactive.title, desc: d.inactive.disabled };
        if (error === 'lost') return { title: d.inactive.title, desc: d.inactive.lost };
        return null;
    }, [error, d]);

    if (loading) return <SkeletonEmergencyView />;

    if (error === 'not_found' || error === 'generic') {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
                <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-200">
                    <LocalHospitalIcon className="!mb-2 !text-6xl !text-red-600" />
                    <h2 className="text-xl font-extrabold text-slate-900">{d.notFound.title}</h2>
                    <p className="mt-2 text-sm text-slate-600">{d.notFound.desc}</p>
                </div>
            </div>
        );
    }

    if (statusText) {
        return (
            <div className="min-h-screen bg-slate-100 px-4 py-10">
                <StatusBanner title={statusText.title} desc={statusText.desc} />
            </div>
        );
    }

    if (!profile) return null;

    return (
        <main className="min-h-screen bg-slate-100 pb-6">
            <EmergencyHeader profile={profile} d={d} lang={lang} />

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="mx-auto -mt-4 w-full max-w-md space-y-2 px-4"
            >
                {profile.type === 'HUMAN' && <AllergyAlert allergies={profile.allergies} d={d} />}

                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
                    <EmergencyContacts profile={profile} d={d} lang={lang} />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <MedicalInfo profile={profile} d={d} lang={lang} />
                </motion.div>
            </motion.div>
        </main>
    );
}
