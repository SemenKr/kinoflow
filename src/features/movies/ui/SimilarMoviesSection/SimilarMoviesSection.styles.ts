import type { SxProps, Theme } from '@mui/material'

export const sectionSx: SxProps<Theme> = {
  mt: 4,
}

export const headerSx: SxProps<Theme> = {
  mb: 2,
}

export const moviesRowSx: SxProps<Theme> = {
  display: 'flex',
  gap: 2,
  overflowX: 'auto',
  pt: 1,
  pb: 2,

  scrollBehavior: 'smooth',

  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
}

export const footerSx: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 1,
  minHeight: 32,
}

export const loadingSx: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
}

export const errorTextSx: SxProps<Theme> = {
  textAlign: 'center',
}
