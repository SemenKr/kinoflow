import type { Movie } from '@/features/movies/api/moviesApi.types'

const KEY = 'favorites_movies'

type FavoriteMovieInput = Pick<Movie, 'id' | 'title' | 'poster_path' | 'vote_average' | 'release_date'>

export interface FavoriteMovie extends FavoriteMovieInput {
  savedAt: string
}

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
    return data ? (JSON.parse(data) as FavoriteMovie[]) : []
  } catch {
    return []
  }
}

export const saveFavorites = (movies: FavoriteMovie[]) => {
  localStorage.setItem(KEY, JSON.stringify(movies))
}
