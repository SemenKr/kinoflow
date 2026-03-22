import { Box, Chip, Typography } from '@mui/material'

import { filterLabelSx, filterSectionSx, genresWrapSx } from '../../FilteredMoviesPage.styles'
import type { GenreOption } from '../../FilteredMoviesPage.types'

interface GenresListProps {
  label: string
  genres: GenreOption[]
  selectedGenres: number[]
  onToggle: (genreId: number) => void
}

export const GenresList = ({
  label,
  genres,
  selectedGenres,
  onToggle,
}: GenresListProps) => {
  return (
    <Box sx={filterSectionSx}>
      <Typography variant="body2" sx={filterLabelSx}>
        {label}
      </Typography>

      <Box sx={genresWrapSx}>
        {genres.map(genre => {
          const isSelected = selectedGenres.includes(genre.id)

          return (
            <Chip
              key={genre.id}
              label={genre.name}
              clickable
              color={isSelected ? 'primary' : 'default'}
              variant={isSelected ? 'filled' : 'outlined'}
              onClick={() => onToggle(genre.id)}
            />
          )
        })}
      </Box>
    </Box>
  )
}
