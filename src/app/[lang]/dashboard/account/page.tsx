import { getDictionary } from '@/dictionaries/getDictionary';
import { Locale } from '@/i18n-config';
import AccountClient from './AccountClient';

export default async function AccountPage({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const dictionary = await getDictionary(lang);

    return <AccountClient dictionary={dictionary} lang={lang} />;
}
