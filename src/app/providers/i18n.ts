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
      categories_page_title: 'Browse movies by category',
      categories_page_subtitle: 'Switch between curated TMDB lists and explore what to watch next.',
      categories_page_error: 'Failed to load category movies.',
      categories_page_results_hint: 'Page {{page}}',
      categories_tab_popular: 'Popular',
      'categories_tab_top-rated': 'Top rated',
      categories_tab_upcoming: 'Upcoming',
      'categories_tab_now-playing': 'Now playing',
      filtered: 'Filtered Movies',
      search: 'Search',
      view_more: 'View More',
      favorites: 'Favorites',
      footer_copy: '© 2025 Kinopoisk Demo · Data courtesy of TMDB.',
      footer_author: 'Author: Semen Kr',
      footer_social_github: 'GitHub',
      footer_social_telegram: 'Telegram',
      footer_social_linkedin: 'LinkedIn',
      footer_social_instagram: 'Instagram',
      favorites_page_title: 'Favorite movies',
      favorites_page_subtitle: 'Save movies you want to revisit later.',
      favorites_page_count_one: '{{count}} saved movie',
      favorites_page_count_other: '{{count}} saved movies',
      favorites_empty: 'You have no favorite movies yet.',
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
      movie_details_similar: 'Similar movies',
      movie_details_similar_error: 'Failed to load similar movies',
      movie_details_retry: 'Retry',
      toast_network_error: 'Network error. Check your connection and try again.',
      toast_parse_error: 'Unexpected server response. Please try again later.',
      toast_timeout_error: 'Request timed out. Please try again.',
      toast_auth_error: 'Authorization error. Please sign in again.',
      toast_rate_limit_error: 'Too many requests. Please wait a bit and try again.',
      toast_server_error: 'Server error. Please try again later.',
      toast_movies_feed_error: 'Could not load movies right now.',
      toast_search_error: 'Search is temporarily unavailable.',
      toast_movie_details_error: 'Could not load movie details.',
      toast_similar_movies_error: 'Could not load similar movies.',
      toast_unexpected_error: 'Something went wrong. Please try again.',
      toast_runtime_error: 'The app hit an unexpected error.',
      app_fatal_error_title: 'Something went wrong',
      app_fatal_error_description: 'The page crashed unexpectedly. Reload to continue.',
      app_reload: 'Reload',
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
      categories_page_title: 'Фильмы по категориям',
      categories_page_subtitle:
        'Переключайтесь между подборками TMDB и просматривайте фильмы по нужной категории.',
      categories_page_error: 'Не удалось загрузить фильмы категории.',
      categories_page_results_hint: 'Страница {{page}}',
      categories_tab_popular: 'Популярные',
      'categories_tab_top-rated': 'С высоким рейтингом',
      categories_tab_upcoming: 'Скоро выйдут',
      'categories_tab_now-playing': 'Сейчас в кино',
      filtered: 'Фильтр',
      search: 'Поиск',
      view_more: 'Показать все',
      favorites: 'Избранное',
      footer_copy: '© 2025 Kinopoisk Demo · Данные предоставлены TMDB.',
      footer_author: 'Автор: Semen Kr',
      footer_social_github: 'GitHub',
      footer_social_telegram: 'Telegram',
      footer_social_linkedin: 'LinkedIn',
      footer_social_instagram: 'Instagram',
      favorites_page_title: 'Избранные фильмы',
      favorites_page_subtitle: 'Сохраняйте фильмы, к которым хотите вернуться позже.',
      favorites_page_count_one: '{{count}} сохраненный фильм',
      favorites_page_count_few: '{{count}} сохраненных фильма',
      favorites_page_count_many: '{{count}} сохраненных фильмов',
      favorites_page_count_other: '{{count}} сохраненных фильмов',
      favorites_empty: 'У вас пока нет избранных фильмов.',
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
      movie_details_similar: 'Похожие фильмы',
      movie_details_similar_error: 'Не удалось загрузить похожие фильмы',
      movie_details_retry: 'Повторить',
      toast_network_error: 'Ошибка сети. Проверьте подключение и попробуйте снова.',
      toast_parse_error: 'Сервер вернул неожиданный ответ. Попробуйте позже.',
      toast_timeout_error: 'Время ожидания запроса истекло. Попробуйте снова.',
      toast_auth_error: 'Ошибка авторизации. Повторите вход.',
      toast_rate_limit_error: 'Слишком много запросов. Немного подождите и попробуйте снова.',
      toast_server_error: 'Ошибка сервера. Попробуйте позже.',
      toast_movies_feed_error: 'Сейчас не удалось загрузить список фильмов.',
      toast_search_error: 'Поиск временно недоступен.',
      toast_movie_details_error: 'Не удалось загрузить детали фильма.',
      toast_similar_movies_error: 'Не удалось загрузить похожие фильмы.',
      toast_unexpected_error: 'Что-то пошло не так. Попробуйте снова.',
      toast_runtime_error: 'В приложении произошла непредвиденная ошибка.',
      app_fatal_error_title: 'Что-то пошло не так',
      app_fatal_error_description: 'Страница неожиданно упала. Перезагрузите приложение.',
      app_reload: 'Перезагрузить',
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
