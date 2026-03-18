import { buildMoviesListQuery } from '@/features/movies/api/buildMoviesListQuery'
import type { MoviesResponse } from '@/features/movies/api/moviesApi.types'
import { MoviesResponseSchema } from '@/features/movies/models/movie.schema'
import { baseApi } from '@/shared/api/baseApi'
import type { PaginationParams } from '@/types/types'

export const moviesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPopularMovies: builder.query<MoviesResponse, PaginationParams>({
      query: params => buildMoviesListQuery('/movie/popular', params),
      transformResponse: (response: unknown) => MoviesResponseSchema.parse(response),
    }),

    getTopRatedMovies: builder.query<MoviesResponse, PaginationParams>({
      query: params => buildMoviesListQuery('/movie/top_rated', params),
      transformResponse: (response: unknown) => MoviesResponseSchema.parse(response),
    }),

    getUpcomingMovies: builder.query<MoviesResponse, PaginationParams>({
      query: params => buildMoviesListQuery('/movie/upcoming', params),
      transformResponse: (response: unknown) => MoviesResponseSchema.parse(response),
    }),

    getNowPlayingMovies: builder.query<MoviesResponse, PaginationParams>({
      query: params => buildMoviesListQuery('/movie/now_playing', params),
      transformResponse: (response: unknown) => MoviesResponseSchema.parse(response),
    }),
    getSearchMovies: builder.query<MoviesResponse, { query: string; page?: number }>({
      query: ({ query, page = 1 }) => ({
        url: '/search/movie',
        params: { query, page },
      }),
      transformResponse: (response: unknown) => MoviesResponseSchema.parse(response),
    }),
    getMovieDetails: builder.query({
      query: (id: number) => ({
        url: `/movie/${id}`,
        params: {
          append_to_response: 'credits,similar',
        },
      }),
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
} = moviesApi
