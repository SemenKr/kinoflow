import { Box, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { IMAGE_BASE } from '@/shared/constants'
import type { MovieCastMember } from '@/pages/MovieDetailsPage/MovieDetailsPage.utils'
import { createImageFallbackUrl } from '@/shared/utils/imageFallback'

interface Props {
  actor: MovieCastMember
}

const FALLBACK = createImageFallbackUrl({
  width: 80,
  height: 112,
  label: 'No Photo',
})

export const ActorCard = ({ actor }: Props) => {
  const image = actor.profile_path ? `${IMAGE_BASE}/w185${actor.profile_path}` : FALLBACK

  return (
    <Box
      role={'listitem'}
      sx={theme => ({
        width: '100%',
        borderRadius: 1.5,
        p: 0.45,
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
            ? `0 10px 18px ${alpha(theme.palette.common.black, 0.24)}`
            : `0 8px 16px ${alpha(theme.palette.common.black, 0.06)}`,
        transition: 'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease',
        '&:hover': {
          transform: 'translateY(-1px)',
          borderColor: alpha(theme.palette.primary.main, 0.28),
          boxShadow:
            theme.palette.mode === 'dark'
              ? `0 12px 22px ${alpha(theme.palette.common.black, 0.28)}`
              : `0 10px 20px ${alpha(theme.palette.common.black, 0.09)}`,
        },
      })}
    >
      <Box
        sx={{
          position: 'relative',
          mb: 0.45,
          overflow: 'hidden',
          borderRadius: 1,
          aspectRatio: '5 / 7',
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
        variant="caption"
        title={actor.name}
        sx={{
          fontWeight: 700,
          lineHeight: 1.2,
          fontSize: '0.72rem',
          mb: 0.1,
          minHeight: '2.4em',
          display: '-webkit-box',
          overflow: 'hidden',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
        }}
      >
        {actor.name}
      </Typography>

      <Typography
        variant="caption"
        color="text.secondary"
        title={actor.character}
        sx={{
          lineHeight: 1.2,
          fontSize: '0.68rem',
          minHeight: '2.4em',
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
