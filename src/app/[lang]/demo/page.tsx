import { getDictionary } from '@/dictionaries/getDictionary';
import { Locale } from '@/i18n-config';
import DemoPageClient from './DemoPageClient';

const DEMO_PUBLIC_ID = 'JD928K'; // Token del dispositivo de ejemplo (Juan Perez en mockData)

export default async function DemoPage({
    params,
}: {
    params: { lang: Locale };
}) {
    const dictionary = await getDictionary(params.lang);
    return (
        <DemoPageClient
            dictionary={dictionary}
            lang={params.lang}
            demoPublicId={DEMO_PUBLIC_ID}
        />
    );
}
