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
      movie_card_no_poster: 'No Poster',
      movie_card_open_details: 'Open details for {{title}}',
      movie_card_add_favorites: 'Add "{{title}}" to favorites',
      movie_details_error: 'Error loading movie',
      movie_runtime_label: 'Runtime',
      movie_runtime_unknown: 'Unknown',
      movie_details_unknown: 'Unknown',
      movie_details_status: 'Status',
      movie_details_user_score: 'User score',
      movie_details_votes: 'votes',
      movie_details_homepage: 'Official site',
      movie_details_back: 'Back',
      movie_details_overview: 'Overview',
      movie_details_facts: 'Facts',
      movie_details_budget: 'Budget',
      movie_details_revenue: 'Revenue',
      movie_details_language: 'Language',
      movie_details_popularity: 'Popularity',
      movie_details_original_title: 'Original title',
      movie_details_collection: 'Collection',
      movie_details_adult: 'Adult',
      movie_details_yes: 'Yes',
      movie_details_no: 'No',
      movie_details_spoken_languages: 'Spoken languages',
      movie_details_countries: 'Production countries',
      movie_details_production: 'Production companies',
      loading: 'Loading...',
      movie_details_cast: 'Top Cast',
      movie_details_cast_expand: 'Show more',
      movie_details_cast_collapse: 'Hide',
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
      movie_card_no_poster: 'Нет постера',
      movie_card_open_details: 'Открыть детали: {{title}}',
      movie_card_add_favorites: 'Добавить "{{title}}" в избранное',
      movie_details_error: 'Ошибка загрузки фильма',
      movie_runtime_label: 'Длительность',
      movie_runtime_unknown: 'Неизвестно',
      movie_details_unknown: 'Неизвестно',
      movie_details_status: 'Статус',
      movie_details_user_score: 'Оценка зрителей',
      movie_details_votes: 'оценок',
      movie_details_homepage: 'Официальный сайт',
      movie_details_back: 'Назад',
      movie_details_overview: 'Описание',
      movie_details_facts: 'Факты',
      movie_details_budget: 'Бюджет',
      movie_details_revenue: 'Сборы',
      movie_details_language: 'Язык',
      movie_details_popularity: 'Популярность',
      movie_details_original_title: 'Оригинальное название',
      movie_details_collection: 'Коллекция',
      movie_details_adult: '18+',
      movie_details_yes: 'Да',
      movie_details_no: 'Нет',
      movie_details_spoken_languages: 'Языки',
      movie_details_countries: 'Страны производства',
      movie_details_production: 'Продакшн',
      loading: 'Загрузка...',
      movie_details_cast: 'В главных ролях',
      movie_details_cast_expand: 'Показать еще',
      movie_details_cast_collapse: 'Скрыть',
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
