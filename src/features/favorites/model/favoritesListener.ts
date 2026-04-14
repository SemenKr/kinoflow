import { createListenerMiddleware } from '@reduxjs/toolkit'
import { toggleFavorite } from '@/features/favorites/model/favoritesSlice'
import { saveFavorites } from '@/features/favorites/utils/favoritesStorage'
import type { RootState } from '@/app/model/store'

export const favoritesListenerMiddleware = createListenerMiddleware()

favoritesListenerMiddleware.startListening({
  actionCreator: toggleFavorite,
  effect: (_, api) => {
    const state = api.getState() as RootState
    saveFavorites(state.favorites.movies)
  },
})
