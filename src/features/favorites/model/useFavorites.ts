import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import type { Movie } from '@/features/movies/api/moviesApi.types'
import { toggleFavorite } from './favoritesSlice'
import { toFavoriteMovie } from '../utils/favoritesStorage'

export const useFavorites = () => {
  const dispatch = useAppDispatch()
  const favorites = useAppSelector(state => state.favorites.movies)

  const isFavorite = (id: number) => {
    return favorites.some(m => m.id === id)
  }

  const toggle = (
    movie: Pick<Movie, 'id' | 'title' | 'poster_path' | 'vote_average' | 'release_date'>,
  ) => {
    dispatch(toggleFavorite(toFavoriteMovie(movie)))
  }

  return { favorites, isFavorite, toggle }
}
