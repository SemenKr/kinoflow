import {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
} from '@/features/movies/api/moviesApi'
import type { MovieCategoryTab } from '@/features/movies/config/movieCategories'
import type { PaginationParams } from '@/types/types'

type CategoryQueryOptions = {
  activeCategory?: MovieCategoryTab
}

export const useMovieCategoryQueries = (
  queryArgs: PaginationParams,
  options: CategoryQueryOptions = {},
) => {
  const { activeCategory } = options

  const popularQuery = useGetPopularMoviesQuery(queryArgs, {
    skip: !!activeCategory && activeCategory !== 'popular',
  })
  const topRatedQuery = useGetTopRatedMoviesQuery(queryArgs, {
    skip: !!activeCategory && activeCategory !== 'top-rated',
  })
  const upcomingQuery = useGetUpcomingMoviesQuery(queryArgs, {
    skip: !!activeCategory && activeCategory !== 'upcoming',
  })
  const nowPlayingQuery = useGetNowPlayingMoviesQuery(queryArgs, {
    skip: !!activeCategory && activeCategory !== 'now-playing',
  })

  return {
    popular: popularQuery,
    'top-rated': topRatedQuery,
    upcoming: upcomingQuery,
    'now-playing': nowPlayingQuery,
  } as const
}
