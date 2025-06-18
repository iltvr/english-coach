import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en/translation.json';
import ruTranslation from './locales/ru/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      ru: {
        translation: ruTranslation
      }
    },
    fallbackLng: 'ru', // Changed default language to Russian
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['navigator', 'querystring', 'localStorage', 'htmlTag'],
      lookupQuerystring: 'lang',
      caches: ['localStorage']
    }
  });

export default i18n;