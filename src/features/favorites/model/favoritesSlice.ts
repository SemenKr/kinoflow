import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { loadFavorites, saveFavorites, type FavoriteMovie } from '../utils/favoritesStorage'

interface FavoritesState {
  movies: FavoriteMovie[]
}

const initialState: FavoritesState = {
  movies: loadFavorites(),
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<FavoriteMovie>) => {
      const exists = state.movies.find(m => m.id === action.payload.id)

      if (exists) {
        state.movies = state.movies.filter(m => m.id !== action.payload.id)
      } else {
        state.movies.push(action.payload)
      }

      saveFavorites(state.movies)
    },
  },
})

export const { toggleFavorite } = favoritesSlice.actions
export const favoritesReducer = favoritesSlice.reducer
