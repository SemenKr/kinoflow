import { Button } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { NavLink, matchPath, useLocation, useResolvedPath } from 'react-router-dom'

interface Props {
  to: string
  label: string
  activePath?: string
}

export const NavItem = ({ to, label, activePath }: Props) => {
  const location = useLocation()
  const resolvedPath = useResolvedPath(to)
  const isActive = activePath
    ? !!matchPath({ path: activePath, end: false }, location.pathname)
    : location.pathname === resolvedPath.pathname

  return (
    <Button
      component={NavLink}
      to={to}
      color="inherit"
      sx={theme => ({
        borderRadius: 12,
        padding: '6px 12px',
        textTransform: 'none',
        border: '1px solid transparent',
        ...(isActive && {
          color: theme.palette.primary.main,
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.mode === 'dark' ? 0.22 : 0.14,
          ),
          borderColor: alpha(
            theme.palette.primary.main,
            theme.palette.mode === 'dark' ? 0.4 : 0.25,
          ),
        }),
        '&:hover': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.mode === 'dark' ? 0.12 : 0.08,
          ),
        },
      })}
    >
      {label}
    </Button>
  )
}
