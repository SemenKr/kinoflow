import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'

import { filterLabelSx, filterSectionSx } from '../../FilteredMoviesPage.styles'
import type { SortOption } from '../../FilteredMoviesPage.types'

interface SortSelectProps {
  label: string
  value: string
  options: SortOption[]
  onChange: (value: string) => void
}

export const SortSelect = ({ label, value, options, onChange }: SortSelectProps) => {
  return (
    <Box sx={filterSectionSx}>
      <Typography variant="body2" sx={filterLabelSx}>
        {label}
      </Typography>

      <FormControl fullWidth size="small">
        <InputLabel>{label}</InputLabel>

        <Select value={value} label={label} onChange={event => onChange(event.target.value)}>
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
