import { getDictionary } from '@/dictionaries/getDictionary';
import { Locale } from '@/i18n-config';
import DashboardClient from '@/app/[lang]/dashboard/DashboardClient';

export default async function DashboardPage({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const dictionary = await getDictionary(lang);
    return <DashboardClient dictionary={dictionary} lang={lang} />;
}
