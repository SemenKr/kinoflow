import { Box, Slider, Typography } from '@mui/material'

import { filterLabelSx, filterSectionSx, ratingValueSx } from '../../FilteredMoviesPage.styles'

interface RatingSliderProps {
  label: string
  valueLabel: string
  min: number
  max: number
  onChange: (min: number, max: number) => void
}

export const RatingSlider = ({ label, valueLabel, min, max, onChange }: RatingSliderProps) => {
  return (
    <Box sx={filterSectionSx}>
      <Typography variant="body2" sx={filterLabelSx}>
        {label}
      </Typography>

      <Slider
        value={[min, max]}
        onChange={(_, value) => {
          const [nextMin, nextMax] = value as number[]
          onChange(nextMin, nextMax)
        }}
        valueLabelDisplay="auto"
        min={0}
        max={10}
        step={0.1}
      />

      <Typography variant="caption" sx={ratingValueSx}>
        {valueLabel}
      </Typography>
    </Box>
  )
}
