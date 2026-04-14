import {
  useGetPersonCombinedCreditsQuery,
  useGetPersonDetailsQuery,
} from '@/features/movies/api/moviesApi'
import { MovieGrid } from '@/features/movies/ui/MovieGrid/MovieGrid'
import { useApiLanguage } from '@/hooks'
import { IMAGE_BASE } from '@/shared/constants'
import { createImageFallbackUrl } from '@/shared/utils/imageFallback'
import { PageLoader } from '@/shared/ui/loading/PageLoader'
import { SectionLoader } from '@/shared/ui/loading/SectionLoader'
import { Box, Button, Chip, Container, Divider, Link, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const PHOTO_FALLBACK = createImageFallbackUrl({
  width: 400,
  height: 600,
  label: 'No Photo',
})

const INITIAL_VISIBLE_MOVIES = 6
const LOAD_MORE_STEP = 6

const statusContainerSx = { py: 6 }

export const PersonDetailsPage = () => {
  const { t, i18n } = useTranslation()
  const { id } = useParams()
  const apiLanguage = useApiLanguage()

  const personId = Number(id)
  const isValidPersonId = Number.isInteger(personId) && personId > 0
  const locale = i18n.resolvedLanguage || 'en'
  const [progressiveReveal, setProgressiveReveal] = useState({
    personId,
    visibleCount: INITIAL_VISIBLE_MOVIES,
  })

  const { data, isLoading, error } = useGetPersonDetailsQuery(
    { personId, language: apiLanguage },
    { skip: !isValidPersonId },
  )
  const {
    data: personMovies = [],
    isLoading: isMoviesLoading,
    error: moviesError,
  } = useGetPersonCombinedCreditsQuery(
    { personId, language: apiLanguage },
    { skip: !isValidPersonId },
  )

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [personId])

  const labels = useMemo(
    () => ({
      unknown: t('movie_details_unknown'),
      error: t('person_details_error'),
      invalidId: t('person_details_invalid_id'),
      empty: t('person_details_empty'),
      biography: t('person_details_biography'),
      department: t('person_details_department'),
      birthday: t('person_details_birthday'),
      deathday: t('person_details_deathday'),
      placeOfBirth: t('person_details_place_of_birth'),
      homepage: t('person_details_homepage'),
      moviesTitle: t('person_details_movies_title'),
      moviesError: t('person_details_movies_error'),
      moviesEmpty: t('person_details_movies_empty'),
      expand: t('movie_details_cast_expand'),
      collapse: t('movie_details_cast_collapse'),
    }),
    [t],
  )

  const formatDate = (date: string | null) => {
    if (!date) return labels.unknown
    const parsedDate = new Date(date)
    if (Number.isNaN(parsedDate.getTime())) return labels.unknown
    return new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(parsedDate)
  }

  if (!isValidPersonId) {
    return (
      <Container maxWidth="lg" sx={statusContainerSx}>
        <Typography>{labels.invalidId}</Typography>
      </Container>
    )
  }

  if (isLoading) {
    return <PageLoader lines={5} />
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={statusContainerSx}>
        <Typography>{labels.error}</Typography>
      </Container>
    )
  }

  if (!data) {
    return (
      <Container maxWidth="lg" sx={statusContainerSx}>
        <Typography color="text.secondary">{labels.empty}</Typography>
      </Container>
    )
  }

  const photo = data.profile_path ? `${IMAGE_BASE}/w500${data.profile_path}` : PHOTO_FALLBACK
  const currentVisibleCount =
    progressiveReveal.personId === personId
      ? progressiveReveal.visibleCount
      : INITIAL_VISIBLE_MOVIES
  const visibleMovies = personMovies.slice(0, currentVisibleCount)
  const canExpand = personMovies.length > currentVisibleCount
  const canCollapse = currentVisibleCount > INITIAL_VISIBLE_MOVIES

  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: { xs: 520, md: 600 },
          backgroundImage: `url(${photo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        <Box
          sx={theme => ({
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(100deg, ${alpha(theme.palette.background.default, 0.95)} 16%, ${alpha(
              theme.palette.background.default,
              0.82,
            )} 52%, ${alpha(theme.palette.background.default, 0.94)} 100%)`,
          })}
        />

        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 }, position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '280px 1fr' },
              gap: { xs: 2.5, md: 3.5 },
              alignItems: 'start',
            }}
          >
            <Box
              component="img"
              src={photo}
              alt={data.name}
              loading="lazy"
              onError={event => {
                if (!event.currentTarget.src.includes('data:image')) {
                  event.currentTarget.src = PHOTO_FALLBACK
                }
              }}
              sx={theme => ({
                width: '100%',
                maxWidth: { xs: 320, md: '100%' },
                mx: { xs: 'auto', md: 0 },
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.common.white, 0.18)}`,
                objectFit: 'cover',
                boxShadow:
                  theme.palette.mode === 'dark'
                    ? `0 20px 44px ${alpha(theme.palette.common.black, 0.45)}`
                    : `0 14px 30px ${alpha(theme.palette.common.black, 0.22)}`,
              })}
            />

            <Box
              sx={theme => ({
                p: { xs: 2, md: 3 },
                borderRadius: 3,
                backgroundColor: alpha(
                  theme.palette.background.paper,
                  theme.palette.mode === 'dark' ? 0.74 : 0.92,
                ),
                border: `1px solid ${alpha(
                  theme.palette.text.primary,
                  theme.palette.mode === 'dark' ? 0.1 : 0.08,
                )}`,
              })}
            >
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, lineHeight: 1.1 }}>
                {data.name || labels.unknown}
              </Typography>

              <Chip
                size="small"
                label={`${labels.department}: ${data.known_for_department || labels.unknown}`}
                sx={theme => ({
                  mb: 2.5,
                  color: theme.palette.text.primary,
                  backgroundColor: alpha(theme.palette.background.paper, 0.65),
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.28)}`,
                })}
              />

              <Typography variant="h6" sx={{ mb: 1.2 }}>
                {labels.biography}
              </Typography>
              <Typography sx={{ mb: 2.5, lineHeight: 1.7 }}>
                {data.biography || labels.unknown}
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: 'grid', gap: 1 }}>
                <Typography>
                  {labels.birthday}: {formatDate(data.birthday)}
                </Typography>
                <Typography>
                  {labels.deathday}: {formatDate(data.deathday)}
                </Typography>
                <Typography>
                  {labels.placeOfBirth}: {data.place_of_birth || labels.unknown}
                </Typography>
                <Typography>
                  {labels.homepage}:{' '}
                  {data.homepage ? (
                    <Link href={data.homepage} target="_blank" rel="noopener noreferrer">
                      {data.homepage}
                    </Link>
                  ) : (
                    labels.unknown
                  )}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {labels.moviesTitle}
        </Typography>

        {isMoviesLoading && <SectionLoader cards={6} titleWidth="34%" />}

        {!isMoviesLoading && moviesError && (
          <Typography color="text.secondary">{labels.moviesError}</Typography>
        )}

        {!isMoviesLoading && !moviesError && personMovies.length === 0 && (
          <Typography color="text.secondary">{labels.moviesEmpty}</Typography>
        )}

        {!isMoviesLoading && !moviesError && personMovies.length > 0 && (
          <>
            <MovieGrid movies={visibleMovies} />
            {(canExpand || canCollapse) && (
              <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {canExpand && (
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => {
                      setProgressiveReveal(prev => {
                        const baseCount =
                          prev.personId === personId ? prev.visibleCount : INITIAL_VISIBLE_MOVIES

                        return {
                          personId,
                          visibleCount: Math.min(baseCount + LOAD_MORE_STEP, personMovies.length),
                        }
                      })
                    }}
                    sx={{ textTransform: 'none', whiteSpace: 'nowrap', borderRadius: 999, px: 1.5 }}
                  >
                    {labels.expand}
                  </Button>
                )}
                {canCollapse && (
                  <Button
                    size="small"
                    variant="text"
                    onClick={() =>
                      setProgressiveReveal({ personId, visibleCount: INITIAL_VISIBLE_MOVIES })
                    }
                    sx={{ textTransform: 'none', whiteSpace: 'nowrap', borderRadius: 999, px: 1.5 }}
                  >
                    {labels.collapse}
                  </Button>
                )}
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  )
}
