import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { Box, Button, Paper, Typography } from '@mui/material'

import { filterCardSx, filterHeaderSx } from '../FilteredMoviesPage.styles'
import type {
  FilterSidebarLabels,
  FilterStateShape,
  GenreOption,
  SortOption,
} from '../FilteredMoviesPage.types'
import { GenresList } from './filters/GenresList'
import { RatingSlider } from './filters/RatingSlider'
import { ResetButton } from './filters/ResetButton'
import { SortSelect } from './filters/SortSelect'

interface FilterSidebarProps {
  filters: FilterStateShape
  genres: GenreOption[]
  sortOptions: SortOption[]
  isMobile: boolean
  hasActiveFilters: boolean
  labels: FilterSidebarLabels
  onCloseMobile: () => void
  onReset: () => void
  onSortChange: (value: string) => void
  onRatingChange: (min: number, max: number) => void
  onGenreToggle: (genreId: number) => void
}

export const FilterSidebar = ({
  filters,
  genres,
  sortOptions,
  isMobile,
  hasActiveFilters,
  labels,
  onCloseMobile,
  onReset,
  onSortChange,
  onRatingChange,
  onGenreToggle,
}: FilterSidebarProps) => {
  return (
    <Paper elevation={0} sx={filterCardSx}>
      <Box sx={filterHeaderSx}>
        <Typography variant="h6">{labels.title}</Typography>

        {isMobile && (
          <Button size="small" startIcon={<CloseRoundedIcon />} onClick={onCloseMobile}>
            {labels.hide}
          </Button>
        )}
      </Box>

      <SortSelect
        label={labels.sortBy}
        value={filters.sortBy}
        options={sortOptions}
        onChange={onSortChange}
      />

      <RatingSlider
        label={labels.rating}
        valueLabel={labels.ratingRange}
        min={filters.rating.min}
        max={filters.rating.max}
        onChange={onRatingChange}
      />

      <GenresList
        label={labels.genres}
        genres={genres}
        selectedGenres={filters.genres}
        onToggle={onGenreToggle}
      />

      <ResetButton label={labels.reset} disabled={!hasActiveFilters} onReset={onReset} />
    </Paper>
  )
}
