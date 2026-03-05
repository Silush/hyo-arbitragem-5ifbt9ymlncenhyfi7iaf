import React, { useCallback } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { translations, Language } from '@shared/translations';
interface I18nState {
  lang: Language;
  setLang: (lang: Language) => void;
}
export const useI18nStore = create<I18nState>()(
  persist(
    (set) => ({
      lang: 'pt',
      setLang: (lang) => set({ lang }),
    }),
    { name: 'hyo-i18n-storage' }
  )
);
export function useI18n() {
  const lang = useI18nStore((s) => s.lang);
  const setLang = useI18nStore((s) => s.setLang);
  const t = useCallback((path: string, params?: Record<string, any>): string => {
    const keys = path.split('.');
    const currentLangDict = translations[lang] || translations['en'];
    let current: any = currentLangDict;
    for (const key of keys) {
      if (current === undefined || current === null || current[key] === undefined) {
        // Fallback to English dictionary if key is missing
        let fallback: any = translations['en'];
        for (const fkey of keys) {
          if (fallback === undefined || fallback === null || fallback[fkey] === undefined) return path;
          fallback = fallback[fkey];
        }
        current = fallback;
        break;
      }
      current = current[key];
    }
    if (typeof current !== 'string') return path;
    let result = current;
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        result = result.replace(`{{${key}}}`, String(value));
      });
    }
    return result;
  }, [lang]);
  return { t, lang, setLang };
}