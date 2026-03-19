import { Box, Chip, Divider, Stack, Typography } from '@mui/material'

import {
  dividerSx,
  languageRowSx,
  productionBoxSx,
  sectionTitleSx,
  subtitleSx,
  surfaceSx,
} from '../MovieDetailsPage.styles'
import type {
  ProductionCompany,
  ProductionCountry,
  SpokenLanguage,
} from '../MovieDetailsPage.utils'

interface ProductionSectionProps {
  spokenLanguagesTitle: string
  countriesTitle: string
  productionTitle: string
  spokenLanguages: SpokenLanguage[]
  productionCountries: ProductionCountry[]
  productionCompanies: ProductionCompany[]
}

export const ProductionSection = ({
  spokenLanguagesTitle,
  countriesTitle,
  productionTitle,
  spokenLanguages,
  productionCountries,
  productionCompanies,
}: ProductionSectionProps) => {
  return (
    <>
      <Box sx={surfaceSx(760)}>
        <Typography variant="subtitle2" color="text.secondary" sx={subtitleSx}>
          {spokenLanguagesTitle}
        </Typography>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={languageRowSx}>
          {spokenLanguages.map(language => (
            <Chip
              key={language.iso_639_1}
              size="small"
              label={language.name || language.english_name}
            />
          ))}
        </Stack>

        <Divider sx={dividerSx} />

        <Typography variant="subtitle2" color="text.secondary" sx={subtitleSx}>
          {countriesTitle}
        </Typography>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          {productionCountries.map(country => (
            <Chip key={country.iso_3166_1} size="small" label={country.name} />
          ))}
        </Stack>
      </Box>

      {productionCompanies.length > 0 && (
        <Box sx={theme => ({ ...productionBoxSx, ...surfaceSx(820)(theme) })}>
          <Typography variant="h6" sx={sectionTitleSx}>
            {productionTitle}
          </Typography>
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            {productionCompanies.map(company => (
              <Chip key={company.id} size="small" label={company.name} />
            ))}
          </Stack>
        </Box>
      )}
    </>
  )
}
