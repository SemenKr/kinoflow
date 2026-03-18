import { alpha, type Theme } from '@mui/material/styles'

export const pageRootSx = {
  pb: { xs: 6, md: 8 },
  '@keyframes fadeUp': {
    from: { opacity: 0, transform: 'translateY(14px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
}

export const fadeUpSx = (durationMs: number) => ({
  animation: `fadeUp ${durationMs}ms ease both`,
})

export const loadingContainerSx = { py: 4 }
export const errorContainerSx = { py: 6 }
export const heroContainerSx = { position: 'relative', py: { xs: 4, md: 7 } }
export const heroStackDirection = { xs: 'column', md: 'row' } as const
export const heroStackSpacing = { xs: 3, md: 4.5 } as const
export const heroContentGridSx = {
  flex: 1,
  minWidth: 0,
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', lg: '1.2fr 0.8fr' },
  gap: 2.2,
}
export const titleSx = { fontWeight: 700, lineHeight: 1.1, fontSize: { xs: '2rem', md: '2.7rem' } }
export const metaChipsSx = { mt: 2 }
export const scoreRowSx = { mt: 2.5 }
export const genresRowSx = { mt: 2.5 }
export const quickFactsTitleSx = { mb: 1.2 }
export const quickFactsStackSx = { spacing: 0.9 }
export const actionButtonsSx = { mt: 2 }
export const detailsContainerSx = { mt: { xs: 3, md: 5 } }
export const detailsGridSx = { display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.25fr 1fr' }, gap: 2 }
export const sectionTitleSx = { mb: 1.5 }
export const overviewTextSx = { lineHeight: 1.75 }
export const languageRowSx = { mb: 2 }
export const subtitleSx = { mb: 1 }
export const dividerSx = { my: 1.8 }
export const productionBoxSx = { mt: 2 }

export const heroSectionSx = (backdrop: string) => ({
  position: 'relative',
  minHeight: { xs: 520, md: 620 },
  backgroundImage: backdrop ? `url(${backdrop})` : 'none',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  overflow: 'hidden',
})

export const heroOverlaySx = (theme: Theme) => ({
  position: 'absolute',
  inset: 0,
  background: `linear-gradient(100deg, ${alpha(theme.palette.background.default, 0.96)} 16%, ${alpha(
    theme.palette.background.default,
    0.8,
  )} 52%, ${alpha(theme.palette.background.default, 0.95)} 100%)`,
})

export const posterSx = (theme: Theme) => ({
  width: { xs: 'min(100%, 280px)', md: 320 },
  aspectRatio: '2 / 3',
  objectFit: 'cover',
  borderRadius: 3,
  border: `1px solid ${alpha(theme.palette.common.white, 0.18)}`,
  boxShadow:
    theme.palette.mode === 'dark'
      ? `0 20px 44px ${alpha(theme.palette.common.black, 0.45)}`
      : `0 14px 30px ${alpha(theme.palette.common.black, 0.22)}`,
})

export const taglineSx = (theme: Theme) => ({
  mt: 1,
  fontStyle: 'italic',
  color: alpha(theme.palette.text.primary, 0.82),
})

export const ratingBadgeSx = (ratingColor: string, ratingPercent: number) => ({
  width: 58,
  height: 58,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 14,
  fontWeight: 700,
  color: '#fff',
  background: `radial-gradient(circle, ${alpha('#000', 0.74)} 56%, transparent 58%), conic-gradient(${ratingColor} ${
    ratingPercent * 3.6
  }deg, ${alpha('#000', 0.45)} 0deg)`,
  border: `1px solid ${alpha(ratingColor, 0.92)}`,
  outline: `1px solid ${alpha('#fff', 0.2)}`,
  textShadow: `0 1px 3px ${alpha('#000', 0.72)}`,
})

export const genreChipSx = (theme: Theme) => ({
  color: theme.palette.text.primary,
  backgroundColor: alpha(theme.palette.background.paper, 0.65),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.28)}`,
})

export const quickFactsCardSx = (theme: Theme) => ({
  p: 2,
  borderRadius: 2.5,
  backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.68 : 0.86),
  border: `1px solid ${alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.14 : 0.08)}`,
})

export const surfaceSx = (durationMs: number) => (theme: Theme) => ({
  p: { xs: 2, md: 3 },
  borderRadius: 3,
  backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.74 : 0.92),
  border: `1px solid ${alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.1 : 0.08)}`,
  ...fadeUpSx(durationMs),
})
