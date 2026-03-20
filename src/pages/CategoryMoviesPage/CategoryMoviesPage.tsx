import {
  DEFAULT_MOVIE_CATEGORY,
  DEFAULT_MOVIE_CATEGORY_QUERY,
  getMovieCategoryRoute,
  isMovieCategoryTab,
  MOVIE_CATEGORY_CONFIG,
  MOVIE_CATEGORY_TABS,
} from '@/features/movies/config/movieCategories'
import { useMovieCategoryQueries } from '@/features/movies/model/useMovieCategoryQueries'
import { MovieGrid } from '@/features/movies/ui/MovieGrid/MovieGrid'
import { InlineLoader } from '@/shared/ui/loading/InlineLoader'
import { SectionLoader } from '@/shared/ui/loading/SectionLoader'
import { Box, Button, Pagination, Stack, Tab, Tabs, Typography } from '@mui/material'
import { type ChangeEvent, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams, useSearchParams } from 'react-router-dom'

const MOVIES_PER_PAGE = 20

export const CategoryMoviesPage = () => {
  const { t } = useTranslation()
  const { category } = useParams<{ category?: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const previousCategoryRef = useRef<string | undefined>(category)
  const pageTopRef = useRef<HTMLDivElement | null>(null)

  const activeCategory = isMovieCategoryTab(category) ? category : DEFAULT_MOVIE_CATEGORY
  const pageParam = Number(searchParams.get('page') || '1')
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1
  const queryArgs = { page, ...DEFAULT_MOVIE_CATEGORY_QUERY }
  const categoryQueries = useMovieCategoryQueries(queryArgs, { activeCategory })

  useEffect(() => {
    if (previousCategoryRef.current === category) return

    previousCategoryRef.current = category

    if (!searchParams.get('page')) return
    setSearchParams({})
  }, [category, searchParams, setSearchParams])

  const activeQuery = categoryQueries[activeCategory]

  const handlePageChange = (_: ChangeEvent<unknown>, nextPage: number) => {
    setSearchParams(nextPage > 1 ? { page: String(nextPage) } : {})
    pageTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleRetry = () => {
    void activeQuery.refetch()
  }

  const totalPages = Math.max(1, activeQuery.data?.total_pages ?? 1)
  const currentPage = Math.min(page, totalPages)
  const activeCategoryLabel = t(MOVIE_CATEGORY_CONFIG[activeCategory].translationKey)

  return (
    <Box ref={pageTopRef} sx={{ px: { xs: 2, sm: 3 }, py: 3, minWidth: 0 }}>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {t('categories_page_title')}
          </Typography>
          <Typography color="text.secondary">{t('categories_page_subtitle')}</Typography>
        </Stack>

        <Tabs
          aria-label="movie categories"
          value={activeCategory}
          variant="scrollable"
          allowScrollButtonsMobile
          sx={{
            minHeight: 44,
            '& .MuiTabs-flexContainer': {
              gap: 1,
            },
            '& .MuiTab-root': {
              minHeight: 44,
              px: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              border: theme => `1px solid ${theme.palette.divider}`,
              color: 'text.secondary',
              transition: 'background-color 160ms ease, color 160ms ease, border-color 160ms ease',
            },
            '& .MuiTab-root.Mui-selected': {
              color: 'primary.contrastText',
              backgroundColor: 'primary.main',
              borderColor: 'primary.main',
            },
            '& .MuiTabs-indicator': {
              display: 'none',
            },
          }}
        >
          {MOVIE_CATEGORY_TABS.map(tab => (
            <Tab
              key={tab}
              value={tab}
              label={t(MOVIE_CATEGORY_CONFIG[tab].translationKey)}
              component={Link}
              to={getMovieCategoryRoute(tab)}
            />
          ))}
        </Tabs>

        <Stack spacing={0.5}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {activeCategoryLabel}
          </Typography>
          <Typography color="text.secondary">
            {t('categories_page_results_hint', { page: currentPage })}
          </Typography>
        </Stack>

        {activeQuery.isLoading && <SectionLoader cards={6} titleWidth="24%" />}

        {activeQuery.isError && (
          <Stack spacing={1.5} sx={{ py: 2 }}>
            <Typography color="error">{t('categories_page_error')}</Typography>
            <Box>
              <Button variant="outlined" onClick={handleRetry}>
                {t('movie_details_retry')}
              </Button>
            </Box>
          </Stack>
        )}

        {activeQuery.data && (
          <Stack spacing={3}>
            {activeQuery.isFetching && !activeQuery.isLoading && (
              <InlineLoader label={t('loading')} />
            )}

            <MovieGrid movies={activeQuery.data.results} />

            {activeQuery.data.total_results > MOVIES_PER_PAGE && (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                  page={currentPage}
                  count={totalPages}
                  color="primary"
                  size="medium"
                  onChange={handlePageChange}
                />
              </Box>
            )}
          </Stack>
        )}
      </Stack>
    </Box>
  )
}
