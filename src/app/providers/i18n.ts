import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const STORAGE_KEY = 'kino-flow-lang'
const supportedLanguages = ['en', 'ru'] as const
type SupportedLanguage = (typeof supportedLanguages)[number]

const resources = {
  en: {
    translation: {
      main: 'Main',
      categories: 'Category Movies',
      filtered: 'Filtered Movies',
      search: 'Search',
      favorites: 'Favorites',
      welcome_title: 'Welcome',
      welcome_subtitle: 'Browse highlighted titles from TMDB',
    },
  },
  ru: {
    translation: {
      main: 'Главная',
      categories: 'Категории',
      filtered: 'Фильтр',
      search: 'Поиск',
      favorites: 'Избранное',
      welcome_title: 'Добро пожаловать',
      welcome_subtitle: 'Просматривайте популярные фильмы TMDB',
    },
  },
}

const normalizeLanguage = (value: string): SupportedLanguage | null => {
  const short = value.toLowerCase().split('-')[0]
  return supportedLanguages.includes(short as SupportedLanguage)
    ? (short as SupportedLanguage)
    : null
}

const getInitialLanguage = (): SupportedLanguage => {
  if (typeof window === 'undefined') return 'en'

  const stored = window.localStorage.getItem(STORAGE_KEY)
  const normalizedStored = stored ? normalizeLanguage(stored) : null
  if (normalizedStored) return normalizedStored

  const browser = normalizeLanguage(window.navigator.language)
  return browser ?? 'en'
}

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: 'en',
  supportedLngs: supportedLanguages,
  interpolation: {
    escapeValue: false,
  },
})

if (typeof window !== 'undefined') {
  i18n.on('languageChanged', language => {
    const normalized = normalizeLanguage(language)
    if (normalized) {
      window.localStorage.setItem(STORAGE_KEY, normalized)
    }
  })
}

export default i18n
