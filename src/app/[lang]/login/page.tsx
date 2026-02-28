import { getDictionary } from '@/dictionaries/getDictionary';
import { Locale } from '@/i18n-config';
import LoginClient from '@/app/[lang]/login/LoginClient';

export default async function LoginPage({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const dictionary = await getDictionary(lang);
    return <LoginClient dictionary={dictionary} lang={lang} />;
}
