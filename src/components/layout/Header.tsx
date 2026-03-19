import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Stack,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'
import { useMemo, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'

import { ROUTES } from '@/shared/constants'
import { NavItem } from './NavItem'
import { LanguageSwitch } from './LanguageSwitch'
import { ThemeToggle } from './ThemeToggle'
import logoUrl from '@/assets/icons/tmdblogo.svg'

export const Header = () => {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = useMemo(
    () => [
      { to: ROUTES.home, label: t('main') },
      { to: ROUTES.categories, label: t('categories') },
      { to: ROUTES.filtered, label: t('filtered') },
      { to: ROUTES.search, label: t('search') },
      { to: ROUTES.favorites, label: t('favorites') },
    ],
    [t],
  )

  const openMenu = () => setIsMenuOpen(true)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', gap: 2, width: '100%', minWidth: 0 }}>
        <Box
          component={RouterLink}
          to={ROUTES.home}
          aria-label="KinoFlow home"
          sx={theme => ({
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1.5,
            textDecoration: 'none',
            color: 'inherit',
            borderRadius: 10,
            padding: '4px 6px',
            flexShrink: 0,
            '&:focus-visible': {
              outline: `2px solid ${alpha(theme.palette.primary.main, 0.6)}`,
              outlineOffset: 2,
            },
          })}
        >
          <Box
            component="img"
            src={logoUrl}
            alt="KinoFlow"
            sx={{ height: 28, width: 'auto', display: 'block' }}
          />
        </Box>

        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexGrow: 1,
            justifyContent: 'center',
            gap: 1,
          }}
        >
          {navItems.map(item => (
            <NavItem key={item.to} to={item.to} label={item.label} />
          ))}
        </Box>

        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ marginLeft: 'auto', minWidth: 0, flexShrink: 0 }}
        >
          <LanguageSwitch />
          <ThemeToggle />
          <IconButton
            color="inherit"
            onClick={openMenu}
            sx={{ display: { xs: 'inline-flex', md: 'none' } }}
            aria-label="Open navigation menu"
          >
            <MenuIcon />
          </IconButton>
        </Stack>
      </Toolbar>

      <Drawer
        anchor="right"
        open={isMenuOpen}
        onClose={closeMenu}
        ModalProps={{ keepMounted: true }}
      >
        <Box sx={{ width: 280, padding: 2 }}>
          <Box
            component={RouterLink}
            to={ROUTES.home}
            onClick={closeMenu}
            aria-label="KinoFlow home"
            sx={theme => ({
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.5,
              textDecoration: 'none',
              color: 'inherit',
              borderRadius: 10,
              padding: '4px 6px',
              '&:focus-visible': {
                outline: `2px solid ${alpha(theme.palette.primary.main, 0.6)}`,
                outlineOffset: 2,
              },
            })}
          >
            <Box
              component="img"
              src={logoUrl}
              alt="KinoFlow"
              sx={{ height: 28, width: 'auto', display: 'block' }}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          <List sx={{ paddingTop: 0 }}>
            {navItems.map(item => (
              <ListItemButton
                key={item.to}
                component={RouterLink}
                to={item.to}
                onClick={closeMenu}
                sx={theme => ({
                  borderRadius: 10,
                  marginBottom: 0.5,
                  '&:hover': {
                    backgroundColor: alpha(
                      theme.palette.primary.main,
                      theme.palette.mode === 'dark' ? 0.12 : 0.08,
                    ),
                  },
                })}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Stack direction="row" alignItems="center" spacing={1}>
            <LanguageSwitch />
            <ThemeToggle />
          </Stack>
        </Box>
      </Drawer>
    </AppBar>
  )
}
