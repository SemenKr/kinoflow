import { AppBar, Toolbar, Button, Typography } from '@mui/material'
import { Link } from 'react-router'

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', gap: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          KinoFlow
        </Typography>

        <Button component={Link} to="/" color="inherit">
          Main
        </Button>

        <Button component={Link} to="/categories" color="inherit">
          Category Movies
        </Button>

        <Button component={Link} to="/filtered" color="inherit">
          Filtered Movies
        </Button>

        <Button component={Link} to="/search" color="inherit">
          Search
        </Button>

        <Button component={Link} to="/favorites" color="inherit">
          Favorites
        </Button>
      </Toolbar>
    </AppBar>
  )
}
