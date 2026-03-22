import { baseApi } from '@/shared/api/baseApi'
import { startGlobalLoading, stopGlobalLoading } from '@/shared/ui/loading/ui.slice'
import type { Middleware } from '@reduxjs/toolkit'

const BASE_API_ACTION_PREFIX = `${baseApi.reducerPath}/`

const isRtkQueryAsyncAction = (type: string) =>
  type.startsWith(BASE_API_ACTION_PREFIX) &&
  (type.includes('/executeQuery/') || type.includes('/executeMutation/'))

const isPendingAction = (action: unknown): action is { type: string } =>
  typeof action === 'object' &&
  action !== null &&
  'type' in action &&
  typeof action.type === 'string' &&
  isRtkQueryAsyncAction(action.type) &&
  action.type.endsWith('/pending')

const isSettledAction = (action: unknown): action is { type: string } =>
  typeof action === 'object' &&
  action !== null &&
  'type' in action &&
  typeof action.type === 'string' &&
  isRtkQueryAsyncAction(action.type) &&
  (action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected'))

export const rtkQueryLoadingMiddleware: Middleware = api => next => action => {
  if (isPendingAction(action)) {
    api.dispatch(startGlobalLoading())
  }

  if (isSettledAction(action)) {
    api.dispatch(stopGlobalLoading())
  }

  return next(action)
}
