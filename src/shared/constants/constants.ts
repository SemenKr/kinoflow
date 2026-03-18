export const IMAGE_BASE = 'https://image.tmdb.org/t/p'

export const ROUTES = {
  home: '/',
  categories: '/categories',
  filtered: '/filtered',
  search: '/search',
  favorites: '/favorites',
  movieDetails: (id: number | string) => `/movie/${id}`,
} as const
