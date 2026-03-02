import { getDictionary } from '@/dictionaries/getDictionary';
import { Locale } from '@/i18n-config';
import ForgotPasswordClient from './ForgotPasswordClient';

export default async function ForgotPasswordPage({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const dictionary = await getDictionary(lang);
    return <ForgotPasswordClient dictionary={dictionary} lang={lang} />;
}
