import { Box, Skeleton, type SxProps, type Theme } from '@mui/material'

interface MovieCardSkeletonProps {
  sx?: SxProps<Theme>
}

const skeletonCardSx: SxProps<Theme> = {
  width: '100%',
  maxWidth: 188,
  mx: 'auto',
}

const skeletonPosterSx: SxProps<Theme> = {
  width: '100%',
  aspectRatio: '5 / 7',
  borderRadius: 3,
  mb: 1.25,
}

export const MovieCardSkeleton = ({ sx }: MovieCardSkeletonProps) => {
  return (
    <Box sx={[skeletonCardSx, ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}>
      <Skeleton variant="rectangular" sx={skeletonPosterSx} />
      <Skeleton variant="text" height={24} width="82%" />
      <Skeleton variant="text" height={18} width="34%" />
    </Box>
  )
}
