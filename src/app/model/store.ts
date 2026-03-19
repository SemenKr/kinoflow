import { favoritesReducer } from '@/features/favorites/model/favoritesSlice'
import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@/shared/api/baseApi'
import { rtkQueryErrorMiddleware } from '@/shared/api/rtkQueryErrorMiddleware'
import { toastReducer } from '@/shared/ui/toast/toast.slice'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    favorites: favoritesReducer,
    toast: toastReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(baseApi.middleware, rtkQueryErrorMiddleware),
})
/**
 * setupListeners включает дополнительные возможности RTK Query:
 * - refetch при возврате вкладки в фокус
 * - refetch при восстановлении интернет-соединения
 *
 * Работает через подписку на события браузера.
 */
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
