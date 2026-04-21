import type { FiltersState } from '@/features/movies/model/filter.types'
import { DEFAULT_FILTERS } from '@/shared/constants'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import {
  parseFiltersFromSearchParams,
  serializeFiltersToSearchParams,
} from '../FilteredMoviesPage.search'

type FiltersUpdater = (prev: FiltersState) => FiltersState

export const useFiltersUrlSync = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = useMemo(() => parseFiltersFromSearchParams(searchParams), [searchParams])

  const updateFilters = (updater: FiltersUpdater, options?: { replace?: boolean }) => {
    setSearchParams(
      prev => {
        const nextFilters = updater(parseFiltersFromSearchParams(prev))
        return serializeFiltersToSearchParams(nextFilters)
      },
      { replace: options?.replace ?? true },
    )
  }

  const resetFilters = () => {
    setSearchParams(serializeFiltersToSearchParams(DEFAULT_FILTERS), { replace: true })
  }

  const setSort = (value: string) => {
    updateFilters(prev => ({
      ...prev,
      sortBy: value,
      page: 1,
    }))
  }

  const setRating = (min: number, max: number) => {
    updateFilters(prev => ({
      ...prev,
      rating: { min, max },
      page: 1,
    }))
  }

  const toggleGenre = (genreId: number) => {
    updateFilters(prev => {
      const exists = prev.genres.includes(genreId)

      return {
        ...prev,
        genres: exists ? prev.genres.filter(id => id !== genreId) : [...prev.genres, genreId],
        page: 1,
      }
    })
  }

  const setPage = (nextPage: number) => {
    updateFilters(
      prev => ({
        ...prev,
        page: nextPage,
      }),
      { replace: false },
    )
  }

  return {
    filters,
    resetFilters,
    setSort,
    setRating,
    toggleGenre,
    setPage,
  }
}
