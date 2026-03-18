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
      welcome_placeholder: 'Search for a movie',
      search_page_placeholder: 'Search movies...',
      search_page_clear: 'Clear search',
      search_page_empty: 'Enter a movie title to start searching',
      search_page_no_results: 'No matches found for "{{query}}"',
      movie_grid_empty: 'No movies to display',
      loading: 'Loading...',
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
      welcome_placeholder: 'Найдите фильм',
      search_page_placeholder: 'Поиск фильмов...',
      search_page_clear: 'Очистить поиск',
      search_page_empty: 'Введите название фильма, чтобы начать поиск',
      search_page_no_results: 'По запросу "{{query}}" ничего не найдено',
      movie_grid_empty: 'Нет фильмов для отображения',
      loading: 'Загрузка...',
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
