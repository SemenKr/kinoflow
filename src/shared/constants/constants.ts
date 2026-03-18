export const ROUTES = {
  home: '/',
  categories: '/categories',
  filtered: '/filtered',
  search: '/search',
  favorites: '/favorites',
  movieDetails: (id: number | string) => `/movie/${id}`,
} as const
