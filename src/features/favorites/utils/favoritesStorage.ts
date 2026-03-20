import type { Movie } from '@/features/movies/api/moviesApi.types'
import { z } from 'zod'

const KEY = 'favorites_movies'

type FavoriteMovieInput = Pick<
  Movie,
  'id' | 'title' | 'poster_path' | 'vote_average' | 'release_date'
>

export interface FavoriteMovie extends FavoriteMovieInput {
  savedAt: string
}

const LegacyFavoriteMovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable().optional().default(null),
  vote_average: z.number().optional().default(0),
  release_date: z.string().optional().default(''),
  savedAt: z.string().optional(),
})

const FavoritesStorageSchema = z.array(LegacyFavoriteMovieSchema).transform(items =>
  items.map(item => ({
    id: item.id,
    title: item.title,
    poster_path: item.poster_path,
    vote_average: item.vote_average,
    release_date: item.release_date,
    savedAt: item.savedAt ?? new Date().toISOString(),
  })),
)

export const toFavoriteMovie = (movie: FavoriteMovieInput): FavoriteMovie => ({
  ...movie,
  savedAt: new Date().toISOString(),
})

export const favoriteMovieToMovie = (movie: FavoriteMovie): Movie => ({
  id: movie.id,
  title: movie.title,
  original_title: movie.title,
  overview: '',
  poster_path: movie.poster_path,
  backdrop_path: null,
  release_date: movie.release_date,
  vote_average: movie.vote_average,
  vote_count: 0,
  popularity: 0,
  genre_ids: [],
  adult: false,
  original_language: 'en',
})

export const loadFavorites = (): FavoriteMovie[] => {
  try {
    const data = localStorage.getItem(KEY)
    if (!data) return []

    const parsed = FavoritesStorageSchema.safeParse(JSON.parse(data))
    return parsed.success ? parsed.data : []
  } catch {
    return []
  }
}

export const saveFavorites = (movies: FavoriteMovie[]) => {
  localStorage.setItem(KEY, JSON.stringify(movies))
}
