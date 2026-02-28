import { getDictionary } from '../../dictionaries/getDictionary';
import { Locale } from '../../i18n-config';
import LandingPageClient from '@/app/[lang]/LandingPageClient';

export default async function LandingPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return <LandingPageClient dictionary={dictionary} lang={lang} />;
}
