import { Box, Container, Stack } from '@mui/material'

import {
  fadeUpSx,
  heroContainerSx,
  heroContentGridSx,
  heroOverlaySx,
  heroSectionSx,
  heroStackDirection,
  heroStackSpacing,
  posterSx,
} from '../MovieDetailsPage.styles'
import type { Genre } from '../MovieDetailsPage.utils'
import { MovieMeta } from './MovieMeta'
import { QuickFacts } from './QuickFacts'

interface HeroSectionProps {
  media: {
    backdrop: string
    poster: string
    posterFallback: string
  }
  title: string
  tagline: string | null
  meta: {
    releaseDateLabel: string
    runtime: string
    status: string
    adult: boolean
  }
  metaLabels: {
    runtime: string
    status: string
    adult: string
    yes: string
    no: string
  }
  rating: {
    color: string
    percent: number
    value: string
    userScoreLabel: string
  }
  stats: {
    votesLabel: string
    votesText: string
  }
  genres: Genre[]
  facts: {
    factsTitle: string
    budgetLabelText: string
    revenueLabelText: string
    languageLabelText: string
    popularityLabelText: string
    originalTitleLabelText: string
    collectionLabelText: string
    budgetValue: string
    revenueValue: string
    languageValue: string
    popularityValue: string
    originalTitleValue: string
    collectionValue?: string | null
    homepage?: string | null
    homepageLabel: string
    imdbId?: string | null
  }
}

export const HeroSection = ({
  media,
  title,
  tagline,
  meta,
  metaLabels,
  rating,
  stats,
  genres,
  facts,
}: HeroSectionProps) => {
  return (
    <Box sx={heroSectionSx(media.backdrop)}>
      <Box sx={heroOverlaySx} />

      <Container maxWidth="lg" sx={heroContainerSx}>
        <Stack direction={heroStackDirection} spacing={heroStackSpacing}>
          <Box
            component="img"
            src={media.poster}
            alt={title}
            onError={event => {
              if (event.currentTarget.src !== media.posterFallback) {
                event.currentTarget.src = media.posterFallback
              }
            }}
            sx={theme => ({ ...posterSx(theme), ...fadeUpSx(520) })}
          />

          <Box sx={heroContentGridSx}>
            <MovieMeta
              title={title}
              tagline={tagline}
              releaseDateLabel={meta.releaseDateLabel}
              runtimeLabel={`${metaLabels.runtime}: ${meta.runtime}`}
              status={`${metaLabels.status}: ${meta.status}`}
              adultLabel={`${metaLabels.adult}: ${meta.adult ? metaLabels.yes : metaLabels.no}`}
              ratingColor={rating.color}
              ratingPercent={rating.percent}
              ratingValue={rating.value}
              userScoreLabel={rating.userScoreLabel}
              votesLabel={stats.votesLabel}
              votesText={stats.votesText}
              genres={genres}
            />

            <QuickFacts
              factsTitle={facts.factsTitle}
              budgetLabelText={facts.budgetLabelText}
              revenueLabelText={facts.revenueLabelText}
              languageLabelText={facts.languageLabelText}
              popularityLabelText={facts.popularityLabelText}
              originalTitleLabelText={facts.originalTitleLabelText}
              collectionLabelText={facts.collectionLabelText}
              budgetValue={facts.budgetValue}
              revenueValue={facts.revenueValue}
              languageValue={facts.languageValue}
              popularityValue={facts.popularityValue}
              originalTitleValue={facts.originalTitleValue}
              collectionValue={facts.collectionValue}
              homepage={facts.homepage}
              homepageLabel={facts.homepageLabel}
              imdbId={facts.imdbId}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
