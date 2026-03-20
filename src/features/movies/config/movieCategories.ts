import { ROUTES } from '@/shared/constants'
import type { PaginationParams } from '@/types/types'

export const MOVIE_CATEGORY_CONFIG = {
  popular: {
    endpoint: '/movie/popular',
    translationKey: 'categories_tab_popular',
  },
  top_rated: {
    endpoint: '/movie/top_rated',
    translationKey: 'categories_tab_top_rated',
  },
  upcoming: {
    endpoint: '/movie/upcoming',
    translationKey: 'categories_tab_upcoming',
  },
  now_playing: {
    endpoint: '/movie/now_playing',
    translationKey: 'categories_tab_now_playing',
  },
} as const

export type MovieCategoryTab = keyof typeof MOVIE_CATEGORY_CONFIG

export const MOVIE_CATEGORY_TABS = Object.keys(MOVIE_CATEGORY_CONFIG) as MovieCategoryTab[]
export const DEFAULT_MOVIE_CATEGORY: MovieCategoryTab = 'popular'

export const DEFAULT_MOVIE_CATEGORY_QUERY: PaginationParams = {
  language: 'en-US',
  region: 'US',
}

export const isMovieCategoryTab = (value: string | undefined): value is MovieCategoryTab =>
  !!value && value in MOVIE_CATEGORY_CONFIG

export const getMovieCategoryRoute = (category: MovieCategoryTab) => ROUTES.movieCategory(category)
