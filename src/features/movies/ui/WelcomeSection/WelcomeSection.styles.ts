import { alpha, type Theme } from '@mui/material/styles'

export const containerStyles = (backdrop: string) => ({
  minHeight: 400,
  height: 'calc(100vh / 2.5)',
  maxHeight: 460,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',

  backgroundImage: backdrop ? `url(${backdrop})` : 'none',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',

  position: 'relative',
  color: '#fff',
})

export const overlayStyles = (theme: Theme) => ({
  position: 'absolute',
  inset: 0,
  backgroundColor: alpha(theme.palette.common.black, 0.5),
})

export const contentWrapperStyles = {
  position: 'relative',
  width: '100%',
  maxWidth: 1200,
  px: 4,
}

export const textContainerStyles = {
  maxWidth: 500,
}

export const searchRowStyles = {
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  alignItems: { xs: 'stretch', sm: 'center' },
  gap: 1.5,
}

export const inputStyles = (theme: Theme) => ({
  '& .MuiInputLabel-root': {
    color:
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.common.white, 0.92)
        : alpha(theme.palette.text.primary, 0.9),
    textShadow:
      theme.palette.mode === 'dark'
        ? `0 1px 6px ${alpha(theme.palette.common.black, 0.55)}`
        : 'none',
  },

  '& .MuiInputLabel-root.Mui-focused': {
    color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
  },

  '& .MuiInputLabel-shrink': {
    backgroundColor: alpha(
      theme.palette.background.default,
      theme.palette.mode === 'dark' ? 0.82 : 0.74,
    ),
    px: 0.75,
    borderRadius: 1,
  },

  '& .MuiOutlinedInput-root': {
    borderRadius: 2.5,
    backgroundColor: alpha(
      theme.palette.background.paper,
      theme.palette.mode === 'dark' ? 0.72 : 0.9,
    ),
    backdropFilter: 'blur(6px)',
    color: theme.palette.text.primary,

    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.42 : 0.25),
    },

    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.72 : 0.48),
    },

    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
  },

  '& .MuiInputBase-input::placeholder': {
    color: alpha(theme.palette.text.secondary, 0.95),
    opacity: 1,
  },
})

export const buttonStyles = (theme: Theme) => ({
  borderRadius: 2.5,
  px: 3,
  minWidth: { xs: '100%', sm: 116 },
  width: { xs: '100%', sm: 'auto' },

  '&.Mui-disabled': {
    backgroundColor: alpha(
      theme.palette.background.paper,
      theme.palette.mode === 'dark' ? 0.26 : 0.44,
    ),
    color: alpha(theme.palette.text.primary, 0.6),
  },
})
