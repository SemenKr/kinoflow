import { MovieCard } from '@/features/movies/ui/MovieGrid/MovieCard/MovieCard'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import type { Movie } from '@/features/movies/api/moviesApi.types'

interface Props {
  movies: Movie[]
}

export const MovieGrid = ({ movies }: Props) => {
  const { t } = useTranslation()

  if (movies.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
        {t('movie_grid_empty')}
      </Typography>
    )
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))',
        gap: { xs: 1.75, md: 2.25 },
      }}
    >
      {movies.map(movie => (
        <Box key={movie.id} sx={{ width: '100%', maxWidth: 188, mx: 'auto' }}>
          <MovieCard movie={movie} />
        </Box>
      ))}
    </Box>
  )
}
