import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded'
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded'
import { Box, Button, Chip, Typography } from '@mui/material'

import { resultsActionsSx, resultsHeaderSx } from '../FilteredMoviesPage.styles'

interface ResultsHeaderProps {
  title: string
  subtitle: string
  isMobile: boolean
  hasActiveFilters: boolean
  activeFilterCount: number
  resetLabel: string
  showFiltersLabel: string
  resultsCountLabel: string
  activeFiltersLabel: string
  onOpenFilters: () => void
  onReset: () => void
}

export const ResultsHeader = ({
  title,
  subtitle,
  isMobile,
  hasActiveFilters,
  activeFilterCount,
  resetLabel,
  showFiltersLabel,
  resultsCountLabel,
  activeFiltersLabel,
  onOpenFilters,
  onReset,
}: ResultsHeaderProps) => {
  return (
    <Box sx={resultsHeaderSx}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
          {subtitle}
        </Typography>
      </Box>

      <Box sx={resultsActionsSx}>
        {isMobile && (
          <Button variant="contained" startIcon={<FilterListRoundedIcon />} onClick={onOpenFilters}>
            {showFiltersLabel}
          </Button>
        )}

        <Button
          variant="text"
          startIcon={<RestartAltRoundedIcon />}
          onClick={onReset}
          disabled={!hasActiveFilters}
        >
          {resetLabel}
        </Button>

        <Chip label={resultsCountLabel} color="default" variant="outlined" />

        <Chip
          label={activeFiltersLabel}
          color={activeFilterCount > 0 ? 'primary' : 'default'}
          variant={activeFilterCount > 0 ? 'filled' : 'outlined'}
        />
      </Box>
    </Box>
  )
}
