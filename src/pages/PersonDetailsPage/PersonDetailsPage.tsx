import { useGetPersonDetailsQuery } from '@/features/movies/api/moviesApi'
import { useApiLanguage } from '@/hooks'
import { IMAGE_BASE } from '@/shared/constants'
import { createImageFallbackUrl } from '@/shared/utils/imageFallback'
import { PageLoader } from '@/shared/ui/loading/PageLoader'
import { Box, Container, Link, Typography } from '@mui/material'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const PHOTO_FALLBACK = createImageFallbackUrl({
  width: 400,
  height: 600,
  label: 'No Photo',
})

const statusContainerSx = { py: 6 }

export const PersonDetailsPage = () => {
  const { t, i18n } = useTranslation()
  const { id } = useParams()
  const apiLanguage = useApiLanguage()

  const personId = Number(id)
  const isValidPersonId = Number.isInteger(personId) && personId > 0
  const locale = i18n.resolvedLanguage || 'en'

  const { data, isLoading, error } = useGetPersonDetailsQuery(
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

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
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
          sx={{
            width: '100%',
            maxWidth: { xs: 320, md: '100%' },
            mx: { xs: 'auto', md: 0 },
            borderRadius: 2.5,
            objectFit: 'cover',
            boxShadow: theme =>
              theme.palette.mode === 'dark'
                ? '0 14px 30px rgba(0,0,0,0.38)'
                : '0 12px 24px rgba(0,0,0,0.16)',
          }}
        />

        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            {data.name || labels.unknown}
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 2.5 }}>
            {labels.department}: {data.known_for_department || labels.unknown}
          </Typography>

          <Typography variant="h6" sx={{ mb: 1 }}>
            {labels.biography}
          </Typography>
          <Typography sx={{ mb: 2.5, lineHeight: 1.7 }}>
            {data.biography || labels.unknown}
          </Typography>

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
  )
}
