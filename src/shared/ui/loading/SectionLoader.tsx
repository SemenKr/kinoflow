import { Box, Skeleton, Stack } from '@mui/material'

interface SectionLoaderProps {
  cards?: number
  titleWidth?: string | number
}

export const SectionLoader = ({ cards = 4, titleWidth = '28%' }: SectionLoaderProps) => {
  return (
    <Stack spacing={2}>
      <Skeleton variant="text" width={titleWidth} height={36} />
      <Box sx={{ display: 'flex', gap: 2, overflow: 'hidden' }}>
        {Array.from({ length: cards }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            sx={{
              width: { xs: 180, sm: 200, md: 220 },
              aspectRatio: '2 / 3',
              borderRadius: 3,
              flex: '0 0 auto',
            }}
          />
        ))}
      </Box>
    </Stack>
  )
}
