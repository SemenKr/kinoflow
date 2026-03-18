import { Card, CardMedia, CardContent, Typography, Box, IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import type { KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Movie } from '@/features/movies/api/moviesApi.types'
import {
  cardStyles,
  contentStyles,
  favoriteButtonStyles,
  posterStyles,
  posterWrapperStyles,
  ratingBadgeStyles,
  titleStyles,
} from './MovieCard.styles'

const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500'
const POSTER_FALLBACK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 750">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#141a24"/>
      <stop offset="100%" stop-color="#0b1018"/>
    </linearGradient>
  </defs>
  <rect width="500" height="750" fill="url(#bg)"/>
  <rect x="70" y="100" width="360" height="520" rx="20" fill="none" stroke="#2c3a52" stroke-width="6"/>
  <path d="M120 540l88-104 70 82 54-63 48 85H120z" fill="#2c3a52"/>
  <circle cx="188" cy="240" r="28" fill="#2c3a52"/>
  <text x="250" y="650" text-anchor="middle" font-family="Arial,sans-serif" font-size="30" fill="#9fb0c9">
    No Poster
  </text>
</svg>`
const POSTER_FALLBACK_URL = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(POSTER_FALLBACK_SVG)}`

const getPosterUrl = (posterPath: string | null) =>
  posterPath ? `${POSTER_BASE_URL}${posterPath}` : POSTER_FALLBACK_URL

const getRatingPercent = (voteAverage: number) => {
  const normalized = Math.round(voteAverage * 10)
  return Math.min(100, Math.max(0, normalized))
}

const getRatingColor = (rating: number) => {
  if (rating >= 70) return '#21d07a'
  if (rating >= 50) return '#d2d531'
  return '#db2360'
}

const getReleaseYear = (releaseDate?: string) => releaseDate?.slice(0, 4)

interface Props {
  movie: Movie
}

export const MovieCard = ({ movie }: Props) => {
  const navigate = useNavigate()

  const poster = getPosterUrl(movie.poster_path)
  const rating = getRatingPercent(movie.vote_average)
  const ratingColor = getRatingColor(rating)
  const year = getReleaseYear(movie.release_date)
  const detailsPath = `/movie/${movie.id}`

  const handleOpenMovie = () => {
    navigate(detailsPath)
  }

  const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.currentTarget !== event.target) return
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    handleOpenMovie()
  }

  return (
    <Card
      sx={cardStyles}
      onClick={handleOpenMovie}
      onKeyDown={handleCardKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Open details for ${movie.title}`}
    >
      <Box sx={posterWrapperStyles}>
        <IconButton
          sx={favoriteButtonStyles}
          aria-label={`Add "${movie.title}" to favorites`}
          onClick={event => event.stopPropagation()}
        >
          <FavoriteIcon sx={{ color: 'white' }} />
        </IconButton>

        <CardMedia
          component="img"
          height="300"
          image={poster}
          alt={movie.title}
          loading="lazy"
          className="movie-card-poster"
          sx={posterStyles}
        />

        <Box sx={theme => ratingBadgeStyles(theme, ratingColor, rating)}>{rating}%</Box>
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
