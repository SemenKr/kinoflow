import { favoritesReducer } from '@/features/favorites/model/favoritesSlice'
import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@/shared/api/baseApi'
import { rtkQueryErrorMiddleware } from '@/shared/api/rtkQueryErrorMiddleware'
import { rtkQueryLoadingMiddleware } from '@/shared/api/rtkQueryLoadingMiddleware'
import { uiReducer } from '@/shared/ui/loading/ui.slice'
import { toastReducer } from '@/shared/ui/toast/toast.slice'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    favorites: favoritesReducer,
    ui: uiReducer,
    toast: toastReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(baseApi.middleware, rtkQueryLoadingMiddleware, rtkQueryErrorMiddleware),
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
