import { ROUTES } from '@/shared/constants'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { Box, Button, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'

export const NotFoundPage = () => {
  const { t } = useTranslation()

  return (
    <Box
      sx={theme => ({
        position: 'relative',
        overflow: 'hidden',
        minHeight: { xs: 'calc(100dvh - 220px)', md: 'calc(100dvh - 200px)' },
        display: 'grid',
        placeItems: 'center',
        px: { xs: 2, sm: 3 },
        py: { xs: 2, sm: 3 },
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 'auto auto 12% -8%',
          width: 240,
          height: 240,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.26 : 0.14)} 0%, transparent 72%)`,
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: '8% -6% auto auto',
          width: 280,
          height: 280,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, theme.palette.mode === 'dark' ? 0.2 : 0.12)} 0%, transparent 74%)`,
          pointerEvents: 'none',
        },
      })}
    >
      <Box
        sx={theme => ({
          position: 'relative',
          width: '100%',
          maxWidth: 760,
          borderRadius: 6,
          border: `1px solid ${alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.12 : 0.08)}`,
          backgroundColor: alpha(
            theme.palette.background.paper,
            theme.palette.mode === 'dark' ? 0.78 : 0.92,
          ),
          backdropFilter: 'blur(12px)',
          boxShadow:
            theme.palette.mode === 'dark'
              ? `0 20px 40px ${alpha('#000', 0.28)}`
              : `0 18px 36px ${alpha(theme.palette.common.black, 0.08)}`,
          px: { xs: 3, sm: 5 },
          py: { xs: 4, sm: 4.5 },
        })}
      >
        <Stack spacing={3} alignItems="flex-start">
          <Typography
            variant="overline"
            sx={theme => ({
              letterSpacing: '0.18em',
              color: alpha(theme.palette.text.secondary, 0.9),
            })}
          >
            {t('not_found_eyebrow')}
          </Typography>

          <Stack spacing={1.5}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '4.5rem', sm: '6rem', md: '7rem' },
                lineHeight: 0.92,
              }}
            >
              404
            </Typography>
            <Typography variant="h4" sx={{ maxWidth: 520 }}>
              {t('not_found_title')}
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 560 }}>
              {t('not_found_description')}
            </Typography>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ width: '100%' }}>
            <Button
              component={RouterLink}
              to={ROUTES.home}
              variant="contained"
              startIcon={<ArrowBackRoundedIcon />}
            >
              {t('not_found_home')}
            </Button>
            <Button
              component={RouterLink}
              to={ROUTES.search}
              variant="outlined"
              startIcon={<SearchRoundedIcon />}
            >
              {t('not_found_search')}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}
