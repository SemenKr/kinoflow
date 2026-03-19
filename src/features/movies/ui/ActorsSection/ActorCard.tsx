import { Box, Typography } from '@mui/material'
import { IMAGE_BASE } from '@/shared/constants'
import type { MovieCastMember } from '@/pages/MovieDetailsPage/MovieDetailsPage.utils'
import { createImageFallbackUrl } from '@/shared/utils/imageFallback'

interface Props {
  actor: MovieCastMember
}

const FALLBACK = createImageFallbackUrl({
  width: 120,
  height: 180,
  label: 'No Photo',
})

export const ActorCard = ({ actor }: Props) => {
  const image = actor.profile_path ? `${IMAGE_BASE}/w185${actor.profile_path}` : FALLBACK

  return (
    <Box sx={{ width: 120, flexShrink: 0 }}>
      <Box
        component="img"
        src={image}
        alt={actor.name}
        loading="lazy"
        onError={event => {
          if (event.currentTarget.src !== FALLBACK) {
            event.currentTarget.src = FALLBACK
          }
        }}
        sx={{
          width: '100%',
          height: 180,
          objectFit: 'cover',
          borderRadius: 2,
          mb: 1,
        }}
      />

      <Typography variant="subtitle2" noWrap sx={{ fontWeight: 600 }}>
        {actor.name}
      </Typography>

      <Typography variant="caption" color="text.secondary" noWrap>
        {actor.character}
      </Typography>
    </Box>
  )
}
