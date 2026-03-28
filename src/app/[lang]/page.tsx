import { getDictionary } from '../../dictionaries/getDictionary';
import { Locale } from '../../i18n-config';
import { LandingNav } from '@/components/landing/LandingNav';
import { LandingHero } from '@/components/landing/LandingHero';
import { LandingProblem } from '@/components/landing/LandingProblem';
import { LandingSolution } from '@/components/landing/LandingSolution';
import { LandingHowItWorks } from '@/components/landing/LandingHowItWorks';
import { LandingFeatures } from '@/components/landing/LandingFeatures';
import { LandingPricing } from '@/components/landing/LandingPricing';
import { LandingTrust } from '@/components/landing/LandingTrust';
import { LandingFinalCta } from '@/components/landing/LandingFinalCta';
import { LandingFooter } from '@/components/landing/LandingFooter';

export default async function LandingPage({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const dictionary = await getDictionary(lang);

    return (
        <div className="min-h-screen bg-gray-50 overflow-x-hidden font-sans">
            <LandingNav dictionary={dictionary} lang={lang} />
            <LandingHero dictionary={dictionary} lang={lang} />
            <LandingProblem dictionary={dictionary} />
            <LandingSolution dictionary={dictionary} />
            <LandingHowItWorks dictionary={dictionary} />
            <LandingFeatures dictionary={dictionary} />
            <LandingPricing dictionary={dictionary} />
            <LandingTrust dictionary={dictionary} />
            <LandingFinalCta dictionary={dictionary} lang={lang} />
            <LandingFooter dictionary={dictionary} />
        </div>
    );
}
