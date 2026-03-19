import type { SxProps, Theme } from '@mui/material'

export const sectionSx: SxProps<Theme> = {
  mt: 4,
}

export const headerSx: SxProps<Theme> = {
  mb: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 2,
}

export const titleSx: SxProps<Theme> = {
  mb: 0,
}

export const toggleButtonSx: SxProps<Theme> = {
  textTransform: 'none',
  whiteSpace: 'nowrap',
}

export const actorsRowSx: SxProps<Theme> = {
  display: 'flex',
  gap: 2,
  overflowX: 'auto',
  pb: 1,
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
}
