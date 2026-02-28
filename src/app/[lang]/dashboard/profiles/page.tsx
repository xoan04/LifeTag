import { getDictionary } from '@/dictionaries/getDictionary';
import { Locale } from '@/i18n-config';
import ProfilesClient from '@/app/[lang]/dashboard/profiles/ProfilesClient';

export default async function ProfilesPage({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const dictionary = await getDictionary(lang);
    return <ProfilesClient dictionary={dictionary} lang={lang} />;
}
