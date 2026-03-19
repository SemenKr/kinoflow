import { Box, Button, Typography } from '@mui/material'
import type { MovieCastMember } from '@/pages/MovieDetailsPage/MovieDetailsPage.utils'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActorCard } from './ActorCard'
import { actorsRowSx, headerSx, sectionSx, titleSx, toggleButtonSx } from './ActorsSection.styles'

interface Props {
  title: string
  actors: MovieCastMember[]
}

const INITIAL_VISIBLE_ACTORS = 12

export const ActorsSection = ({ title, actors }: Props) => {
  const { t } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(false)
  const canToggle = actors.length > INITIAL_VISIBLE_ACTORS
  const visibleActors = useMemo(
    () => (isExpanded ? actors : actors.slice(0, INITIAL_VISIBLE_ACTORS)),
    [actors, isExpanded],
  )
  if (!actors.length) return null

  return (
    <Box sx={sectionSx}>
      <Box sx={headerSx}>
        <Typography variant="h6" sx={titleSx}>
          {title}
        </Typography>

        {canToggle && (
          <Button
            size="small"
            variant="text"
            onClick={() => setIsExpanded(prev => !prev)}
            sx={toggleButtonSx}
            aria-expanded={isExpanded}
          >
            {isExpanded ? t('movie_details_cast_collapse') : t('movie_details_cast_expand')}
          </Button>
        )}
      </Box>

      <Box sx={actorsRowSx}>
        {visibleActors.map(actor => (
          <ActorCard key={actor.id} actor={actor} />
        ))}
      </Box>
    </Box>
  )
}
