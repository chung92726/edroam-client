import { i18n } from '@/next-i18next.config';

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  zh_TW: () =>
    import('@/dictionaries/zh-TW.json').then((module) => module.default),
  zh_CN: () =>
    import('@/dictionaries/zh.json').then((module) => module.default),
};

export const getDictionary = async (locale) => {
  console.log('Print locale', locale);
  if (!dictionaries[locale]) {
    throw new Error(`Dictionary for locale "${locale}" not found.`);
  }
  return dictionaries[locale]();
};
