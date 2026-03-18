import { Box, Typography } from '@mui/material'

import { overviewTextSx, sectionTitleSx, surfaceSx } from '../MovieDetailsPage.styles'

interface OverviewSectionProps {
  title: string
  overview: string
}

export const OverviewSection = ({ title, overview }: OverviewSectionProps) => {
  return (
    <Box sx={surfaceSx(700)}>
      <Typography variant="h6" sx={sectionTitleSx}>
        {title}
      </Typography>
      <Typography color="text.secondary" sx={overviewTextSx}>
        {overview}
      </Typography>
    </Box>
  )
}
