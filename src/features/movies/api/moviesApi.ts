import { buildMoviesListQuery } from '@/features/movies/api/buildMoviesListQuery'
import { MOVIE_CATEGORY_CONFIG } from '@/features/movies/config/movieCategories'
import type {
  GenresParams,
  MovieDetailsParams,
  MoviesResponse,
  SearchMoviesParams,
  SimilarMoviesParams,
} from '@/features/movies/api/moviesApi.types'
import type { DiscoverMoviesParams } from '@/features/movies/model/discover.types'
import {
  GenresResponseSchema,
  MovieDetailsSchema,
  MoviesResponseSchema,
} from '@/features/movies/models/movie.schema'
import type { MovieDetails } from '@/pages/MovieDetailsPage/MovieDetailsPage.utils'
import { baseApi } from '@/shared/api/baseApi'
import { validateResponse } from '@/shared/api/validateResponse'
import type { PaginationParams } from '@/types/types'

const parseMoviesResponse = validateResponse(MoviesResponseSchema)
const parseMovieDetailsResponse = validateResponse(MovieDetailsSchema)
const parseGenresResponse = validateResponse(GenresResponseSchema)

export const moviesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPopularMovies: builder.query<MoviesResponse, PaginationParams>({
      query: params => buildMoviesListQuery(MOVIE_CATEGORY_CONFIG.popular.endpoint, params),
      transformResponse: parseMoviesResponse,
    }),

    getTopRatedMovies: builder.query<MoviesResponse, PaginationParams>({
      query: params => buildMoviesListQuery(MOVIE_CATEGORY_CONFIG.top_rated.endpoint, params),
      transformResponse: parseMoviesResponse,
    }),

    getUpcomingMovies: builder.query<MoviesResponse, PaginationParams>({
      query: params => buildMoviesListQuery(MOVIE_CATEGORY_CONFIG.upcoming.endpoint, params),
      transformResponse: parseMoviesResponse,
    }),

    getNowPlayingMovies: builder.query<MoviesResponse, PaginationParams>({
      query: params => buildMoviesListQuery(MOVIE_CATEGORY_CONFIG.now_playing.endpoint, params),
      transformResponse: parseMoviesResponse,
    }),
    getSearchMovies: builder.query<MoviesResponse, SearchMoviesParams>({
      query: ({ query, page = 1, language = 'en-US' }) => ({
        url: '/search/movie',
        params: { query, page, language },
      }),
      transformResponse: parseMoviesResponse,
    }),
    getMovieDetails: builder.query<MovieDetails, MovieDetailsParams>({
      query: ({ id, language = 'en-US' }) => ({
        url: `/movie/${id}`,
        params: {
          language,
          append_to_response: 'credits',
        },
      }),
      transformResponse: parseMovieDetailsResponse,
    }),
    getSimilarMovies: builder.query<MoviesResponse, SimilarMoviesParams>({
      query: ({ movieId, page = 1, language = 'en-US' }) => ({
        url: `/movie/${movieId}/similar`,
        params: { page, language },
      }),
      transformResponse: parseMoviesResponse,
    }),
    getDiscoverMovies: builder.query<MoviesResponse, DiscoverMoviesParams>({
      query: ({ language = 'en-US', ...params }) => ({
        url: '/discover/movie',
        params: {
          language,
          ...params,
        },
      }),
      transformResponse: parseMoviesResponse,
    }),
    getGenres: builder.query<{ genres: { id: number; name: string }[] }, GenresParams | void>({
      query: (params?: GenresParams) => ({
        url: '/genre/movie/list',
        params: params ?? undefined,
      }),
      transformResponse: parseGenresResponse,
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
  useGetDiscoverMoviesQuery,
  useLazyGetDiscoverMoviesQuery,
  useGetGenresQuery,
} = moviesApi
