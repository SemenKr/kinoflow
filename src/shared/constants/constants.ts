export const IMAGE_BASE = 'https://image.tmdb.org/t/p'

export const ROUTES = {
  home: '/',
  categories: '/movies',
  filtered: '/filtered',
  search: '/search',
  favorites: '/favorites',
  movieDetails: (id: number | string) => `/movie/${id}`,
  movieCategory: (category: string) => `/movies/${category}`,
} as const
