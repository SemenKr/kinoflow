import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import { Box, Button, Stack, Typography } from '@mui/material'

import {
  actionButtonsSx,
  fadeUpSx,
  quickFactsCardSx,
  quickFactsStackSx,
  quickFactsTitleSx,
} from '../MovieDetailsPage.styles'

interface QuickFactsProps {
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

export const QuickFacts = ({
  factsTitle,
  budgetLabelText,
  revenueLabelText,
  languageLabelText,
  popularityLabelText,
  originalTitleLabelText,
  collectionLabelText,
  budgetValue,
  revenueValue,
  languageValue,
  popularityValue,
  originalTitleValue,
  collectionValue,
  homepage,
  homepageLabel,
  imdbId,
}: QuickFactsProps) => {
  return (
    <Box sx={theme => ({ ...quickFactsCardSx(theme), ...fadeUpSx(640) })}>
      <Typography variant="subtitle2" color="text.secondary" sx={quickFactsTitleSx}>
        {factsTitle}
      </Typography>

      <Stack spacing={quickFactsStackSx.spacing}>
        <Typography variant="body2">
          <strong>{budgetLabelText}:</strong> {budgetValue}
        </Typography>
        <Typography variant="body2">
          <strong>{revenueLabelText}:</strong> {revenueValue}
        </Typography>
        <Typography variant="body2">
          <strong>{languageLabelText}:</strong> {languageValue}
        </Typography>
        <Typography variant="body2">
          <strong>{popularityLabelText}:</strong> {popularityValue}
        </Typography>
        <Typography variant="body2">
          <strong>{originalTitleLabelText}:</strong> {originalTitleValue}
        </Typography>
        {!!collectionValue && (
          <Typography variant="body2">
            <strong>{collectionLabelText}:</strong> {collectionValue}
          </Typography>
        )}
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.1} sx={actionButtonsSx}>
        {homepage && (
          <Button
            variant="contained"
            href={homepage}
            target="_blank"
            rel="noreferrer"
            endIcon={<OpenInNewRoundedIcon fontSize="small" />}
          >
            {homepageLabel}
          </Button>
        )}

        {imdbId && (
          <Button
            variant="outlined"
            href={`https://www.imdb.com/title/${imdbId}`}
            target="_blank"
            rel="noreferrer"
            endIcon={<OpenInNewRoundedIcon fontSize="small" />}
          >
            IMDb
          </Button>
        )}
      </Stack>
    </Box>
  )
}
