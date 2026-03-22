import { MovieSchema, MoviesResponseSchema } from '@/features/movies/models/movie.schema'
import { z } from 'zod'

export type Movie = z.infer<typeof MovieSchema>
export type MoviesResponse = z.infer<typeof MoviesResponseSchema>

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

export interface GenresParams {
  language?: string
}
