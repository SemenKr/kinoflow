import { Box } from '@mui/material'
import { MovieCardSkeleton } from './MovieCardSkeleton'

interface MovieGridSkeletonProps {
  cards?: number
}

export const MovieGridSkeleton = ({ cards = 10 }: MovieGridSkeletonProps) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))',
        gap: { xs: 1.75, md: 2.25 },
      }}
    >
      {Array.from({ length: cards }).map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </Box>
  )
}
