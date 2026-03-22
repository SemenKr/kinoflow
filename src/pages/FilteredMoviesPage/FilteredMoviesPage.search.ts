import { DEFAULT_FILTERS, SORT_OPTION_KEYS } from '@/shared/constants'
import type { FiltersState } from '@/features/movies/model/filter.types'

const DEFAULT_MAX_RATING = DEFAULT_FILTERS.rating.max
const SORT_VALUES: readonly string[] = SORT_OPTION_KEYS.map(option => option.value)
type SortValue = FiltersState['sortBy']

const isSortValue = (value: string): value is SortValue => SORT_VALUES.includes(value as SortValue)

const clampRating = (value: number) => Math.min(DEFAULT_MAX_RATING, Math.max(0, value))

const parseGenres = (value: string | null) => {
  if (!value) return DEFAULT_FILTERS.genres

  const ids = value
    .split(',')
    .map(part => Number(part.trim()))
    .filter(id => Number.isInteger(id) && id > 0)

  return Array.from(new Set(ids))
}

const parseRating = (value: string | null) => {
  if (!value) return DEFAULT_FILTERS.rating

  const normalized = value.replace(',', '-')
  const [rawMin, rawMax] = normalized.split('-')
  const min = clampRating(Number(rawMin))

  if (!Number.isFinite(min)) {
    return DEFAULT_FILTERS.rating
  }

  if (!rawMax) {
    return {
      min,
      max: DEFAULT_MAX_RATING,
    }
  }

  const max = clampRating(Number(rawMax))

  if (!Number.isFinite(max)) {
    return {
      min,
      max: DEFAULT_MAX_RATING,
    }
  }

  return {
    min: Math.min(min, max),
    max: Math.max(min, max),
  }
}

export const parseFiltersFromSearchParams = (searchParams: URLSearchParams): FiltersState => {
  const sort = searchParams.get('sort')
  const page = Number(searchParams.get('page') || String(DEFAULT_FILTERS.page))

  return {
    sortBy: sort && isSortValue(sort) ? sort : DEFAULT_FILTERS.sortBy,
    rating: parseRating(searchParams.get('rating')),
    genres: parseGenres(searchParams.get('genres')),
    page: Number.isInteger(page) && page > 0 ? page : DEFAULT_FILTERS.page,
  }
}

export const serializeFiltersToSearchParams = (filters: FiltersState) => {
  const params = new URLSearchParams()

  params.set('sort', filters.sortBy)

  if (filters.genres.length > 0) {
    params.set('genres', filters.genres.join(','))
  }

  if (
    filters.rating.min !== DEFAULT_FILTERS.rating.min ||
    filters.rating.max !== DEFAULT_FILTERS.rating.max
  ) {
    if (filters.rating.max === DEFAULT_FILTERS.rating.max) {
      params.set('rating', String(filters.rating.min))
    } else {
      params.set('rating', `${filters.rating.min}-${filters.rating.max}`)
    }
  }

  if (filters.page > 1) {
    params.set('page', String(filters.page))
  }

  return params
}
