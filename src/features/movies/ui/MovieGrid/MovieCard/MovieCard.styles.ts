import { alpha, type Theme } from '@mui/material/styles'

export const cardStyles = (theme: Theme) => ({
  width: 'min(100%, 220px)',
  maxWidth: 220,
  minWidth: 0,
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: theme.transitions.create(['transform', 'box-shadow'], {
    duration: theme.transitions.duration.shorter,
    easing: theme.transitions.easing.easeOut,
  }),
  willChange: 'transform',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow:
      theme.palette.mode === 'dark'
        ? `0 14px 30px ${alpha(theme.palette.common.black, 0.45)}`
        : `0 12px 24px ${alpha(theme.palette.common.black, 0.2)}`,
  },
  '&:hover .movie-card-poster': {
    transform: 'scale(1.035)',
  },
  '&:focus-visible': {
    outline: `2px solid ${alpha(theme.palette.primary.main, 0.85)}`,
    outlineOffset: 2,
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
    '&:hover': {
      transform: 'none',
    },
    '&:hover .movie-card-poster': {
      transform: 'none',
    },
  },
})

export const favoriteButtonStyles = (theme: Theme) => ({
  position: 'absolute',
  top: 8,
  right: 8,
  zIndex: 2,
  backgroundColor: alpha(theme.palette.common.black, 0.6),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.78),
  },
})

export const posterWrapperStyles = {
  position: 'relative',
}

export const posterStyles = (theme: Theme) => ({
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shorter,
    easing: theme.transitions.easing.easeOut,
  }),
  transformOrigin: 'center',
})

export const contentStyles = {
  pt: 3.5,
}

export const ratingBadgeStyles = (theme: Theme, ratingColor: string, rating: number) => ({
  position: 'absolute',
  left: 12,
  bottom: 0,
  transform: 'translateY(50%)',
  zIndex: 2,
  width: 44,
  height: 44,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 11,
  fontWeight: 700,
  lineHeight: 1.2,
  color: theme.palette.common.white,
  background: `radial-gradient(circle, ${alpha(theme.palette.common.black, 0.74)} 56%, transparent 58%), conic-gradient(${ratingColor} ${
    rating * 3.6
  }deg, ${alpha(theme.palette.common.black, 0.5)} 0deg)`,
  border: `1px solid ${alpha(ratingColor, 0.92)}`,
  outline: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
  textShadow: `0 1px 3px ${alpha(theme.palette.common.black, 0.72)}`,
  boxShadow:
    theme.palette.mode === 'dark'
      ? `0 8px 18px ${alpha(theme.palette.common.black, 0.52)}, 0 0 0 1px ${alpha(ratingColor, 0.28)}, inset 0 0 0 1px ${alpha(theme.palette.common.white, 0.06)}`
      : `0 6px 14px ${alpha(theme.palette.common.black, 0.22)}, 0 0 0 1px ${alpha(ratingColor, 0.22)}, inset 0 0 0 1px ${alpha(theme.palette.common.white, 0.08)}`,
  backgroundClip: 'padding-box',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  backdropFilter: 'blur(6px)',
})

export const titleStyles = {
  fontWeight: 600,
}
