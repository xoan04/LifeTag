import { getDictionary } from '@/dictionaries/getDictionary';
import { Locale } from '@/i18n-config';
import DashboardLayoutClient from '@/app/[lang]/dashboard/DashboardLayoutClient';

export default async function DashboardLayout({
    children,
    params: { lang },
}: {
    children: React.ReactNode;
    params: { lang: Locale };
}) {
    const dictionary = await getDictionary(lang);
    return <DashboardLayoutClient dictionary={dictionary} lang={lang}>{children}</DashboardLayoutClient>;
}
