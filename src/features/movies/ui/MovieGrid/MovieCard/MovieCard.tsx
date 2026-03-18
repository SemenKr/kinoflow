import { Card, CardMedia, CardContent, Typography, Box, IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useNavigate } from 'react-router-dom'
import {
  cardStyles,
  contentStyles,
  favoriteButtonStyles,
  posterStyles,
  posterWrapperStyles,
  ratingBadgeStyles,
  titleStyles,
} from './MovieCard.styles'

interface Movie {
  id: number
  title: string
  poster_path: string | null
  vote_average: number
  release_date?: string
}

interface Props {
  movie: Movie
}

export const MovieCard = ({ movie }: Props) => {
  const navigate = useNavigate()

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://placehold.co/500x750'

  const rating = Math.round(movie.vote_average * 10)

  const getRatingColor = () => {
    if (rating >= 70) return '#21d07a'
    if (rating >= 50) return '#d2d531'
    return '#db2360'
  }

  const year = movie.release_date?.slice(0, 4)

  return (
    <Card sx={cardStyles}>
      <Box sx={posterWrapperStyles}>
        <IconButton sx={favoriteButtonStyles}>
          <FavoriteIcon sx={{ color: 'white' }} />
        </IconButton>

        <CardMedia
          component="img"
          height="300"
          image={poster}
          onClick={() => navigate(`/movie/${movie.id}`)}
          className="movie-card-poster"
          sx={posterStyles}
        />

        <Box sx={theme => ratingBadgeStyles(theme, getRatingColor(), rating)}>{rating}%</Box>
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
