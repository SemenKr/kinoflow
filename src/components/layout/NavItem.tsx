import { Button } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { NavLink } from 'react-router-dom'

interface Props {
  to: string
  label: string
}

export const NavItem = ({ to, label }: Props) => {
  return (
    <Button
      component={NavLink}
      to={to}
      className={({ isActive }) => (isActive ? 'active' : undefined)}
      color="inherit"
      sx={theme => ({
        borderRadius: 12,
        padding: '6px 12px',
        textTransform: 'none',
        border: '1px solid transparent',
        '&:hover': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.mode === 'dark' ? 0.12 : 0.08,
          ),
        },
        '&.active': {
          color: theme.palette.primary.main,
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.mode === 'dark' ? 0.22 : 0.14,
          ),
          borderColor: alpha(
            theme.palette.primary.main,
            theme.palette.mode === 'dark' ? 0.4 : 0.25,
          ),
        },
      })}
    >
      {label}
    </Button>
  )
}
