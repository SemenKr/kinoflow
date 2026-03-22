const STORAGE_KEY = 'kino-flow-lang'
const DEFAULT_APP_LANGUAGE = 'en'
const DEFAULT_API_LANGUAGE = 'en-US'

export const supportedLanguages = ['en', 'ru'] as const

export type SupportedLanguage = (typeof supportedLanguages)[number]

const API_LANGUAGE_BY_LOCALE: Record<SupportedLanguage, string> = {
  en: 'en-US',
  ru: 'ru-RU',
}

export const normalizeLanguage = (value: string): SupportedLanguage | null => {
  const shortLocale = value.toLowerCase().split('-')[0]

  return supportedLanguages.includes(shortLocale as SupportedLanguage)
    ? (shortLocale as SupportedLanguage)
    : null
}

export const getInitialLanguage = (): SupportedLanguage => {
  if (typeof window === 'undefined') return DEFAULT_APP_LANGUAGE

  const storedLanguage = window.localStorage.getItem(STORAGE_KEY)
  const normalizedStoredLanguage = storedLanguage ? normalizeLanguage(storedLanguage) : null
  if (normalizedStoredLanguage) return normalizedStoredLanguage

  return normalizeLanguage(window.navigator.language) ?? DEFAULT_APP_LANGUAGE
}

export const persistLanguage = (language: string) => {
  if (typeof window === 'undefined') return

  const normalizedLanguage = normalizeLanguage(language)
  if (normalizedLanguage) {
    window.localStorage.setItem(STORAGE_KEY, normalizedLanguage)
  }
}

export const getApiLanguage = (locale?: string | null) => {
  const normalizedLanguage = normalizeLanguage(locale || DEFAULT_APP_LANGUAGE)

  return normalizedLanguage ? API_LANGUAGE_BY_LOCALE[normalizedLanguage] : DEFAULT_API_LANGUAGE
}
