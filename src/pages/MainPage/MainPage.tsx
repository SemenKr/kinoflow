import {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
} from '@/features/movies/api/moviesApi'
import { MovieGrid } from '@/features/movies/ui/MovieGrid/MovieGrid'
import { WelcomeSection } from '@/features/movies/ui/WelcomeSection/WelcomeSection'
import { ROUTES } from '@/shared/constants'
import { SectionLoader } from '@/shared/ui/loading/SectionLoader'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'

const PREVIEW_MOVIES_COUNT = 6

const sectionShellStyles = {
  px: { xs: 2, sm: 3 },
  py: { xs: 4, sm: 5 },
}

export const MainPage = () => {
  const { t } = useTranslation()
  const queryArgs = useMemo(() => ({ page: 1, language: 'en-US', region: 'US' }), [])

  const popularQuery = useGetPopularMoviesQuery(queryArgs)
  const topRatedQuery = useGetTopRatedMoviesQuery(queryArgs)
  const upcomingQuery = useGetUpcomingMoviesQuery(queryArgs)
  const nowPlayingQuery = useGetNowPlayingMoviesQuery(queryArgs)

  const sections = [
    {
      key: 'popular',
      title: t('categories_tab_popular'),
      to: ROUTES.categories,
      query: popularQuery,
    },
    {
      key: 'top-rated',
      title: t('categories_tab_top-rated'),
      to: ROUTES.movieCategory('top-rated'),
      query: topRatedQuery,
    },
    {
      key: 'upcoming',
      title: t('categories_tab_upcoming'),
      to: ROUTES.movieCategory('upcoming'),
      query: upcomingQuery,
    },
    {
      key: 'now-playing',
      title: t('categories_tab_now-playing'),
      to: ROUTES.movieCategory('now-playing'),
      query: nowPlayingQuery,
    },
  ] as const

  return (
    <Box>
      <WelcomeSection />

      <Stack spacing={0}>
        {sections.map(section => (
          <Box key={section.key} sx={sectionShellStyles}>
            <Stack spacing={2.5}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1.5}
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                justifyContent="space-between"
              >
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {section.title}
                </Typography>

                <Button component={RouterLink} to={section.to} variant="outlined">
                  {t('view_more')}
                </Button>
              </Stack>

              {section.query.isLoading && <SectionLoader cards={6} titleWidth="18%" />}

              {section.query.isError && (
                <Typography color="error">{t('categories_page_error')}</Typography>
              )}

              {section.query.data && (
                <MovieGrid movies={section.query.data.results.slice(0, PREVIEW_MOVIES_COUNT)} />
              )}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
