import { getDictionary } from '@/dictionaries/getDictionary';
import { Locale } from '@/i18n-config';
import ProfileFormClient from '@/app/[lang]/dashboard/profiles/[id]/ProfileFormClient';

export default async function ProfileIdPage({
    params,
}: {
    params: { lang: Locale; id: string };
}) {
    const dictionary = await getDictionary(params.lang);
    return <ProfileFormClient dictionary={dictionary} lang={params.lang} params={params} />;
}
