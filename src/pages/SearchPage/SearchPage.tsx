import { MovieGrid } from '@/features/movies/ui/MovieGrid/MovieGrid'
import { useDebounceValue } from '@/hooks'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { useTranslation } from 'react-i18next'
import { useGetSearchMoviesQuery } from '@/features/movies/api/moviesApi'

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const queryFromUrl = searchParams.get('q') || ''
  const { t } = useTranslation()

  const [query, setQuery] = useState(queryFromUrl)
  const debouncedQuery = useDebounceValue(query, 500)

  const { data, isLoading } = useGetSearchMoviesQuery(
    { query: debouncedQuery, page: 1 },
    { skip: !debouncedQuery },
  )

  useEffect(() => {
    if (debouncedQuery) {
      setSearchParams({ q: debouncedQuery })
      return
    }
    setSearchParams({})
  }, [debouncedQuery, setSearchParams])

  const handleClearSearch = () => {
    setQuery('')
  }

  return (
    <Box sx={{ p: 3 }}>
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

      {isLoading && <Typography sx={{ mt: 3 }}>{t('loading')}</Typography>}

      {debouncedQuery && data && data.results.length === 0 && (
        <Typography sx={{ mt: 3 }}>
          {t('search_page_no_results', { query: debouncedQuery })}
        </Typography>
      )}

      {data && data.results.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <MovieGrid movies={data.results} />
        </Box>
      )}
    </Box>
  )
}
