// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 导入翻译资源
import translationEN from './locales/en/translation.json';
import translationZH_TW from './locales/zh-TW/translation.json';
import translationZH_CN from './locales/zh-CN/translation.json';
import translationVI from './locales/vi/translation.json';

// 定义翻译资源
const resources = {
  en: {
    translation: translationEN,
  },
  'zh-TW': {
    translation: translationZH_TW,
  },
  'zh-CN': {
    translation: translationZH_CN,
  },
  vi: {
    translation: translationVI,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zh-TW',
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
