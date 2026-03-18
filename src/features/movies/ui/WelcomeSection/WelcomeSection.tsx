import { useRandomBackdrop } from '@/hooks'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import {
  buttonStyles,
  containerStyles,
  contentWrapperStyles,
  inputStyles,
  overlayStyles,
  searchRowStyles,
  textContainerStyles,
} from './WelcomeSection.styles'

export const WelcomeSection = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const { t } = useTranslation()
  const backdrop = useRandomBackdrop()

  const handleSearch = useCallback(() => {
    const trimmedQuery = query.trim()
    if (!trimmedQuery) return

    navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`)
  }, [query, navigate])

  return (
    <Box sx={containerStyles(backdrop)}>
      {/* overlay */}
      <Box sx={overlayStyles} />

      <Box sx={contentWrapperStyles}>
        <Box sx={textContainerStyles}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
            {t('welcome_title')}
          </Typography>

          <Typography variant="subtitle1" sx={{ opacity: 0.9, mb: 3 }}>
            {t('welcome_subtitle')}
          </Typography>

          <Box sx={searchRowStyles}>
            <TextField
              autoFocus
              placeholder={t('welcome_placeholder')}
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              variant="outlined"
              size="medium"
              fullWidth
              label={t('search')}
              aria-label="search movies"
              sx={inputStyles}
            />

            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={!query.trim()}
              sx={buttonStyles}
            >
              {t('search')}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
