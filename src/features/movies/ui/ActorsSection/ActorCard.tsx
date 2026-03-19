import { Box, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { IMAGE_BASE } from '@/shared/constants'
import type { MovieCastMember } from '@/pages/MovieDetailsPage/MovieDetailsPage.utils'
import { createImageFallbackUrl } from '@/shared/utils/imageFallback'

interface Props {
  actor: MovieCastMember
  isGrid?: boolean
}

const FALLBACK = createImageFallbackUrl({
  width: 128,
  height: 160,
  label: 'No Photo',
})

export const ActorCard = ({ actor, isGrid = false }: Props) => {
  const image = actor.profile_path ? `${IMAGE_BASE}/w185${actor.profile_path}` : FALLBACK

  return (
    <Box
      role={'listitem'}
      sx={theme => ({
        width: isGrid ? '100%' : { xs: 108, sm: 118, md: 128 },
        maxWidth: isGrid ? 'none' : { xs: 108, sm: 118, md: 128 },
        flexShrink: 0,
        scrollSnapAlign: isGrid ? 'none' : 'start',
        scrollSnapStop: isGrid ? 'normal' : 'always',
        borderRadius: 2,
        p: 0.625,
        backgroundColor: alpha(
          theme.palette.background.paper,
          theme.palette.mode === 'dark' ? 0.58 : 0.88,
        ),
        border: `1px solid ${alpha(
          theme.palette.text.primary,
          theme.palette.mode === 'dark' ? 0.12 : 0.08,
        )}`,
        boxShadow:
          theme.palette.mode === 'dark'
            ? `0 14px 28px ${alpha(theme.palette.common.black, 0.3)}`
            : `0 12px 26px ${alpha(theme.palette.common.black, 0.08)}`,
        transition: 'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          borderColor: alpha(theme.palette.primary.main, 0.28),
          boxShadow:
            theme.palette.mode === 'dark'
              ? `0 18px 34px ${alpha(theme.palette.common.black, 0.38)}`
              : `0 16px 32px ${alpha(theme.palette.common.black, 0.12)}`,
        },
      })}
    >
      <Box
        sx={{
          position: 'relative',
          mb: 0.75,
          overflow: 'hidden',
          borderRadius: 1.25,
          aspectRatio: '4 / 5',
          backgroundColor: 'action.hover',
        }}
      >
        <Box
          component="img"
          src={image}
          alt={actor.name}
          loading="lazy"
          onError={event => {
            if (!event.currentTarget.src.includes('data:image')) {
              event.currentTarget.src = FALLBACK
            }
          }}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
          }}
        />
      </Box>

      <Typography
        variant="subtitle2"
        title={actor.name}
        sx={{
          fontWeight: 700,
          lineHeight: 1.25,
          mb: 0.2,
          minHeight: '2.6em',
          display: '-webkit-box',
          overflow: 'hidden',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
        }}
      >
        {actor.name}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        title={actor.character}
        sx={{
          lineHeight: 1.35,
          minHeight: '2.9em',
          display: '-webkit-box',
          overflow: 'hidden',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
        }}
      >
        {actor.character}
      </Typography>
    </Box>
  )
}
