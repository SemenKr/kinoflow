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
  getPosterSrcSet,
  getPosterUrl,
  getRatingColor,
  getRatingPercent,
  getRatingValue,
  getReleaseYear,
  type MovieCardPosterSize,
} from './MovieCard.utils'
import {
  cardStyles,
  contentStyles,
  favoriteButtonStyles,
  posterStyles,
  posterWrapperStyles,
  ratingBadgeStyles,
  titleStyles,
  yearStyles,
} from './MovieCard.styles'

interface Props {
  movie: Movie
  posterSize?: MovieCardPosterSize
}

export const MovieCard = ({ movie, posterSize = 'default' }: Props) => {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const { isFavorite, toggle } = useFavorites()

  const favorite = isFavorite(movie.id)
  const poster = getPosterUrl(movie.poster_path, createPosterFallbackUrl(t('movie_card_no_poster')))
  const posterSrcSet = getPosterSrcSet(movie.poster_path, posterSize)
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
          aria-label={
            favorite
              ? t('movie_card_remove_favorites', { title: movie.title })
              : t('movie_card_add_favorites', { title: movie.title })
          }
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
          srcSet={posterSrcSet}
          sizes={
            posterSrcSet ? '(max-width: 600px) 160px, (max-width: 900px) 180px, 188px' : undefined
          }
          alt={movie.title}
          loading="lazy"
          sx={posterStyles}
        />

        <Box sx={theme => ratingBadgeStyles(theme, ratingColor, ratingPercent)}>{ratingLabel}</Box>
      </Box>

      <CardContent sx={contentStyles}>
        <Typography variant="subtitle2" sx={titleStyles}>
          {movie.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={yearStyles}>
          {year}
        </Typography>
      </CardContent>
    </Card>
  )
}
