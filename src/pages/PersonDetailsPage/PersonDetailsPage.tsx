import {
  useGetPersonCombinedCreditsQuery,
  useGetPersonDetailsQuery,
  useGetPersonExternalIdsQuery,
} from '@/features/movies/api/moviesApi'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LocalMoviesIcon from '@mui/icons-material/LocalMovies'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import PublicIcon from '@mui/icons-material/Public'
import YouTubeIcon from '@mui/icons-material/YouTube'
import { MovieGrid } from '@/features/movies/ui/MovieGrid/MovieGrid'
import { useApiLanguage } from '@/hooks'
import { useProgressiveReveal } from '@/pages/PersonDetailsPage/hooks/useProgressiveReveal'
import { IMAGE_BASE } from '@/shared/constants'
import { createImageFallbackUrl } from '@/shared/utils/imageFallback'
import { PageLoader } from '@/shared/ui/loading/PageLoader'
import { SectionLoader } from '@/shared/ui/loading/SectionLoader'
import { Box, Button, Container, IconButton, Link, Tooltip, Typography } from '@mui/material'
import { alpha, type Theme } from '@mui/material/styles'
import { type ReactElement, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

const PHOTO_FALLBACK = createImageFallbackUrl({
  width: 400,
  height: 600,
  label: 'No Photo',
})

const INITIAL_VISIBLE_MOVIES = 6
const LOAD_MORE_STEP = 6

const statusContainerSx = { py: 6 }
const fixedBackWrapSx = {
  position: 'fixed',
  top: { xs: 72, md: 84 },
  right: { xs: 10, md: 18 },
  zIndex: 1090,
}
const backButtonSx = (theme: Theme) => ({
  minWidth: { xs: 'auto', sm: 112 },
  px: { xs: 0.9, sm: 1.2 },
  py: { xs: 0.45, sm: 0.6 },
  fontSize: { xs: 12, sm: 14 },
  borderRadius: 999,
  color: theme.palette.text.primary,
  backgroundColor: alpha(
    theme.palette.background.paper,
    theme.palette.mode === 'dark' ? 0.9 : 0.94,
  ),
  borderColor: alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.42 : 0.26),
  boxShadow:
    theme.palette.mode === 'dark'
      ? `0 8px 18px ${alpha(theme.palette.common.black, 0.34)}`
      : `0 6px 14px ${alpha(theme.palette.common.black, 0.16)}`,
  backdropFilter: 'blur(8px)',
  '&:hover': {
    backgroundColor: alpha(
      theme.palette.background.paper,
      theme.palette.mode === 'dark' ? 0.96 : 1,
    ),
    borderColor: alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.64 : 0.4),
  },
})

type ExternalLink = {
  key: string
  label: string
  href: string
  icon: ReactElement
}

const getTrimmedValue = (value: string | null | undefined) => {
  const trimmed = value?.trim()
  return trimmed ? trimmed : null
}

const encodePathSegment = (value: string) => encodeURIComponent(value)

