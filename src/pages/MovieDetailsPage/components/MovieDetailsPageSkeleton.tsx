import { Container, Box, Skeleton, Stack } from '@mui/material'

import {
  detailsContainerSx,
  detailsGridSx,
  heroContainerSx,
  heroContentGridSx,
  heroSectionSx,
  heroStackDirection,
  heroStackSpacing,
  posterSx,
  surfaceSx,
} from '../MovieDetailsPage.styles'

const chipsRowSx = {
  display: 'flex',
  gap: 1,
  flexWrap: 'wrap' as const,
}

const factsStackSx = {
  display: 'grid',
  gap: 1,
}

const carouselRowSx = {
  display: 'flex',
  gap: { xs: 1.75, md: 2.25 },
  overflow: 'hidden',
}

export const MovieDetailsPageSkeleton = () => {
  return (
    <Box>
      <Box sx={heroSectionSx('')}>
        <Box
          sx={theme => ({
            position: 'absolute',
            inset: 0,
            background: theme.palette.action.hover,
            opacity: 0.35,
          })}
        />

        <Container maxWidth="lg" sx={heroContainerSx}>
          <Stack direction={heroStackDirection} spacing={heroStackSpacing}>
            <Skeleton
              variant="rectangular"
              sx={theme => ({
                ...posterSx(theme),
                border: 'none',
              })}
            />

            <Box sx={heroContentGridSx}>
              <Box>
                <Skeleton variant="text" width="58%" height={58} />
                <Skeleton variant="text" width="42%" height={28} />

                <Box sx={{ ...chipsRowSx, mt: 2 }}>
                  <Skeleton variant="rounded" width={120} height={32} />
                  <Skeleton variant="rounded" width={132} height={32} />
                  <Skeleton variant="rounded" width={96} height={32} />
                </Box>

                <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2.5 }}>
                  <Skeleton variant="circular" width={58} height={58} />
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Skeleton variant="text" width="34%" height={24} />
                    <Skeleton variant="text" width="22%" height={20} />
                  </Box>
                </Stack>

                <Box sx={{ ...chipsRowSx, mt: 2.5 }}>
                  <Skeleton variant="rounded" width={84} height={28} />
                  <Skeleton variant="rounded" width={96} height={28} />
                  <Skeleton variant="rounded" width={76} height={28} />
                </Box>
              </Box>

              <Box sx={theme => surfaceSx(0)(theme)}>
                <Skeleton variant="text" width="36%" height={34} />
                <Box sx={{ ...factsStackSx, mt: 1.25 }}>
                  <Skeleton variant="text" width="72%" height={24} />
                  <Skeleton variant="text" width="68%" height={24} />
                  <Skeleton variant="text" width="64%" height={24} />
                  <Skeleton variant="text" width="74%" height={24} />
                  <Skeleton variant="text" width="56%" height={24} />
                  <Skeleton variant="text" width="62%" height={24} />
                </Box>
              </Box>
            </Box>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={detailsContainerSx}>
        <Box sx={detailsGridSx}>
          <Box sx={theme => surfaceSx(0)(theme)}>
            <Skeleton variant="text" width="28%" height={34} />
            <Stack spacing={1}>
              <Skeleton variant="text" width="100%" height={24} />
              <Skeleton variant="text" width="96%" height={24} />
              <Skeleton variant="text" width="92%" height={24} />
              <Skeleton variant="text" width="84%" height={24} />
            </Stack>
          </Box>

          <Box sx={theme => surfaceSx(0)(theme)}>
            <Skeleton variant="text" width="34%" height={28} />
            <Box sx={{ ...chipsRowSx, mt: 1.5 }}>
              <Skeleton variant="rounded" width={88} height={28} />
              <Skeleton variant="rounded" width={104} height={28} />
              <Skeleton variant="rounded" width={92} height={28} />
            </Box>
            <Skeleton variant="text" width="32%" height={28} sx={{ mt: 2 }} />
            <Box sx={{ ...chipsRowSx, mt: 1 }}>
              <Skeleton variant="rounded" width={124} height={28} />
              <Skeleton variant="rounded" width={148} height={28} />
            </Box>
          </Box>
        </Box>
      </Container>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Skeleton variant="text" width="18%" height={34} sx={{ mb: 2 }} />
        <Box sx={carouselRowSx}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Box key={index} sx={{ width: { xs: 160, sm: 180, md: 188 }, flex: '0 0 auto' }}>
              <Skeleton variant="rectangular" sx={{ width: '100%', aspectRatio: '5 / 7', borderRadius: 3, mb: 1.25 }} />
              <Skeleton variant="text" height={24} width="82%" />
              <Skeleton variant="text" height={18} width="34%" />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
