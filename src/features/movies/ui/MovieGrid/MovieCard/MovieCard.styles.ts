import { alpha, type Theme } from '@mui/material/styles'

export const cardStyles = (theme: Theme) => ({
  width: 'min(100%, 188px)',
  maxWidth: 188,
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
        ? `0 10px 22px ${alpha(theme.palette.common.black, 0.34)}`
        : `0 8px 18px ${alpha(theme.palette.common.black, 0.14)}`,
  },
  '&:hover .movie-card-poster': {
    transform: 'scale(1.035)',
  },
  '&:hover .movie-card-favorite, &:focus-visible .movie-card-favorite, &:focus-within .movie-card-favorite':
    {
      opacity: 1,
      transform: 'translateY(0)',
      pointerEvents: 'auto',
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

export const favoriteButtonStyles = (theme: Theme, favorite: boolean) => ({
  position: 'absolute',
  top: 8,
  right: 8,
  zIndex: 2,
  backgroundColor: alpha(theme.palette.common.black, 0.6),
  opacity: favorite ? 1 : 0,
  transform: favorite ? 'translateY(0) scale(1)' : 'translateY(-6px) scale(0.92)',
  pointerEvents: favorite ? 'auto' : 'none',
  transition: theme.transitions.create(['opacity', 'transform', 'background-color', 'box-shadow'], {
    duration: theme.transitions.duration.shorter,
    easing: theme.transitions.easing.easeOut,
  }),
  boxShadow: `0 6px 14px ${alpha(theme.palette.common.black, 0.24)}`,
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.78),
    transform: 'translateY(0) scale(1.06)',
  },
  '&:active': {
    transform: 'translateY(0) scale(0.92)',
  },
  '@keyframes favoriteButtonIn': {
    from: {
      opacity: 0,
      transform: 'translateY(-8px) scale(0.88)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0) scale(1)',
    },
  },
  ...(favorite && {
    animation: 'favoriteButtonIn 180ms ease-out',
  }),
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
    animation: 'none',
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.78),
      transform: 'translateY(0) scale(1)',
    },
    '&:active': {
      transform: 'translateY(0) scale(1)',
    },
  },
})

export const posterWrapperStyles = {
  position: 'relative',
}

export const posterStyles = (theme: Theme) => ({
  width: '100%',
  aspectRatio: '5 / 7',
  height: 'auto',
  objectFit: 'cover',
  display: 'block',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shorter,
    easing: theme.transitions.easing.easeOut,
  }),
  transformOrigin: 'center',
})

export const contentStyles = {
  pt: 3,
  pb: 1.75,
  px: 1.5,
}

export const ratingBadgeStyles = (theme: Theme, ratingColor: string, rating: number) => ({
  position: 'absolute',
  left: 10,
  bottom: 0,
  transform: 'translateY(50%)',
  zIndex: 2,
  width: 40,
  height: 40,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 10,
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
  fontSize: '0.95rem',
  lineHeight: 1.25,
  minHeight: '2.5em',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
}

export const yearStyles = {
  mt: 0.35,
  fontSize: '0.8rem',
}
