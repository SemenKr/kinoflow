import { MovieCard } from '@/features/movies/ui/MovieGrid/MovieCard/MovieCard'
import { Box } from '@mui/material'


interface Movie {
  id: number
  title: string
  poster_path: string | null
  vote_average: number
}

interface Props {
  movies: Movie[]
}

export const MovieGrid = ({ movies }: Props) => {
  return (
    <Box
      sx={{
    display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, 200px)',
      gap: 2,
      justifyContent: 'center',
  }}
>
  {movies.map(movie => (
    <MovieCard key={movie.id} movie={movie} />
  ))}
  </Box>
)
}
