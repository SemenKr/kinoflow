import { MovieGrid } from '@/features/movies/ui/MovieGrid/MovieGrid'
import { MovieGridSkeleton } from '@/features/movies/ui/MovieGrid/MovieGridSkeleton'
import { Box, Pagination, Typography } from '@mui/material'

import {
  loadingWrapSx,
  paginationWrapSx,
  selectedGenresTextSx,
} from '../FilteredMoviesPage.styles'
import type { Movie } from '@/features/movies/api/moviesApi.types'

interface FilteredMoviesResultsProps {
  isLoading: boolean
  isFetching: boolean
  results: Movie[]
  totalPages: number
  currentPage: number
  selectedGenresText?: string
  emptyLabel: string
  onPageChange: (nextPage: number) => void
}

export const FilteredMoviesResults = ({
  isLoading,
  isFetching,
  results,
  totalPages,
  currentPage,
  selectedGenresText,
  emptyLabel,
  onPageChange,
}: FilteredMoviesResultsProps) => {
  const isContentReady = !isLoading && !isFetching
  const shouldShowSelectedGenres = isContentReady && Boolean(selectedGenresText)
  const shouldShowEmptyState = isContentReady && results.length === 0
  const shouldShowPagination = isContentReady && totalPages > 1

  return (
    <>
      {!isContentReady && (
        <Box sx={loadingWrapSx}>
          <MovieGridSkeleton />
        </Box>
      )}

      {shouldShowSelectedGenres && (
        <Typography variant="body2" color="text.secondary" sx={selectedGenresTextSx}>
          {selectedGenresText}
        </Typography>
      )}

      {isContentReady && results.length > 0 && <MovieGrid movies={results} />}

      {shouldShowEmptyState && <Typography color="text.secondary">{emptyLabel}</Typography>}

      {shouldShowPagination && (
        <Box sx={paginationWrapSx}>
          <Pagination
            page={currentPage}
            count={totalPages}
            color="primary"
            size="medium"
            onChange={(_, nextPage) => onPageChange(nextPage)}
          />
        </Box>
      )}
    </>
  )
}
