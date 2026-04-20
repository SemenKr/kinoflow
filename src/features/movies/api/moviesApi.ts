import { buildMoviesListQuery } from '@/features/movies/api/buildMoviesListQuery'
import { MOVIE_CATEGORY_CONFIG } from '@/features/movies/config/movieCategories'
import type {
  GenresParams,
  PersonCombinedCreditsParams,
  PersonExternalIds,
  PersonExternalIdsParams,
  PersonImages,
  PersonImagesParams,
  Movie,
  MovieDetailsParams,
  MoviesResponse,
  PersonDetails,
  PersonDetailsParams,
  SearchMoviesParams,
  SimilarMoviesParams,
} from '@/features/movies/api/moviesApi.types'
import type { DiscoverMoviesParams } from '@/features/movies/model/discover.types'
import {
  GenresResponseSchema,
  MovieDetailsSchema,
  MoviesResponseSchema,
  PersonCombinedCreditsSchema,
  PersonDetailsSchema,
  PersonImagesSchema,
  PersonExternalIdsSchema,
} from '@/features/movies/models/movie.schema'
import type { MovieDetails } from '@/pages/MovieDetailsPage/MovieDetailsPage.utils'
import { baseApi } from '@/shared/api/baseApi'
import { validateResponse } from '@/shared/api/validateResponse'
import type { PaginationParams } from '@/types/types'

const parseMoviesResponse = validateResponse(MoviesResponseSchema)
const parseMovieDetailsResponse = validateResponse(MovieDetailsSchema)
const parsePersonDetailsResponse = validateResponse(PersonDetailsSchema)
const parsePersonCombinedCreditsResponse = validateResponse(PersonCombinedCreditsSchema)
const parsePersonExternalIdsResponse = validateResponse(PersonExternalIdsSchema)
const parsePersonImagesResponse = validateResponse(PersonImagesSchema)
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
    getPersonDetails: builder.query<PersonDetails, PersonDetailsParams>({
      query: ({ personId, language = 'en-US' }) => ({
        url: `/person/${personId}`,
        params: { language },
      }),
      transformResponse: parsePersonDetailsResponse,
    }),
    getPersonCombinedCredits: builder.query<Movie[], PersonCombinedCreditsParams>({
      query: ({ personId, language = 'en-US' }) => ({
        url: `/person/${personId}/combined_credits`,
        params: { language },
      }),
      transformResponse: response => {
        const parsed = parsePersonCombinedCreditsResponse(response)
        const moviesOnly = parsed.cast.filter(item => item.media_type === 'movie')
        const seenIds = new Set<number>()

        return moviesOnly.reduce<Movie[]>((acc, item) => {
          if (seenIds.has(item.id)) return acc
          seenIds.add(item.id)

          const mappedMovie: Movie = {
            id: item.id,
            title: item.title || item.original_title || '',
            original_title: item.original_title || item.title || '',
            overview: item.overview || '',
            poster_path: item.poster_path,
            backdrop_path: item.backdrop_path,
            release_date: item.release_date || '',
            vote_average: item.vote_average ?? 0,
            vote_count: item.vote_count ?? 0,
            popularity: item.popularity ?? 0,
            genre_ids: item.genre_ids ?? [],
            adult: item.adult ?? false,
            original_language: item.original_language || '',
          }

          acc.push(mappedMovie)
          return acc
        }, [])
      },
    }),
    getPersonExternalIds: builder.query<PersonExternalIds, PersonExternalIdsParams>({
      query: ({ personId, language = 'en-US' }) => ({
        url: `/person/${personId}/external_ids`,
        params: { language },
      }),
      transformResponse: parsePersonExternalIdsResponse,
    }),
    getPersonImages: builder.query<PersonImages, PersonImagesParams>({
      query: ({ personId, language = 'en-US' }) => ({
        url: `/person/${personId}/images`,
        params: { language },
      }),
      transformResponse: parsePersonImagesResponse,
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
  useGetPersonDetailsQuery,
  useGetPersonCombinedCreditsQuery,
  useGetPersonExternalIdsQuery,
  useGetPersonImagesQuery,
  useLazyGetSimilarMoviesQuery,
  useGetDiscoverMoviesQuery,
  useLazyGetDiscoverMoviesQuery,
  useGetGenresQuery,
} = moviesApi
