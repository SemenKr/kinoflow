import { AppBar, Toolbar, Button, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import { ROUTES } from '@/shared/constants'

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', gap: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          KinoFlow
        </Typography>

        <Button component={NavLink} to={ROUTES.home} color="inherit">
          Main
        </Button>

        <Button component={NavLink} to={ROUTES.categories} color="inherit">
          Category Movies
        </Button>

        <Button component={NavLink} to={ROUTES.filtered} color="inherit">
          Filtered Movies
        </Button>

        <Button component={NavLink} to={ROUTES.search} color="inherit">
          Search
        </Button>

        <Button component={NavLink} to={ROUTES.favorites} color="inherit">
          Favorites
        </Button>

        <ThemeToggle />
      </Toolbar>
    </AppBar>
  )
}
