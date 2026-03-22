import type { SxProps, Theme } from '@mui/material'

export const sectionSx: SxProps<Theme> = {
  mt: 4,
  mb: 1,
}

export const headerSx: SxProps<Theme> = {
  mb: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: 2,
}

export const titleSx: SxProps<Theme> = {
  mb: 0,
  fontWeight: 700,
}

export const toggleButtonSx: SxProps<Theme> = {
  textTransform: 'none',
  whiteSpace: 'nowrap',
  borderRadius: 999,
  px: 1.5,
}

export const actionsSx: SxProps<Theme> = {
  mt: 2,
  display: 'flex',
  flexWrap: 'wrap',
  gap: 1,
}

export const actorsGridSx: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: {
    xs: 'repeat(3, minmax(0, 1fr))',
    sm: 'repeat(4, minmax(0, 1fr))',
    md: 'repeat(6, minmax(0, 1fr))',
    lg: 'repeat(8, minmax(0, 1fr))',
  },
  gap: { xs: 1, sm: 1.25, md: 1.5 },
  py: 0.5,
}
