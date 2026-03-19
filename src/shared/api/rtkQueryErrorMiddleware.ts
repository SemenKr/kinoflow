import i18n from '@/app/providers/i18n'
import { enqueueToast } from '@/shared/ui/toast/toast.slice'
import { isRejectedWithValue, type Middleware } from '@reduxjs/toolkit'
import type { ToastSeverity } from '@/shared/ui/toast/toast.slice'

type EndpointName =
  | 'getPopularMovies'
  | 'getTopRatedMovies'
  | 'getUpcomingMovies'
  | 'getNowPlayingMovies'
  | 'getSearchMovies'
  | 'getMovieDetails'
  | 'getSimilarMovies'

const shouldShowGlobalToast = (status: unknown) => {
  if (status === 'FETCH_ERROR' || status === 'PARSING_ERROR' || status === 'TIMEOUT_ERROR') {
    return true
  }

  if (typeof status === 'number') {
    return status === 401 || status === 403 || status === 429 || status >= 500
  }

  return false
}

const getToastSeverity = (status: unknown): ToastSeverity => {
  if (status === 429) return 'info'
  if (status === 'FETCH_ERROR' || status === 'TIMEOUT_ERROR' || status === 401 || status === 403) {
    return 'warning'
  }

  return 'error'
}

const getEndpointMessage = (endpointName?: string) => {
  const endpointKeyMap: Partial<Record<EndpointName, string>> = {
    getPopularMovies: 'toast_movies_feed_error',
    getTopRatedMovies: 'toast_movies_feed_error',
    getUpcomingMovies: 'toast_movies_feed_error',
    getNowPlayingMovies: 'toast_movies_feed_error',
    getSearchMovies: 'toast_search_error',
    getMovieDetails: 'toast_movie_details_error',
    getSimilarMovies: 'toast_similar_movies_error',
  }

  const key = endpointName ? endpointKeyMap[endpointName as EndpointName] : undefined
  return key ? i18n.t(key) : null
}

const getToastMessage = (status: unknown, endpointName?: string) => {
  if (status === 401 || status === 403) return i18n.t('toast_auth_error')
  if (status === 429) return i18n.t('toast_rate_limit_error')

  const endpointMessage = getEndpointMessage(endpointName)
  if (endpointMessage) return endpointMessage

  if (status === 'FETCH_ERROR') return i18n.t('toast_network_error')
  if (status === 'PARSING_ERROR') return i18n.t('toast_parse_error')
  if (status === 'TIMEOUT_ERROR') return i18n.t('toast_timeout_error')
  if (typeof status === 'number' && status >= 500) return i18n.t('toast_server_error')

  return i18n.t('toast_unexpected_error')
}

export const rtkQueryErrorMiddleware: Middleware = api => next => action => {
  if (isRejectedWithValue(action)) {
    const status = action.payload?.status
    const endpointName = action.meta?.arg?.endpointName

    if (shouldShowGlobalToast(status)) {
      api.dispatch(
        enqueueToast({
          severity: getToastSeverity(status),
          message: getToastMessage(status, endpointName),
        }),
      )
    }
  }

  return next(action)
}