export const PersonDetailsPage = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams()
  const apiLanguage = useApiLanguage()
  const filmographyGridId = `person-filmography-grid-${useId()}`

  const personId = Number(id)
  const isValidPersonId = Number.isInteger(personId) && personId > 0
  const locale = i18n.resolvedLanguage || 'en'
  const [bioDisclosure, setBioDisclosure] = useState({
    personId,
    isExpanded: false,
  })
  const [bioOverflowState, setBioOverflowState] = useState({
    personId,
    isOverflowing: false,
  })
  const biographyTextRef = useRef<HTMLParagraphElement | null>(null)
  const filmographySectionRef = useRef<HTMLDivElement | null>(null)
  const filmographyHeadingRef = useRef<HTMLHeadingElement | null>(null)

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
  const { data: externalIds } = useGetPersonExternalIdsQuery(
    { personId, language: apiLanguage },
    { skip: !isValidPersonId },
  )

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [personId])

  const labels = useMemo(
    () => ({
      error: t('person_details_error'),
      back: t('movie_details_back'),
      invalidId: t('person_details_invalid_id'),
      empty: t('person_details_empty'),
      biography: t('person_details_biography'),
      department: t('person_details_department'),
      birthday: t('person_details_birthday'),
      deathday: t('person_details_deathday'),
      placeOfBirth: t('person_details_place_of_birth'),
      homepage: t('person_details_homepage'),
      externalLinks: t('person_details_external_links'),
      externalLinkUnknownPerson: t('person_details_external_link_unknown_person'),
      moviesTitle: t('person_details_movies_title'),
      moviesError: t('person_details_movies_error'),
      moviesEmpty: t('person_details_movies_empty'),
      moviesShowAll: t('person_details_movies_show_all'),
      moviesShowLess: t('person_details_movies_show_less'),
      moviesControlsAria: t('person_details_movies_controls_aria'),
      bioExpand: t('person_details_bio_expand'),
      bioCollapse: t('person_details_bio_collapse'),
    }),
    [t],
  )
  const { visibleCount, canExpand, canCollapse, showMore, showAll, hide } = useProgressiveReveal({
    total: personMovies.length,
    initial: INITIAL_VISIBLE_MOVIES,
    step: LOAD_MORE_STEP,
    resetKey: personId,
  })

  const isBioExpanded = bioDisclosure.personId === personId ? bioDisclosure.isExpanded : false
  const handleBack = useCallback(() => navigate(-1), [navigate])
  const handleCollapseMovies = useCallback(() => {
    hide()

    window.requestAnimationFrame(() => {
      const prefersReducedMotion =
        typeof window.matchMedia === 'function'
          ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
          : false

      filmographySectionRef.current?.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      })
      filmographyHeadingRef.current?.focus({ preventScroll: true })
    })
  }, [hide])
  const biographyTextForMeasure = data?.biography?.trim() || null

  useEffect(() => {
    if (!biographyTextForMeasure || isBioExpanded) return

    const measureOverflow = () => {
      const element = biographyTextRef.current
      if (!element) return

      const isOverflowing = element.scrollHeight > element.clientHeight + 1
      setBioOverflowState(prev => {
        if (prev.personId === personId && prev.isOverflowing === isOverflowing) return prev

        return { personId, isOverflowing }
      })
    }

    const animationFrameId = window.requestAnimationFrame(measureOverflow)
    const handleResize = () => {
      window.requestAnimationFrame(measureOverflow)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [biographyTextForMeasure, isBioExpanded, personId])

  const formatDate = (date: string | null) => {
    if (!date) return null
    const parsedDate = new Date(date)
    if (Number.isNaN(parsedDate.getTime())) return null
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
  const isBioOverflowing =
    bioOverflowState.personId === personId ? bioOverflowState.isOverflowing : false
  const personName = data.name?.trim() || null
  const biographyText = data.biography?.trim() || null
  const canToggleBiography = Boolean(biographyText && (isBioExpanded || isBioOverflowing))
  const department = data.known_for_department?.trim() || null
  const birthday = formatDate(data.birthday)
  const deathday = formatDate(data.deathday)
  const placeOfBirth = data.place_of_birth?.trim() || null
  const homepage = data.homepage?.trim() || null
  const imdbId = getTrimmedValue(externalIds?.imdb_id)
  const wikidataId = getTrimmedValue(externalIds?.wikidata_id)
  const facebookId = getTrimmedValue(externalIds?.facebook_id)
  const instagramId = getTrimmedValue(externalIds?.instagram_id)
  const tiktokIdRaw = getTrimmedValue(externalIds?.tiktok_id)
  const twitterIdRaw = getTrimmedValue(externalIds?.twitter_id)
  const youtubeId = getTrimmedValue(externalIds?.youtube_id)
  const tiktokId = tiktokIdRaw ? tiktokIdRaw.replace(/^@/, '') : null
  const twitterId = twitterIdRaw ? twitterIdRaw.replace(/^@/, '') : null
  const externalLinksRaw: Array<ExternalLink | null> = [
    imdbId
      ? {
          key: 'imdb',
          label: 'IMDb',
          href: `https://www.imdb.com/name/${encodePathSegment(imdbId)}`,
          icon: <LocalMoviesIcon fontSize="small" />,
        }
      : null,
    wikidataId
      ? {
          key: 'wikidata',
          label: 'Wikidata',
          href: `https://www.wikidata.org/wiki/${encodePathSegment(wikidataId)}`,
          icon: <PublicIcon fontSize="small" />,
        }
      : null,
    facebookId
      ? {
          key: 'facebook',
          label: 'Facebook',
          href: `https://www.facebook.com/${encodePathSegment(facebookId)}`,
          icon: <FacebookIcon fontSize="small" />,
        }
      : null,
    instagramId
      ? {
          key: 'instagram',
          label: 'Instagram',
          href: `https://www.instagram.com/${encodePathSegment(instagramId)}`,
          icon: <InstagramIcon fontSize="small" />,
        }
      : null,
    tiktokId
      ? {
          key: 'tiktok',
          label: 'TikTok',
          href: `https://www.tiktok.com/@${encodePathSegment(tiktokId)}`,
          icon: <MusicNoteIcon fontSize="small" />,
        }
      : null,
    twitterId
      ? {
          key: 'x',
          label: 'X',
          href: `https://x.com/${encodePathSegment(twitterId)}`,
          icon: <AlternateEmailIcon fontSize="small" />,
        }
      : null,
    youtubeId
      ? {
          key: 'youtube',
          label: 'YouTube',
          href: `https://www.youtube.com/${encodePathSegment(youtubeId)}`,
          icon: <YouTubeIcon fontSize="small" />,
        }
      : null,
  ]
  const externalLinks = externalLinksRaw.filter((link): link is ExternalLink => link !== null)
  const hasPersonalInfo = Boolean(department || birthday || deathday || placeOfBirth || homepage)
  const hasSidebarDetails = hasPersonalInfo || externalLinks.length > 0
  const visibleMovies = personMovies.slice(0, visibleCount)
  const remainingMovies = Math.max(personMovies.length - visibleCount, 0)
  const showMoreCount = Math.min(remainingMovies, LOAD_MORE_STEP)
  const canShowAll = canExpand && remainingMovies > LOAD_MORE_STEP

  return (
    <Box>
      <Box sx={fixedBackWrapSx}>
        <Button
          variant="outlined"
          onClick={handleBack}
          startIcon={<ArrowBackRoundedIcon />}
          size="small"
          sx={backButtonSx}
        >
          {labels.back}
        </Button>
      </Box>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '280px 1fr' },
            gap: { xs: 2.5, md: 3.5 },
            alignItems: 'start',
          }}
        >
          <Box sx={{ display: 'grid', gap: 2 }}>
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
                border: `1px solid ${alpha(
                  theme.palette.text.primary,
                  theme.palette.mode === 'dark' ? 0.16 : 0.1,
                )}`,
                objectFit: 'cover',
                boxShadow:
                  theme.palette.mode === 'dark'
                    ? `0 20px 44px ${alpha(theme.palette.common.black, 0.45)}`
                    : `0 14px 30px ${alpha(theme.palette.common.black, 0.22)}`,
              })}
            />

            {hasSidebarDetails && (
              <Box
                sx={theme => ({
                  p: { xs: 2, md: 2.25 },
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
                <Box sx={{ display: 'grid', gap: 1 }}>
                  {department && (
                    <Typography>
                      {labels.department}: {department}
                    </Typography>
                  )}
                  {birthday && (
                    <Typography>
                      {labels.birthday}: {birthday}
                    </Typography>
                  )}
                  {deathday && (
                    <Typography>
                      {labels.deathday}: {deathday}
                    </Typography>
                  )}
                  {placeOfBirth && (
                    <Typography>
                      {labels.placeOfBirth}: {placeOfBirth}
                    </Typography>
                  )}
                  {homepage && (
                    <Typography>
                      {labels.homepage}:{' '}
                      <Link href={homepage} target="_blank" rel="noopener noreferrer">
                        {homepage}
                      </Link>
                    </Typography>
                  )}
                </Box>
                {externalLinks.length > 0 && (
                  <Box sx={{ mt: hasPersonalInfo ? 1.5 : 0 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>
                      {labels.externalLinks}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                      {externalLinks.map(link => (
                        <Tooltip key={link.key} title={link.label} arrow>
                          <IconButton
                            component="a"
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={t('person_details_external_link_aria', {
                              platform: link.label,
                              person: personName || labels.externalLinkUnknownPerson,
                            })}
                            size="small"
                            sx={theme => ({
                              border: `1px solid ${alpha(
                                theme.palette.text.primary,
                                theme.palette.mode === 'dark' ? 0.2 : 0.14,
                              )}`,
                              color: theme.palette.text.primary,
                              transition: 'background-color 0.2s ease, color 0.2s ease',
                              '&:hover': {
                                backgroundColor: alpha(theme.palette.primary.main, 0.12),
                                color: theme.palette.primary.main,
                              },
                            })}
                          >
                            {link.icon}
                          </IconButton>
                        </Tooltip>
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            )}
          </Box>

          <Box sx={{ display: 'grid', gap: { xs: 2.5, md: 3 } }}>
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
              {personName && (
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, lineHeight: 1.1 }}>
                  {personName}
                </Typography>
              )}
              {biographyText && (
                <>
                  <Typography variant="h6" sx={{ mb: 1.2 }}>
                    {labels.biography}
                  </Typography>
                  <Typography
                    ref={biographyTextRef}
                    sx={{
                      mb: canToggleBiography ? 1.2 : 0,
                      lineHeight: 1.7,
                      ...(!isBioExpanded
                        ? {
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 6,
                          }
                        : {}),
                    }}
                  >
                    {biographyText}
                  </Typography>
                  {canToggleBiography && (
                    <Button
                      size="small"
                      variant="text"
                      onClick={() =>
                        setBioDisclosure({
                          personId,
                          isExpanded: !isBioExpanded,
                        })
                      }
                      sx={{
                        textTransform: 'none',
                        whiteSpace: 'nowrap',
                        borderRadius: 999,
                        px: 1.5,
                      }}
                    >
                      {isBioExpanded ? labels.bioCollapse : labels.bioExpand}
                    </Button>
                  )}
                </>
              )}
            </Box>

            <Box ref={filmographySectionRef}>
              <Typography ref={filmographyHeadingRef} variant="h6" tabIndex={-1} sx={{ mb: 2 }}>
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
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {t('person_details_movies_count', { count: personMovies.length })}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    aria-live="polite"
                    sx={{ mb: 1.5 }}
                  >
                    {t('person_details_movies_progress', {
                      visible: visibleMovies.length,
                      total: personMovies.length,
                    })}
                  </Typography>
                  <Box id={filmographyGridId}>
                    <MovieGrid movies={visibleMovies} />
                  </Box>
                  {(canExpand || canCollapse) && (
                    <Box
                      role="group"
                      aria-label={labels.moviesControlsAria}
                      sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}
                    >
                      {canExpand && (
                        <Button
                          size="small"
                          variant="contained"
                          onClick={showMore}
                          aria-controls={filmographyGridId}
                          sx={{
                            textTransform: 'none',
                            whiteSpace: 'nowrap',
                            borderRadius: 999,
                            px: 1.5,
                          }}
                        >
                          {t('person_details_movies_show_more', { count: showMoreCount })}
                        </Button>
                      )}
                      {canShowAll && (
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={showAll}
                          aria-controls={filmographyGridId}
                          sx={{
                            textTransform: 'none',
                            whiteSpace: 'nowrap',
                            borderRadius: 999,
                            px: 1.5,
                          }}
                        >
                          {labels.moviesShowAll}
                        </Button>
                      )}
                      {canCollapse && (
                        <Button
                          size="small"
                          variant="text"
                          onClick={handleCollapseMovies}
                          aria-controls={filmographyGridId}
                          sx={{
                            textTransform: 'none',
                            whiteSpace: 'nowrap',
                            borderRadius: 999,
                            px: 1.5,
                          }}
                        >
                          {labels.moviesShowLess}
                        </Button>
                      )}
                    </Box>
                  )}
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
