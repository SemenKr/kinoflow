import {
  MovieSchema,
  MoviesResponseSchema,
  PersonCombinedCreditsSchema,
  PersonDetailsSchema,
  PersonExternalIdsSchema,
} from '@/features/movies/models/movie.schema'
import { z } from 'zod'

export type Movie = z.infer<typeof MovieSchema>
export type MoviesResponse = z.infer<typeof MoviesResponseSchema>
export type PersonDetails = z.infer<typeof PersonDetailsSchema>
export type PersonCombinedCredits = z.infer<typeof PersonCombinedCreditsSchema>
export type PersonExternalIds = z.infer<typeof PersonExternalIdsSchema>

export interface SearchMoviesParams {
  query: string
  page?: number
  language?: string
}

export interface MovieDetailsParams {
  id: number
  language?: string
}

export interface SimilarMoviesParams {
  movieId: number
  page?: number
  language?: string
}

export interface PersonDetailsParams {
  personId: number
  language?: string
}

export interface PersonCombinedCreditsParams {
  personId: number
  language?: string
}

export interface PersonExternalIdsParams {
  personId: number
  language?: string
}

export interface GenresParams {
  language?: string
}
