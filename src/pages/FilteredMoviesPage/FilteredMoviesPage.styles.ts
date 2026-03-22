import type { SxProps, Theme } from '@mui/material'

const FILTERS_WIDTH = 320

export const pageRootSx: SxProps<Theme> = {
  px: { xs: 2, sm: 3, lg: 4 },
  py: { xs: 3, md: 4 },
}

export const layoutSx: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', lg: `${FILTERS_WIDTH}px minmax(0, 1fr)` },
  alignItems: 'start',
  gap: { xs: 0, lg: 2.5 },
}

export const desktopSidebarWrapSx: SxProps<Theme> = {
  minWidth: 0,
}

export const drawerPaperSx: SxProps<Theme> = {
  width: FILTERS_WIDTH,
  maxWidth: '88vw',
  p: 2,
}

export const filterCardSx: SxProps<Theme> = {
  width: '100%',
  p: 2,
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
  overflowX: 'hidden',
  boxSizing: 'border-box',
  boxShadow: theme =>
    theme.palette.mode === 'dark'
      ? '0 20px 40px rgba(0, 0, 0, 0.2)'
      : '0 20px 40px rgba(33, 43, 54, 0.08)',
}

export const filterHeaderSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 1,
  mb: 2,
}

export const filterSectionSx: SxProps<Theme> = {
  mb: 2.5,
}

export const filterLabelSx: SxProps<Theme> = {
  mb: 1,
  fontWeight: 700,
}

export const ratingValueSx: SxProps<Theme> = {
  mt: 0.75,
  color: 'text.secondary',
}

export const genresWrapSx: SxProps<Theme> = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 1,
}

export const contentWrapSx: SxProps<Theme> = {
  flex: 1,
  minWidth: 0,
}

export const resultsHeaderSx: SxProps<Theme> = {
  mb: 3,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 1.5,
  flexWrap: 'wrap',
  px: { xs: 0.5, md: 0 },
}

export const resultsActionsSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  flexWrap: 'wrap',
}

export const loadingWrapSx: SxProps<Theme> = {
  py: 8,
  textAlign: 'center',
}

export const selectedGenresTextSx: SxProps<Theme> = {
  mb: 2,
}

export const fetchingTextSx: SxProps<Theme> = {
  pt: 2,
}

export const paginationWrapSx: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  pt: 4,
}

export const backToTopFabSx: SxProps<Theme> = {
  position: 'fixed',
  right: { xs: 16, md: 24 },
  bottom: { xs: 16, md: 24 },
  zIndex: 20,
  boxShadow: theme =>
    theme.palette.mode === 'dark'
      ? '0 16px 30px rgba(0, 0, 0, 0.35)'
      : '0 16px 30px rgba(33, 43, 54, 0.16)',
}
