import GitHubIcon from '@mui/icons-material/GitHub'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TelegramIcon from '@mui/icons-material/Telegram'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'

const socialLinks = [
  {
    key: 'github',
    href: 'https://example.com/github',
    labelKey: 'footer_social_github',
    icon: GitHubIcon,
  },
  {
    key: 'telegram',
    href: 'https://example.com/telegram',
    labelKey: 'footer_social_telegram',
    icon: TelegramIcon,
  },
  {
    key: 'linkedin',
    href: 'https://example.com/linkedin',
    labelKey: 'footer_social_linkedin',
    icon: LinkedInIcon,
  },
  {
    key: 'instagram',
    href: 'https://example.com/instagram',
    labelKey: 'footer_social_instagram',
    icon: InstagramIcon,
  },
] as const

export const Footer = () => {
  const { t } = useTranslation()

  return (
    <Box
      component="footer"
      sx={theme => ({
        mt: 6,
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: alpha(
          theme.palette.background.paper,
          theme.palette.mode === 'dark' ? 0.72 : 0.86,
        ),
        backdropFilter: 'blur(10px)',
      })}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          px: { xs: 2, sm: 3 },
          py: { xs: 3, sm: 3.5 },
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          alignItems={{ xs: 'flex-start', md: 'center' }}
          justifyContent="space-between"
        >
          <Stack spacing={0.5}>
            <Typography variant="body2" color="text.secondary">
              {t('footer_copy')}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {t('footer_author')}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={0.75} alignItems="center">
            {socialLinks.map(({ key, href, icon: Icon, labelKey }) => (
              <IconButton
                key={key}
                component="a"
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={t(labelKey)}
                sx={theme => ({
                  width: 40,
                  height: 40,
                  color: theme.palette.text.secondary,
                  border: `1px solid ${alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.14 : 0.1)}`,
                  backgroundColor: alpha(
                    theme.palette.background.default,
                    theme.palette.mode === 'dark' ? 0.28 : 0.72,
                  ),
                  transition: 'transform 160ms ease, background-color 160ms ease, color 160ms ease',
                  '&:hover': {
                    color: theme.palette.primary.main,
                    backgroundColor: alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.12 : 0.08),
                    transform: 'translateY(-1px)',
                  },
                })}
              >
                <Icon fontSize="small" />
              </IconButton>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}
