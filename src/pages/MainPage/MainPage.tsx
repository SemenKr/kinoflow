import {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
} from '@/features/movies/api/moviesApi'
import {
  DEFAULT_MOVIE_CATEGORY_QUERY,
  MOVIE_CATEGORY_CONFIG,
  type MovieCategoryTab,
  getMovieCategoryRoute,
} from '@/features/movies/config/movieCategories'
import { MovieCard } from '@/features/movies/ui/MovieGrid/MovieCard/MovieCard'
import { WelcomeSection } from '@/features/movies/ui/WelcomeSection/WelcomeSection'
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

const previewRowStyles = {
  display: 'flex',
  gap: { xs: 1.5, sm: 2 },
  overflowX: 'auto',
  overflowY: 'visible',
  scrollSnapType: 'x proximity',
  overscrollBehaviorX: 'contain',
  WebkitOverflowScrolling: 'touch',
  px: 0.5,
  pt: 1,
  pb: 2,
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}

const previewItemStyles = {
  flex: '0 0 auto',
  width: { xs: 160, sm: 180, md: 200 },
  scrollSnapAlign: 'start',
}

export const MainPage = () => {
  const { t } = useTranslation()
  const queryArgs = useMemo(() => ({ page: 1, ...DEFAULT_MOVIE_CATEGORY_QUERY }), [])

  const popularQuery = useGetPopularMoviesQuery(queryArgs)
  const topRatedQuery = useGetTopRatedMoviesQuery(queryArgs)
  const upcomingQuery = useGetUpcomingMoviesQuery(queryArgs)
  const nowPlayingQuery = useGetNowPlayingMoviesQuery(queryArgs)

  const categoryQueries = useMemo<Record<MovieCategoryTab, typeof popularQuery>>(
    () => ({
      popular: popularQuery,
      'top-rated': topRatedQuery,
      upcoming: upcomingQuery,
      'now-playing': nowPlayingQuery,
    }),
    [nowPlayingQuery, popularQuery, topRatedQuery, upcomingQuery],
  )

  const sections = useMemo(
    () =>
      (Object.keys(MOVIE_CATEGORY_CONFIG) as MovieCategoryTab[]).map(category => ({
      key: category,
      title: t(MOVIE_CATEGORY_CONFIG[category].translationKey),
      to: getMovieCategoryRoute(category),
      query: categoryQueries[category],
      })),
    [categoryQueries, t],
  )

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
                <Box sx={previewRowStyles}>
                  {section.query.data.results.slice(0, PREVIEW_MOVIES_COUNT).map(movie => (
                    <Box key={movie.id} sx={previewItemStyles}>
                      <MovieCard movie={movie} />
                    </Box>
                  ))}
                </Box>
              )}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
