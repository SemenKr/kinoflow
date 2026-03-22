import GitHubIcon from '@mui/icons-material/GitHub'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TelegramIcon from '@mui/icons-material/Telegram'
import {
  DEFAULT_MOVIE_CATEGORY,
  getMovieCategoryRoute,
} from '@/features/movies/config/movieCategories'
import { ROUTES } from '@/shared/constants'

export interface NavigationItemConfig {
  key: 'main' | 'categories' | 'filtered' | 'search' | 'favorites'
  to: string
  activePath?: string
}

export const navigationItems: readonly NavigationItemConfig[] = [
  { key: 'main', to: ROUTES.home },
  {
    key: 'categories',
    to: getMovieCategoryRoute(DEFAULT_MOVIE_CATEGORY),
    activePath: '/movies/*',
  },
  { key: 'filtered', to: ROUTES.filtered },
  { key: 'search', to: ROUTES.search },
  { key: 'favorites', to: ROUTES.favorites },
]

export const socialLinks = [
  {
    key: 'github',
    href: 'https://github.com/SemenKr',
    labelKey: 'footer_social_github',
    icon: GitHubIcon,
  },
  {
    key: 'telegram',
    href: 'https://t.me/SemenKrekotun',
    labelKey: 'footer_social_telegram',
    icon: TelegramIcon,
  },
  {
    key: 'linkedin',
    href: 'https://www.linkedin.com/in/%D1%81%D0%B5%D0%BC%D1%91%D0%BD-%D0%BA%D1%80%D0%B5%D0%BA%D0%BE%D1%82%D1%83%D0%BD-8a103024b',
    labelKey: 'footer_social_linkedin',
    icon: LinkedInIcon,
  },
  {
    key: 'instagram',
    href: 'https://www.instagram.com/semen_kr',
    labelKey: 'footer_social_instagram',
    icon: InstagramIcon,
  },
] as const
