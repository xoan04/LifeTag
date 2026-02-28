import { getDictionary } from '@/dictionaries/getDictionary';
import { Locale } from '@/i18n-config';
import RegisterClient from '@/app/[lang]/register/RegisterClient';

export default async function RegisterPage({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const dictionary = await getDictionary(lang);
    return <RegisterClient dictionary={dictionary} lang={lang} />;
}
