export const IMAGE_BASE = 'https://image.tmdb.org/t/p'

export const MOVIE_CATEGORY_TABS = [
  'popular',
  'top-rated',
  'upcoming',
  'now-playing',
] as const

export type MovieCategoryTab = (typeof MOVIE_CATEGORY_TABS)[number]

export const DEFAULT_MOVIE_CATEGORY: MovieCategoryTab = 'popular'

export const ROUTES = {
  home: '/',
  categories: '/movies',
  filtered: '/filtered',
  search: '/search',
  favorites: '/favorites',
  movieDetails: (id: number | string) => `/movie/${id}`,
  movieCategory: (category: string) => `/movies/${category}`,
} as const
