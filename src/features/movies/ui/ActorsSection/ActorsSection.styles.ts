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

export const actorsRowSx: SxProps<Theme> = {
  display: 'flex',
  gap: { xs: 1.5, sm: 2 },
  overflowX: 'auto',
  px: 0.5,
  pb: 1,
  scrollBehavior: 'smooth',
  scrollSnapType: 'x proximity',
  scrollPaddingInline: 4,
  overscrollBehaviorX: 'contain',
  WebkitOverflowScrolling: 'touch',
  scrollbarWidth: 'thin',
  scrollbarColor: 'rgba(127, 127, 127, 0.45) transparent',
  '&::-webkit-scrollbar': {
    height: 8,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(127, 127, 127, 0.38)',
    borderRadius: 999,
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
}
