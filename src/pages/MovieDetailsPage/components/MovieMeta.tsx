import { Box, Chip, Stack, Typography } from '@mui/material'

import {
  fadeUpSx,
  genreChipSx,
  genresRowSx,
  metaChipsSx,
  ratingBadgeSx,
  scoreRowSx,
  taglineSx,
  titleSx,
} from '../MovieDetailsPage.styles'
import type { Genre } from '../MovieDetailsPage.utils'

interface MovieMetaProps {
  title: string
  tagline: string | null
  releaseDateLabel: string
  runtimeLabel: string
  status: string
  adultLabel: string
  ratingColor: string
  ratingPercent: number
  ratingValue: string
  userScoreLabel: string
  votesLabel: string
  votesText: string
  genres: Genre[]
}

export const MovieMeta = ({
  title,
  tagline,
  releaseDateLabel,
  runtimeLabel,
  status,
  adultLabel,
  ratingColor,
  ratingPercent,
  ratingValue,
  userScoreLabel,
  votesLabel,
  votesText,
  genres,
}: MovieMetaProps) => {
  return (
    <Box sx={fadeUpSx(560)}>
      <Typography variant="h3" sx={titleSx}>
        {title}
      </Typography>

      {!!tagline && <Typography sx={taglineSx}>{tagline}</Typography>}

      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={metaChipsSx}>
        <Chip label={releaseDateLabel} size="small" />
        <Chip label={runtimeLabel} size="small" />
        <Chip label={status} size="small" />
        <Chip label={adultLabel} size="small" />
      </Stack>

      <Stack direction="row" spacing={2} alignItems="center" sx={scoreRowSx}>
        <Box sx={ratingBadgeSx(ratingColor, ratingPercent)}>{ratingValue}</Box>

        <Typography variant="body1" sx={{ fontWeight: 600, minWidth: 0 }}>
          {userScoreLabel}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ minWidth: 0, overflowWrap: 'anywhere' }}
        >
          {votesLabel} {votesText}
        </Typography>
      </Stack>

      {genres.length > 0 && (
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={genresRowSx}>
          {genres.map(genre => (
            <Chip key={genre.id} label={genre.name} size="small" sx={genreChipSx} />
          ))}
        </Stack>
      )}
    </Box>
  )
}
