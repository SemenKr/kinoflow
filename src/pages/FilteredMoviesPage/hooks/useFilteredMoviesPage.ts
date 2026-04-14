import { useGetDiscoverMoviesQuery, useGetGenresQuery } from '@/features/movies/api/moviesApi'
import { useApiLanguage, useDebounceValue } from '@/hooks'
import { DEFAULT_FILTERS, SORT_OPTION_KEYS } from '@/shared/constants'
import { usePageSync } from '@/shared/hooks/usePageSync'
import { useMediaQuery, useTheme } from '@mui/material'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import type { FilterSidebarLabels } from '../FilteredMoviesPage.types'
import { useFiltersUrlSync } from './useFiltersUrlSync'

export const useFilteredMoviesPage = () => {
  const { t } = useTranslation()
  const apiLanguage = useApiLanguage()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
  const [isMobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const { filters, resetFilters, setSort, setRating, toggleGenre, setPage } = useFiltersUrlSync()

  const debouncedRating = useDebounceValue(filters.rating, 700)

  const queryParams = useMemo(
    () => ({
      page: filters.page,
      language: apiLanguage,
      sort_by: filters.sortBy,
      'vote_average.gte': debouncedRating.min,
      'vote_average.lte': debouncedRating.max,
      ...(filters.genres.length > 0 && {
        with_genres: filters.genres.join(','),
      }),
    }),
    [apiLanguage, filters.page, filters.sortBy, filters.genres, debouncedRating],
  )

  const { data, isLoading, isFetching } = useGetDiscoverMoviesQuery(queryParams)
  const { data: genresData } = useGetGenresQuery({ language: apiLanguage })

  const totalPages = Math.max(1, data?.total_pages ?? 1)
  const currentPage = usePageSync({
    page: filters.page,
    totalPages,
    enabled: Boolean(data),
    onCorrectPage: nextPage => {
      setPage(nextPage)
    },
  })
  const results = data?.results ?? []
  const totalResults = data?.total_results ?? 0

  const sortOptions = useMemo(
    () =>
      SORT_OPTION_KEYS.map(option => ({
        value: option.value,
        label: t(option.labelKey),
      })),
    [t],
  )

  const hasActiveFilters =
    filters.sortBy !== DEFAULT_FILTERS.sortBy ||
    filters.rating.min !== DEFAULT_FILTERS.rating.min ||
    filters.rating.max !== DEFAULT_FILTERS.rating.max ||
    filters.genres.length > 0

  const activeFilterCount = [
    filters.sortBy !== DEFAULT_FILTERS.sortBy,
    filters.rating.min !== DEFAULT_FILTERS.rating.min ||
      filters.rating.max !== DEFAULT_FILTERS.rating.max,
    filters.genres.length > 0,
  ].filter(Boolean).length

  const handleResetFilters = () => {
    resetFilters()
  }

  const handleSortChange = (value: string) => {
    setSort(value)
  }

  const handleRatingChange = (min: number, max: number) => {
    setRating(min, max)
  }

  const handleGenreToggle = (genreId: number) => {
    toggleGenre(genreId)
  }

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage)
  }

  const openMobileFilters = () => {
    setMobileFiltersOpen(true)
  }

  const closeMobileFilters = () => {
    setMobileFiltersOpen(false)
  }

  const filterSidebarLabels: FilterSidebarLabels = {
    title: t('filtered_filters_title'),
    hide: t('filtered_filters_hide'),
    sortBy: t('filtered_sort_by'),
    rating: t('filtered_rating'),
    ratingRange: t('filtered_rating_range', {
      min: filters.rating.min.toFixed(1),
      max: filters.rating.max.toFixed(1),
    }),
    genres: t('filtered_genres'),
    reset: t('filtered_reset'),
  }

  const labels = {
    pageTitle: t('filtered_page_title'),
    pageSubtitle: t('filtered_page_subtitle'),
    filtersShow: t('filtered_filters_show'),
    reset: t('filtered_reset'),
    resultsCount: t('filtered_results_count', {
      count: totalResults,
    }),
    activeFilters: t('filtered_active_filters', {
      count: activeFilterCount,
    }),
    selectedGenres: t('filtered_selected_genres', { count: filters.genres.length }),
    noResults: t('filtered_no_results'),
    loading: t('loading'),
    backToTop: t('filtered_back_to_top'),
  }

  return {
    isMobile,
    filters,
    results,
    genres: genresData?.genres ?? [],
    isLoading,
    isFetching,
    totalPages,
    currentPage,
    sortOptions,
    filterSidebarLabels,
    labels,
    hasActiveFilters,
    activeFilterCount,
    isMobileFiltersOpen,
    openMobileFilters,
    closeMobileFilters,
    handleResetFilters,
    handleSortChange,
    handleRatingChange,
    handleGenreToggle,
    handlePageChange,
  }
}
