import { getDictionary } from '@/dictionaries/getDictionary';
import { Locale } from '@/i18n-config';
import ResetPasswordClient from './ResetPasswordClient';

export default async function ResetPasswordPage({
    params: { lang },
    searchParams,
}: {
    params: { lang: Locale };
    searchParams: { email?: string };
}) {
    const dictionary = await getDictionary(lang);
    const email = typeof searchParams?.email === 'string' ? searchParams.email : '';
    return <ResetPasswordClient dictionary={dictionary} lang={lang} initialEmail={email} />;
}
