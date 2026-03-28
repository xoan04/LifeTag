import { getDictionary } from '@/dictionaries/getDictionary';
import { Locale } from '@/i18n-config';
import PublicEmergencyClient from './PublicEmergencyClient';

export default async function PublicIdPage({
    params,
}: {
    params: { lang: Locale; publicId: string };
}) {
    const dictionary = await getDictionary(params.lang);
    return (
        <PublicEmergencyClient dictionary={dictionary} lang={params.lang} publicId={params.publicId} />
    );
}
