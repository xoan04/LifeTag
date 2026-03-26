import { getDictionary } from '@/dictionaries/getDictionary';
import { Locale } from '@/i18n-config';
import DemoPageClient from './DemoPageClient';

export default async function DemoPage({
    params,
}: {
    params: { lang: Locale };
}) {
    const dictionary = await getDictionary(params.lang);
    return <DemoPageClient dictionary={dictionary} lang={params.lang} />;
}
