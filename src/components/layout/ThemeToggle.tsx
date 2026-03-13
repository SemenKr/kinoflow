import { ThemeModeContext } from '@/app/providers/ThemeModeContext'
import { useContext } from 'react'
import { Switch } from '@mui/material'
import { styled } from '@mui/material/styles'

const sunPath =
  'M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z'
const moonPath =
  'M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z'

const makeSvg = (path: string, color: string) =>
  `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' height='20' width='20' viewBox='0 0 20 20'><path fill='${encodeURIComponent(
    color,
  )}' d='${path}'/></svg>")`

const ThemeSwitch = styled(Switch)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark'
  const sunColor = theme.palette.secondary.main
  const moonColor = theme.palette.primary.main

  return {
    width: 52,
    height: 28,
    padding: 0,
    overflow: 'visible',
    '& .MuiSwitch-switchBase': {
      margin: 0,
      padding: 3,
      transform: 'translateX(0)',
      transitionDuration: '280ms',
      transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(24px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: makeSvg(moonPath, moonColor),
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          background: isDark
            ? `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
            : `linear-gradient(120deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: isDark ? '#0b1220' : '#f6f1e9',
      width: 24,
      height: 24,
      boxShadow: isDark
        ? `0 0 0 1px ${theme.palette.primary.main}, 0 6px 14px rgba(0, 0, 0, 0.5), 0 0 8px ${theme.palette.primary.main}`
        : '0 6px 12px rgba(0, 0, 0, 0.25)',
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: makeSvg(sunPath, sunColor),
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      height: 16,
      margin: 6,
      background: isDark
        ? `linear-gradient(120deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`
        : `linear-gradient(120deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
      borderRadius: 999,
      transition: 'background 280ms cubic-bezier(0.22, 1, 0.36, 1)',
    },
  }
})

export const ThemeToggle = () => {
  const { mode, toggleTheme } = useContext(ThemeModeContext)
  const isDark = mode === 'dark'
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <ThemeSwitch
      checked={isDark}
      onChange={toggleTheme}
      disableRipple
      slotProps={{ input: { 'aria-label': label } }}
    />
  )
}
