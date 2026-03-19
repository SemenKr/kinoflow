import { Box, Skeleton, Stack } from '@mui/material'

interface PageLoaderProps {
  lines?: number
}

export const PageLoader = ({ lines = 3 }: PageLoaderProps) => {
  return (
    <Box sx={{ px: { xs: 2, sm: 3 }, py: 3 }}>
      <Stack spacing={2.5}>
        <Box>
          <Skeleton variant="text" width="32%" height={52} />
          <Skeleton variant="text" width="48%" height={28} />
        </Box>

        <Skeleton variant="rectangular" height={280} sx={{ borderRadius: 3 }} />

        <Stack spacing={1.2}>
          {Array.from({ length: lines }).map((_, index) => (
            <Skeleton
              key={index}
              variant="text"
              width={index === lines - 1 ? '72%' : '100%'}
              height={26}
            />
          ))}
        </Stack>
      </Stack>
    </Box>
  )
}
