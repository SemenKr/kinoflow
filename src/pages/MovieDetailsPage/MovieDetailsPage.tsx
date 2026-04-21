import {
  useGetMovieCreditsQuery,
  useGetMovieDetailsQuery,
  useGetMovieVideosQuery,
} from '@/features/movies/api/moviesApi'
import { ActorsSection } from '@/features/movies/ui/ActorsSection/ActorsSection'
import { SimilarMoviesSection } from '@/features/movies/ui/SimilarMoviesSection/SimilarMoviesSection'
import { useApiLanguage } from '@/hooks'
import { IMAGE_BASE } from '@/shared/constants'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import { Box, Button, Container, Typography } from '@mui/material'
import { useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import {
  backButtonSx,
  detailsContainerSx,
  detailsGridSx,
  errorContainerSx,
  fixedBackWrapSx,
  pageRootSx,
} from './MovieDetailsPage.styles'
import {
  formatMoney,
  formatOneDecimal,
  formatRuntime,
  getRatingColor,
  getRatingPercent,
  normalizeMovie,
  POSTER_FALLBACK_URL,
} from './MovieDetailsPage.utils'
import { HeroSection } from './components/HeroSection'
import { MovieDetailsHeroSkeleton } from './components/MovieDetailsPageSkeleton'
import { OverviewSection } from './components/OverviewSection'
import { ProductionSection } from './components/ProductionSection'
import { TrailerSection } from './components/TrailerSection'

const EMPTY_NORMALIZED: ReturnType<typeof normalizeMovie> = {
  voteAverage: 0,
  popularity: 0,
  originalTitle: '',
}

export const MovieDetailsPage = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams()
  const apiLanguage = useApiLanguage()

  const movieId = Number(id)
  const isValidMovieId = Number.isInteger(movieId) && movieId > 0

  const { data, error } = useGetMovieDetailsQuery(
    { id: movieId, language: apiLanguage },
    { skip: !isValidMovieId },
  )
  const { data: movieCreditsData } = useGetMovieCreditsQuery(
    { movieId, language: apiLanguage },
    { skip: !isValidMovieId },
  )
  const { data: movieVideosData, isLoading: isVideosLoading } = useGetMovieVideosQuery(
    { movieId, language: apiLanguage },
    { skip: !isValidMovieId },
  )
  const locale = i18n.resolvedLanguage || 'en'
  const labels = useMemo(
    () => ({
      unknown: t('movie_details_unknown'),
      error: t('movie_details_error'),
      back: t('movie_details_back'),
      runtimeUnknown: t('movie_runtime_unknown'),
      runtime: t('movie_runtime_label'),
      status: t('movie_details_status'),
      adult: t('movie_details_adult'),
      yes: t('movie_details_yes'),
      no: t('movie_details_no'),
      userScore: t('movie_details_user_score'),
      votes: t('movie_details_votes'),
      facts: t('movie_details_facts'),
      budget: t('movie_details_budget'),
      revenue: t('movie_details_revenue'),
      language: t('movie_details_language'),
      popularity: t('movie_details_popularity'),
      originalTitle: t('movie_details_original_title'),
      collection: t('movie_details_collection'),
      homepage: t('movie_details_homepage'),
      overview: t('movie_details_overview'),
      spokenLanguages: t('movie_details_spoken_languages'),
      countries: t('movie_details_countries'),
      production: t('movie_details_production'),
      trailer: t('movie_details_trailer'),
      trailerPlay: t('movie_details_trailer_play'),
    }),
    [t],
  )

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [movieId])

  const normalizedData = useMemo(() => (data ? normalizeMovie(data) : EMPTY_NORMALIZED), [data])
  const releaseDate = data?.release_date ?? null
  const voteCount = data?.vote_count ?? 0
  const voteAverage = normalizedData.voteAverage
  const releaseDateLabel = useMemo(() => {
    if (!releaseDate) return labels.unknown
    return new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(releaseDate))
  }, [releaseDate, locale, labels.unknown])

  const votesLabel = useMemo(() => {
    return new Intl.NumberFormat(locale).format(voteCount)
  }, [voteCount, locale])
  const genres = useMemo(() => data?.genres ?? [], [data?.genres])
  const spokenLanguages = useMemo(() => data?.spoken_languages ?? [], [data?.spoken_languages])
  const productionCountries = useMemo(
    () => data?.production_countries ?? [],
    [data?.production_countries],
  )
  const productionCompanies = useMemo(
    () => data?.production_companies ?? [],
    [data?.production_companies],
  )

  const rating = useMemo(() => {
    const percent = getRatingPercent(voteAverage)
    return {
      percent,
      value: formatOneDecimal(voteAverage, locale),
      color: getRatingColor(percent),
    }
  }, [voteAverage, locale])
  const primaryTrailer = useMemo(() => {
    const youtubeVideos = (movieVideosData?.results ?? []).filter(
      video => video.site === 'YouTube' && Boolean(video.key),
    )
    const officialTrailer = youtubeVideos.find(
      video => video.type === 'Trailer' && video.official === true,
    )

    return officialTrailer ?? youtubeVideos[0] ?? null
  }, [movieVideosData?.results])
  const heroImagePreloadUrl = data?.backdrop_path
    ? `${IMAGE_BASE}/w780${data.backdrop_path}`
    : data?.poster_path
      ? `${IMAGE_BASE}/w500${data.poster_path}`
      : null
  const heroImagePreloadSrcSet = data?.backdrop_path
    ? `${IMAGE_BASE}/w780${data.backdrop_path} 780w, ${IMAGE_BASE}/w1280${data.backdrop_path} 1280w`
    : undefined
  useEffect(() => {
    if (!heroImagePreloadUrl || typeof document === 'undefined') return

    const existingPreload = document.querySelector<HTMLLinkElement>(
      'link[data-lcp-preload="movie-hero-image"]',
    )
    if (existingPreload?.href === heroImagePreloadUrl) return

    if (existingPreload) {
      existingPreload.remove()
    }

    const preloadLink = document.createElement('link')
    preloadLink.rel = 'preload'
    preloadLink.as = 'image'
    preloadLink.href = heroImagePreloadUrl
    if (heroImagePreloadSrcSet) {
      preloadLink.setAttribute('imagesrcset', heroImagePreloadSrcSet)
      preloadLink.setAttribute('imagesizes', '100vw')
    }
    preloadLink.setAttribute('data-lcp-preload', 'movie-hero-image')
    document.head.appendChild(preloadLink)
  }, [heroImagePreloadUrl, heroImagePreloadSrcSet])
  const handleBack = useCallback(() => navigate(-1), [navigate])

  if (error && !data) {
    return (
      <Container maxWidth="lg" sx={errorContainerSx}>
        <Typography>{labels.error}</Typography>
      </Container>
    )
  }
  const movie = data ?? null
  const poster = movie?.poster_path ? `${IMAGE_BASE}/w500${movie.poster_path}` : POSTER_FALLBACK_URL

  const backdrop = movie?.backdrop_path ? `${IMAGE_BASE}/w780${movie.backdrop_path}` : poster
  const backdropLarge = movie?.backdrop_path
    ? `${IMAGE_BASE}/w1280${movie.backdrop_path}`
    : undefined
  const backdropSrcSet = backdropLarge ? `${backdrop} 780w, ${backdropLarge} 1280w` : undefined

  const runtimeLabel = formatRuntime(movie?.runtime ?? null, labels.runtimeUnknown)
  const popularityLabel = formatOneDecimal(normalizedData.popularity, locale)
  const budgetLabel = formatMoney(movie?.budget ?? null, locale, labels.unknown)
  const revenueLabel = formatMoney(movie?.revenue ?? null, locale, labels.unknown)

  const actors = movieCreditsData?.cast ?? []

  return (
    <Box sx={pageRootSx}>
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

      {movie ? (
        <HeroSection
          media={{
            backdrop,
            backdropSrcSet,
            backdropSizes: '100vw',
            poster,
            posterFallback: POSTER_FALLBACK_URL,
          }}
          title={movie.title}
          tagline={movie.tagline}
          meta={{
            releaseDateLabel,
            runtime: runtimeLabel,
            status: movie.status,
            adult: movie.adult,
          }}
          metaLabels={{
            runtime: labels.runtime,
            status: labels.status,
            adult: labels.adult,
            yes: labels.yes,
            no: labels.no,
          }}
          rating={{
            color: rating.color,
            percent: rating.percent,
            value: rating.value,
            userScoreLabel: labels.userScore,
          }}
          stats={{
            votesLabel,
            votesText: labels.votes,
          }}
          genres={genres}
          facts={{
            factsTitle: labels.facts,
            budgetLabelText: labels.budget,
            revenueLabelText: labels.revenue,
            languageLabelText: labels.language,
            popularityLabelText: labels.popularity,
            originalTitleLabelText: labels.originalTitle,
            collectionLabelText: labels.collection,
            budgetValue: budgetLabel,
            revenueValue: revenueLabel,
            languageValue: movie.original_language?.toUpperCase() || labels.unknown,
            popularityValue: popularityLabel,
            originalTitleValue: normalizedData.originalTitle || labels.unknown,
            collectionValue: movie.belongs_to_collection?.name,
            homepage: movie.homepage,
            homepageLabel: labels.homepage,
            imdbId: movie.imdb_id,
          }}
        />
      ) : (
        <MovieDetailsHeroSkeleton />
      )}

      <Container maxWidth="lg" sx={detailsContainerSx}>
        {movie && (
          <>
            <Box sx={detailsGridSx}>
              <OverviewSection
                title={labels.overview}
                overview={movie.overview || labels.unknown}
              />

              <ProductionSection
                spokenLanguagesTitle={labels.spokenLanguages}
                countriesTitle={labels.countries}
                productionTitle={labels.production}
                spokenLanguages={spokenLanguages}
                productionCountries={productionCountries}
                productionCompanies={productionCompanies}
              />
            </Box>
            <TrailerSection
              isLoading={isVideosLoading}
              trailer={
                primaryTrailer ? { key: primaryTrailer.key, name: primaryTrailer.name } : null
              }
              title={labels.trailer}
              playLabel={labels.trailerPlay}
            />
          </>
        )}
      </Container>
      {movie && (
        <>
          <Container maxWidth="lg">
            <ActorsSection key={movie.id} title={t('movie_details_cast')} actors={actors} />
          </Container>
          <Container maxWidth="lg">
            <SimilarMoviesSection
              key={movie.id}
              title={t('movie_details_similar')}
              movieId={movie.id}
              language={apiLanguage}
            />
          </Container>
        </>
      )}
    </Box>
  )
}
