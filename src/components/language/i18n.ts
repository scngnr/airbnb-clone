import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enUS from './locales/common/en_US.json';
import trTR from './locales/common/tr_TR.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enUS
      },
      tr: {
        translation: trTR
      }
    },
    lng: 'tr', // Default language is Turkish
    fallbackLng: 'en', // Fallback to English if translation is missing
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;