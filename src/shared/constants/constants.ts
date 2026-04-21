import type { FiltersState } from '@/features/movies/model/filter.types'

export const IMAGE_BASE = 'https://image.tmdb.org/t/p'
export const HOME_HERO_BACKDROP_PATH = '/gCmfeKmEAZBP5gcXpiqb0gii9rS.jpg'

export const ROUTES = {
  home: '/',
  categories: '/movies',
  filtered: '/filtered',
  search: '/search',
  favorites: '/favorites',
  movieDetails: (id: number | string) => `/movie/${id}`,
  personDetails: (id: number | string) => `/person/${id}`,
  movieCategory: (category: string) => `/movies/${category}`,
} as const

export const DEFAULT_FILTERS: FiltersState = {
  sortBy: 'popularity.desc',
  rating: {
    min: 0,
    max: 10,
  },
  genres: [],
  page: 1,
}
export const SORT_OPTION_KEYS = [
  { value: 'popularity.desc', labelKey: 'filtered_sort_popularity_desc' },
  { value: 'popularity.asc', labelKey: 'filtered_sort_popularity_asc' },
  { value: 'vote_average.desc', labelKey: 'filtered_sort_rating_desc' },
  { value: 'vote_average.asc', labelKey: 'filtered_sort_rating_asc' },
  { value: 'primary_release_date.desc', labelKey: 'filtered_sort_release_desc' },
  { value: 'primary_release_date.asc', labelKey: 'filtered_sort_release_asc' },
  { value: 'original_title.asc', labelKey: 'filtered_sort_title_asc' },
  { value: 'original_title.desc', labelKey: 'filtered_sort_title_desc' },
] as const
