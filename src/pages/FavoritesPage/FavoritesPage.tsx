import { Box, Pagination, Stack, Typography } from '@mui/material'
import { useFavorites } from '@/features/favorites/model/useFavorites'
import { favoriteMovieToMovie } from '@/features/favorites/utils/favoritesStorage'
import { MovieGrid } from '@/features/movies/ui/MovieGrid/MovieGrid'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

const FAVORITES_PER_PAGE = 12

export const FavoritesPage = () => {
  const { favorites } = useFavorites()
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const favoriteMovies = useMemo(() => favorites.map(favoriteMovieToMovie), [favorites])
  const totalPages = Math.max(1, Math.ceil(favoriteMovies.length / FAVORITES_PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const paginatedMovies = favoriteMovies.slice(
    (currentPage - 1) * FAVORITES_PER_PAGE,
    currentPage * FAVORITES_PER_PAGE,
  )

  if (!favorites.length) {
    return (
      <Box sx={{ px: { xs: 2, sm: 3 }, py: 3 }}>
        <Stack spacing={1.5}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {t('favorites_page_title')}
          </Typography>
          <Typography color="text.secondary">{t('favorites_page_subtitle')}</Typography>
          <Typography>{t('favorites_empty')}</Typography>
        </Stack>
      </Box>
    )
  }

  return (
    <Box sx={{ px: { xs: 2, sm: 3 }, py: 3 }}>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {t('favorites_page_title')}
          </Typography>
          <Typography color="text.secondary">
            {t('favorites_page_count', { count: favoriteMovies.length })}
          </Typography>
        </Stack>

        <MovieGrid movies={paginatedMovies} />

        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              page={currentPage}
              count={totalPages}
              color="primary"
              size="medium"
              onChange={(_, nextPage) => setPage(nextPage)}
            />
          </Box>
        )}
      </Stack>
    </Box>
  )
}
