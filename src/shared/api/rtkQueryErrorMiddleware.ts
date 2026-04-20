import i18n from '@/app/providers/i18n'
import { enqueueToast } from '@/shared/ui/toast/toast.slice'
import { isRejected, isRejectedWithValue, type Middleware } from '@reduxjs/toolkit'
import type { ToastSeverity } from '@/shared/ui/toast/toast.slice'
import { ResponseValidationError } from '@/shared/api/validateResponse'

type EndpointName =
  | 'getPopularMovies'
  | 'getTopRatedMovies'
  | 'getUpcomingMovies'
  | 'getNowPlayingMovies'
  | 'getSearchMovies'
  | 'getMovieDetails'
  | 'getPersonImages'
  | 'getSimilarMovies'
  | 'getDiscoverMovies'
  | 'getGenres'

const LOCAL_ERROR_ENDPOINTS = new Set<EndpointName>(['getSimilarMovies', 'getPersonImages'])

const shouldShowGlobalToast = (status: unknown, endpointName?: string) => {
  if (endpointName && LOCAL_ERROR_ENDPOINTS.has(endpointName as EndpointName)) {
    return false
  }

  if (status === 'FETCH_ERROR' || status === 'PARSING_ERROR' || status === 'TIMEOUT_ERROR') {
    return true
  }

  if (typeof status === 'number') {
    return status === 401 || status === 403 || status === 404 || status === 429 || status >= 500
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
    getDiscoverMovies: 'toast_movies_feed_error',
    getGenres: 'toast_movies_feed_error',
  }

  const key = endpointName ? endpointKeyMap[endpointName as EndpointName] : undefined
  return key ? i18n.t(key) : null
}

const getToastMessage = (status: unknown, endpointName?: string) => {
  if (status === 401 || status === 403) return i18n.t('toast_auth_error')
  if (status === 404) return i18n.t('toast_not_found_error')
  if (status === 429) return i18n.t('toast_rate_limit_error')

  const endpointMessage = getEndpointMessage(endpointName)
  if (endpointMessage) return endpointMessage

  if (status === 'FETCH_ERROR') return i18n.t('toast_network_error')
  if (status === 'PARSING_ERROR') return i18n.t('toast_parse_error')
  if (status === 'TIMEOUT_ERROR') return i18n.t('toast_timeout_error')
  if (typeof status === 'number' && status >= 500) return i18n.t('toast_server_error')

  return i18n.t('toast_unexpected_error')
}

const getRejectedErrorName = (action: unknown) => {
  if (
    typeof action === 'object' &&
    action !== null &&
    'error' in action &&
    typeof action.error === 'object' &&
    action.error !== null &&
    'name' in action.error &&
    typeof action.error.name === 'string'
  ) {
    return action.error.name
  }

  return undefined
}

const getRejectedStatus = (action: unknown) => {
  if (
    typeof action === 'object' &&
    action !== null &&
    'payload' in action &&
    typeof action.payload === 'object' &&
    action.payload !== null &&
    'status' in action.payload
  ) {
    return action.payload.status
  }

  return undefined
}

const getRejectedEndpointName = (action: unknown) => {
  if (
    typeof action === 'object' &&
    action !== null &&
    'meta' in action &&
    typeof action.meta === 'object' &&
    action.meta !== null &&
    'arg' in action.meta &&
    typeof action.meta.arg === 'object' &&
    action.meta.arg !== null &&
    'endpointName' in action.meta.arg &&
    typeof action.meta.arg.endpointName === 'string'
  ) {
    return action.meta.arg.endpointName
  }

  return undefined
}

export const rtkQueryErrorMiddleware: Middleware = api => next => action => {
  if (isRejectedWithValue(action) || isRejected(action)) {
    const status = getRejectedStatus(action)
    const endpointName = getRejectedEndpointName(action)
    const errorName = getRejectedErrorName(action)

    if (errorName === ResponseValidationError.name) {
      api.dispatch(
        enqueueToast({
          severity: 'error',
          message: i18n.t('toast_parse_error'),
        }),
      )
      return next(action)
    }

    if (shouldShowGlobalToast(status, endpointName)) {
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
