import { MovieCardSkeleton } from '@/features/movies/ui/MovieGrid/MovieCardSkeleton'
import { Box, Skeleton, Stack } from '@mui/material'

interface SectionLoaderProps {
  cards?: number
  titleWidth?: string | number
  showTitle?: boolean
}

export const SectionLoader = ({
  cards = 4,
  titleWidth = '28%',
  showTitle = true,
}: SectionLoaderProps) => {
  return (
    <Stack spacing={2}>
      {showTitle && <Skeleton variant="text" width={titleWidth} height={36} />}
      <Box sx={{ display: 'flex', gap: { xs: 1.75, md: 2.25 }, overflow: 'hidden' }}>
        {Array.from({ length: cards }).map((_, index) => (
          <MovieCardSkeleton
            key={index}
            sx={{
              flex: '0 0 auto',
              width: { xs: 160, sm: 180, md: 188 },
            }}
          />
        ))}
      </Box>
    </Stack>
  )
}
