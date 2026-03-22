import { MovieGrid } from '@/features/movies/ui/MovieGrid/MovieGrid'
import { MovieGridSkeleton } from '@/features/movies/ui/MovieGrid/MovieGridSkeleton'
import { useApiLanguage, useDebounceValue } from '@/hooks'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { Box, IconButton, InputAdornment, Pagination, TextField, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { useTranslation } from 'react-i18next'
import { useGetSearchMoviesQuery } from '@/features/movies/api/moviesApi'

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const queryFromUrl = searchParams.get('q') || ''
  const pageParam = Number(searchParams.get('page') || '1')
  const { t } = useTranslation()
  const apiLanguage = useApiLanguage()
  const pageTopRef = useRef<HTMLDivElement | null>(null)

  const [query, setQuery] = useState(queryFromUrl)
  const debouncedQuery = useDebounceValue(query, 500)
  const currentPage = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1

  const { data, isLoading, isFetching } = useGetSearchMoviesQuery(
    { query: debouncedQuery, page: currentPage, language: apiLanguage },
    { skip: !debouncedQuery },
  )
  const shouldShowResultsSkeleton = Boolean(debouncedQuery) && (isLoading || isFetching)
  const totalPages = Math.max(1, data?.total_pages ?? 1)
  const paginationPage = Math.min(currentPage, totalPages)

  useEffect(() => {
    setQuery(queryFromUrl)
  }, [queryFromUrl])

  useEffect(() => {
    const normalizedQuery = debouncedQuery.trim()

    if (normalizedQuery === queryFromUrl) return

    setSearchParams(normalizedQuery ? { q: normalizedQuery } : {}, { replace: true })
  }, [debouncedQuery, queryFromUrl, setSearchParams])

  const handleClearSearch = () => {
    setQuery('')
  }

  const handlePageChange = (_: React.ChangeEvent<unknown>, nextPage: number) => {
    const normalizedQuery = debouncedQuery.trim()
    if (!normalizedQuery) return

    setSearchParams(
      nextPage > 1 ? { q: normalizedQuery, page: String(nextPage) } : { q: normalizedQuery },
    )
    pageTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <Box ref={pageTopRef} sx={{ px: { xs: 2, sm: 3 }, py: 3, minWidth: 0 }}>
      <TextField
        type="text"
        inputMode="search"
        fullWidth
        label={t('search')}
        placeholder={t('search_page_placeholder')}
        value={query}
        onChange={e => setQuery(e.target.value)}
        slotProps={{
          input: {
            endAdornment: query ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label={t('search_page_clear')}
                  onClick={handleClearSearch}
                  edge="end"
                  size="small"
                  sx={{
                    mr: 0.25,
                    width: 32,
                    height: 32,
                  }}
                >
                  <CloseRoundedIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : undefined,
          },
        }}
        sx={theme => ({
          maxWidth: 760,
          '& .MuiInputLabel-root': {
            color: theme.palette.text.secondary,
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color:
              theme.palette.mode === 'dark'
                ? theme.palette.primary.light
                : theme.palette.primary.main,
          },
          '& .MuiOutlinedInput-root': {
            borderRadius: 2.5,
            backgroundColor: alpha(
              theme.palette.background.paper,
              theme.palette.mode === 'dark' ? 0.72 : 0.92,
            ),
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: alpha(
                theme.palette.primary.main,
                theme.palette.mode === 'dark' ? 0.4 : 0.25,
              ),
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: alpha(
                theme.palette.primary.main,
                theme.palette.mode === 'dark' ? 0.68 : 0.45,
              ),
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main,
            },
          },
          '& .MuiInputBase-input::placeholder': {
            color: alpha(theme.palette.text.secondary, 0.9),
            opacity: 1,
          },
        })}
      />

      {!query && <Typography sx={{ mt: 3 }}>{t('search_page_empty')}</Typography>}

      {shouldShowResultsSkeleton && (
        <Box sx={{ mt: 3 }}>
          <MovieGridSkeleton cards={12} />
        </Box>
      )}

      {debouncedQuery && !shouldShowResultsSkeleton && data && data.results.length === 0 && (
        <Typography sx={{ mt: 3 }}>
          {t('search_page_no_results', { query: debouncedQuery })}
        </Typography>
      )}

      {!shouldShowResultsSkeleton && data && data.results.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <MovieGrid movies={data.results} />

          {totalPages > 1 && (
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
              <Pagination
                page={paginationPage}
                count={totalPages}
                color="primary"
                size="medium"
                onChange={handlePageChange}
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}
