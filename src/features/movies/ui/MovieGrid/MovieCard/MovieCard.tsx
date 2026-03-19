import { useFavorites } from '@/features/favorites/model/useFavorites'
import { ROUTES } from '@/shared/constants'
import { Card, CardMedia, CardContent, Typography, Box, IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { type KeyboardEvent, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { Movie } from '@/features/movies/api/moviesApi.types'
import {
  createPosterFallbackUrl,
  getPosterUrl,
  getRatingColor,
  getRatingPercent,
  getRatingValue,
  getReleaseYear,
} from './MovieCard.utils'
import {
  cardStyles,
  contentStyles,
  favoriteButtonStyles,
  posterStyles,
  posterWrapperStyles,
  ratingBadgeStyles,
  titleStyles,
} from './MovieCard.styles'

interface Props {
  movie: Movie
}

export const MovieCard = ({ movie }: Props) => {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const { isFavorite, toggle } = useFavorites()

  const favorite = isFavorite(movie.id)
  const poster = getPosterUrl(movie.poster_path, createPosterFallbackUrl(t('movie_card_no_poster')))
  const ratingPercent = getRatingPercent(movie.vote_average)
  const ratingValue = getRatingValue(movie.vote_average)
  const ratingLabel = new Intl.NumberFormat(i18n.language, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(ratingValue)
  const ratingColor = getRatingColor(ratingPercent)
  const year = getReleaseYear(movie.release_date)
  const detailsPath = ROUTES.movieDetails(movie.id)

  const handleOpenMovie = useCallback(() => {
    navigate(detailsPath)
  }, [navigate, detailsPath])

  const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleOpenMovie()
    }
  }

  return (
    <Card
      sx={cardStyles}
      component="article"
      onClick={handleOpenMovie}
      onKeyDown={handleCardKeyDown}
      role="button"
      tabIndex={0}
      aria-label={t('movie_card_open_details', { title: movie.title })}
    >
      <Box sx={posterWrapperStyles}>
        <IconButton
          className="movie-card-favorite"
          sx={theme => favoriteButtonStyles(theme, favorite)}
          aria-label="favorite"
          onClick={event => {
            event.stopPropagation()

            toggle({
              id: movie.id,
              title: movie.title,
              poster_path: movie.poster_path,
              vote_average: movie.vote_average,
              release_date: movie.release_date,
            })
          }}
        >
          <FavoriteIcon sx={{ color: favorite ? 'red' : 'white' }} />
        </IconButton>

        <CardMedia
          component="img"
          image={poster}
          alt={movie.title}
          loading="lazy"
          sx={posterStyles}
        />

        <Box sx={theme => ratingBadgeStyles(theme, ratingColor, ratingPercent)}>{ratingLabel}</Box>
      </Box>

      <CardContent sx={contentStyles}>
        <Typography variant="subtitle1" noWrap sx={titleStyles}>
          {movie.title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {year}
        </Typography>
      </CardContent>
    </Card>
  )
}
