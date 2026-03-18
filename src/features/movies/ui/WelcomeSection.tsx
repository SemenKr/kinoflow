import { useMemo, useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useGetPopularMoviesQuery } from '@/features/movies/api/moviesApi'

export const WelcomeSection = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const { t } = useTranslation()
  const { data } = useGetPopularMoviesQuery({ page: 1 })

  const selectedBackdropPath = useMemo(() => {
    if (!data?.results.length) return ''

    const randomValue = crypto.getRandomValues(new Uint32Array(1))[0]
    const index = randomValue % data.results.length

    return data.results[index]?.backdrop_path ?? ''
  }, [data])

  const backdrop = selectedBackdropPath
    ? `https://image.tmdb.org/t/p/original${selectedBackdropPath}`
    : ''

  const handleSearch = () => {
    const trimmedQuery = query.trim()
    if (!trimmedQuery) return
    navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`)
  }

  return (
    <Box
      sx={{
        minHeight: 400,
        height: 'calc(100vh / 2.5)',
        maxHeight: 460,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',

        backgroundImage: backdrop ? `url(${backdrop})` : 'none',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',

        position: 'relative',
        color: '#fff',
      }}
    >
      {/* overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
        }}
      />

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 1200,
          px: 4,
        }}
      >
        <Box sx={{ maxWidth: 500 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
            {t('welcome_title')}
          </Typography>

          <Typography variant="subtitle1" sx={{ opacity: 0.9, mb: 3 }}>
            {t('welcome_subtitle')}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <TextField
              placeholder={t('search_placeholder')}
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleSearch()
              }}
              variant="outlined"
              size="medium"
              fullWidth
              sx={theme => ({
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2.5,
                  backgroundColor: alpha(
                    theme.palette.background.paper,
                    theme.palette.mode === 'dark' ? 0.72 : 0.9,
                  ),
                  backdropFilter: 'blur(6px)',
                  color: theme.palette.text.primary,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: alpha(
                      theme.palette.primary.main,
                      theme.palette.mode === 'dark' ? 0.42 : 0.25,
                    ),
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: alpha(
                      theme.palette.primary.main,
                      theme.palette.mode === 'dark' ? 0.72 : 0.48,
                    ),
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.main,
                  },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: alpha(theme.palette.text.secondary, 0.95),
                  opacity: 1,
                },
              })}
            />

            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={!query.trim()}
              sx={theme => ({
                borderRadius: 2.5,
                px: 3,
                minWidth: 116,
                '&.Mui-disabled': {
                  backgroundColor: alpha(
                    theme.palette.background.paper,
                    theme.palette.mode === 'dark' ? 0.26 : 0.44,
                  ),
                  color: alpha(theme.palette.text.primary, 0.6),
                },
              })}
            >
              {t('search')}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
