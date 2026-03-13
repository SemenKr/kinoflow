import * as React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { ThemeProvider, createTheme, alpha, darken, type ThemeOptions } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { type ThemeMode, ThemeModeContext } from '@/app/providers/ThemeModeContext'

const STORAGE_KEY = 'kino-flow-theme'
const DEFAULT_MODE: ThemeMode = 'dark'

const getInitialMode = (): ThemeMode => {
  if (typeof window === 'undefined') return DEFAULT_MODE

  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored

  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

const getDesignTokens = (mode: ThemeMode): ThemeOptions => {
  const isDark = mode === 'dark'

  const primary = isDark
    ? {
        main: '#38F2FF',
        light: '#7CF8FF',
        dark: '#00B5D8',
        contrastText: '#051014',
      }
    : {
        main: '#1F3A33',
        light: '#2E5A4F',
        dark: '#10231F',
        contrastText: '#FFFFFF',
      }

  const secondary = isDark
    ? {
        main: '#FF4FD8',
        light: '#FF8AE7',
        dark: '#C01798',
        contrastText: '#14030F',
      }
    : {
        main: '#C05A3E',
        light: '#D4745B',
        dark: '#8E3D2B',
        contrastText: '#FFFFFF',
      }

  const background = isDark
    ? { default: '#0A0D14', paper: '#111826' }
    : { default: '#F6F1E9', paper: '#FFFFFF' }

  const text = isDark
    ? { primary: '#E6F1FF', secondary: '#9AA6B2' }
    : { primary: '#1E1B18', secondary: '#4B4440' }

  const headingFont = isDark
    ? '"Space Grotesk", "IBM Plex Sans", "Inter", system-ui, sans-serif'
    : '"IBM Plex Serif", "IBM Plex Sans", "Inter", system-ui, serif'
  const bodyFont = '"IBM Plex Sans", "Inter", system-ui, sans-serif'

  return {
    palette: {
      mode,
      primary,
      secondary,
      background,
      text,
      divider: alpha(text.primary, isDark ? 0.12 : 0.08),
    },
    typography: {
      fontFamily: bodyFont,
      h1: {
        fontFamily: headingFont,
        fontWeight: 700,
        letterSpacing: isDark ? '-0.02em' : '-0.01em',
      },
      h2: {
        fontFamily: headingFont,
        fontWeight: 700,
        letterSpacing: isDark ? '-0.02em' : '-0.01em',
      },
      h3: {
        fontFamily: headingFont,
        fontWeight: 600,
        letterSpacing: isDark ? '-0.01em' : '0',
      },
      h4: { fontFamily: headingFont, fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      button: { fontWeight: 600, letterSpacing: '0.02em' },
    },
    shape: {
      borderRadius: 14,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: background.default,
          },
          '::selection': {
            backgroundColor: alpha(primary.main, isDark ? 0.35 : 0.2),
          },
        },
      },
      MuiAppBar: {
        defaultProps: { color: 'transparent' as const, elevation: 0 },
        styleOverrides: {
          root: {
            backgroundColor: alpha(background.paper, isDark ? 0.7 : 0.92),
            backdropFilter: 'blur(10px)',
            borderBottom: `1px solid ${alpha(
              isDark ? primary.main : text.primary,
              isDark ? 0.35 : 0.08,
            )}`,
            boxShadow: isDark ? `0 12px 24px ${alpha('#000000', 0.35)}` : 'none',
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: { minHeight: 64 },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            border: `1px solid ${alpha(text.primary, isDark ? 0.1 : 0.06)}`,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 18,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 12,
            padding: '8px 16px',
            fontWeight: 600,
          },
          contained: {
            boxShadow: isDark
              ? `0 0 0 1px ${alpha(primary.main, 0.35)}, 0 12px 28px ${alpha(primary.main, 0.25)}`
              : 'none',
            backgroundImage: isDark
              ? `linear-gradient(120deg, ${primary.main}, ${secondary.main})`
              : 'none',
            ':hover': {
              boxShadow: isDark
                ? `0 0 0 1px ${alpha(primary.main, 0.5)}, 0 16px 32px ${alpha(primary.main, 0.35)}`
                : 'none',
              backgroundColor: darken(primary.main, isDark ? 0.12 : 0.08),
            },
          },
          outlined: {
            borderColor: alpha(primary.main, isDark ? 0.5 : 0.35),
            ':hover': {
              borderColor: primary.main,
              backgroundColor: alpha(primary.main, isDark ? 0.12 : 0.08),
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            fontWeight: 500,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            backgroundColor: alpha(background.paper, isDark ? 0.6 : 1),
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: alpha(text.primary, isDark ? 0.2 : 0.15),
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: alpha(primary.main, isDark ? 0.6 : 0.4),
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: primary.main,
              borderWidth: 2,
            },
          },
        },
      },
    },
  }
}

export const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode)
  const [hasUserPreference, setHasUserPreference] = useState(() => {
    if (typeof window === 'undefined') return false
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === 'light' || stored === 'dark'
  })

  const toggleTheme = () => {
    setHasUserPreference(true)
    setMode(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, mode)
  }, [mode])

  useEffect(() => {
    if (hasUserPreference) return
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (event: MediaQueryListEvent) => {
      setMode(event.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', onChange)
    return () => mediaQuery.removeEventListener('change', onChange)
  }, [hasUserPreference])

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  return (
    <ThemeModeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}
