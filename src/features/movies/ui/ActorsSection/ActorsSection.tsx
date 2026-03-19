import type { MovieCastMember } from '@/pages/MovieDetailsPage/MovieDetailsPage.utils'
import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActorCard } from './ActorCard'
import {
  actionsSx,
  actorsGridSx,
  headerSx,
  sectionSx,
  titleSx,
  toggleButtonSx,
} from './ActorsSection.styles'

interface Props {
  title: string
  actors: MovieCastMember[]
}

const INITIAL_VISIBLE_ACTORS = 6
const LOAD_MORE_STEP = 6

export const ActorsSection = ({ title, actors }: Props) => {
  const { t } = useTranslation()
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_ACTORS)
  const canExpand = actors.length > visibleCount
  const canCollapse = visibleCount > INITIAL_VISIBLE_ACTORS
  const visibleActors = actors.slice(0, visibleCount)
  if (!actors.length) return null

  return (
    <Box sx={sectionSx}>
      <Box sx={headerSx}>
        <Typography variant="h6" sx={titleSx}>
          {title}
        </Typography>
      </Box>

      <Box role={'list'} sx={actorsGridSx}>
        {visibleActors.map(actor => (
          <ActorCard key={actor.id} actor={actor} />
        ))}
      </Box>

      {(canExpand || canCollapse) && (
        <Box sx={actionsSx}>
          {canExpand && (
            <Button
              size="small"
              variant="text"
              onClick={() =>
                setVisibleCount(prev => Math.min(prev + LOAD_MORE_STEP, actors.length))
              }
              sx={toggleButtonSx}
            >
              {t('movie_details_cast_expand')}
            </Button>
          )}

          {canCollapse && (
            <Button
              size="small"
              variant="text"
              onClick={() => setVisibleCount(INITIAL_VISIBLE_ACTORS)}
              sx={toggleButtonSx}
            >
              {t('movie_details_cast_collapse')}
            </Button>
          )}
        </Box>
      )}
    </Box>
  )
}
