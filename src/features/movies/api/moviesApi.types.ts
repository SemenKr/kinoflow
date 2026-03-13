import { MovieSchema, MoviesResponseSchema } from '@/features/movies/models/movie.schema'
import { z } from 'zod'

export type Movie = z.infer<typeof MovieSchema>
export type MoviesResponse = z.infer<typeof MoviesResponseSchema>
