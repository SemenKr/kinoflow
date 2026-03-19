import { Box, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { IMAGE_BASE } from '@/shared/constants'
import type { MovieCastMember } from '@/pages/MovieDetailsPage/MovieDetailsPage.utils'
import { createImageFallbackUrl } from '@/shared/utils/imageFallback'

interface Props {
  actor: MovieCastMember
}

const FALLBACK = createImageFallbackUrl({
  width: 184,
  height: 276,
  label: 'No Photo',
})

export const ActorCard = ({ actor }: Props) => {
  const image = actor.profile_path ? `${IMAGE_BASE}/w185${actor.profile_path}` : FALLBACK

  return (
    <Box
      role={'listitem'}
      sx={theme => ({
        width: { xs: 150, sm: 168, md: 184 },
        flexShrink: 0,
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        borderRadius: 2,
        p: 1,
        overflow: 'hidden',
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
          mb: 1.25,
          overflow: 'hidden',
          borderRadius: 1.5,
          aspectRatio: '2 / 3',
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
            display: 'block',
          }}
        />
      </Box>

      <Typography
        variant="subtitle2"
        title={actor.name}
        sx={{
          fontWeight: 700,
          lineHeight: 1.3,
          mb: 0.5,
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
          lineHeight: 1.45,
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
