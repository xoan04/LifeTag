import 'server-only';
import type { Locale } from '../i18n-config';

// We enumerate all dictionaries here for better security and performance
const dictionaries: Record<Locale, () => Promise<any>> = {
    en: () => import('./en.json').then((module) => module.default),
    es: () => import('./es.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) =>
    dictionaries[locale]?.() ?? dictionaries.es();
