import { buildMoviesListQuery } from '@/features/movies/api/buildMoviesListQuery'
import { MOVIE_CATEGORY_CONFIG } from '@/features/movies/config/movieCategories'
import type { MoviesResponse } from '@/features/movies/api/moviesApi.types'
import { MovieDetailsSchema, MoviesResponseSchema } from '@/features/movies/models/movie.schema'
import type { MovieDetails } from '@/pages/MovieDetailsPage/MovieDetailsPage.utils'
import { baseApi } from '@/shared/api/baseApi'
import type { PaginationParams } from '@/types/types'

export const moviesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPopularMovies: builder.query<MoviesResponse, PaginationParams>({
      query: params => buildMoviesListQuery(MOVIE_CATEGORY_CONFIG.popular.endpoint, params),
      transformResponse: (response: unknown) => MoviesResponseSchema.parse(response),
    }),

    getTopRatedMovies: builder.query<MoviesResponse, PaginationParams>({
      query: params => buildMoviesListQuery(MOVIE_CATEGORY_CONFIG.top_rated.endpoint, params),
      transformResponse: (response: unknown) => MoviesResponseSchema.parse(response),
    }),

    getUpcomingMovies: builder.query<MoviesResponse, PaginationParams>({
      query: params => buildMoviesListQuery(MOVIE_CATEGORY_CONFIG.upcoming.endpoint, params),
      transformResponse: (response: unknown) => MoviesResponseSchema.parse(response),
    }),

    getNowPlayingMovies: builder.query<MoviesResponse, PaginationParams>({
      query: params => buildMoviesListQuery(MOVIE_CATEGORY_CONFIG.now_playing.endpoint, params),
      transformResponse: (response: unknown) => MoviesResponseSchema.parse(response),
    }),
    getSearchMovies: builder.query<MoviesResponse, { query: string; page?: number }>({
      query: ({ query, page = 1 }) => ({
        url: '/search/movie',
        params: { query, page },
      }),
      transformResponse: (response: unknown) => MoviesResponseSchema.parse(response),
    }),
    getMovieDetails: builder.query<MovieDetails, number>({
      query: (id: number) => ({
        url: `/movie/${id}`,
        params: {
          append_to_response: 'credits',
        },
      }),
      transformResponse: (response: unknown) => MovieDetailsSchema.parse(response),
    }),
    getSimilarMovies: builder.query<MoviesResponse, { movieId: number; page?: number }>({
      query: ({ movieId, page = 1 }) => ({
        url: `/movie/${movieId}/similar`,
        params: { page },
      }),
      transformResponse: (response: unknown) => MoviesResponseSchema.parse(response),
    }),
  }),
})

export const {
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useGetSearchMoviesQuery,
  useGetMovieDetailsQuery,
  useLazyGetSimilarMoviesQuery,
} = moviesApi
