import { useGetMovieDetailsQuery } from '@/features/movies/api/moviesApi'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import { Box, Button, Chip, Container, Divider, Skeleton, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { ROUTES } from '@/shared/constants'
import {
  actionButtonsSx,
  backButtonSx,
  detailsContainerSx,
  detailsGridSx,
  dividerSx,
  errorContainerSx,
  fadeUpSx,
  fixedBackWrapSx,
  genreChipSx,
  genresRowSx,
  heroContainerSx,
  heroContentGridSx,
  heroOverlaySx,
  heroSectionSx,
  heroStackDirection,
  heroStackSpacing,
  languageRowSx,
  loadingContainerSx,
  metaChipsSx,
  overviewTextSx,
  pageRootSx,
  posterSx,
  productionBoxSx,
  quickFactsCardSx,
  quickFactsStackSx,
  quickFactsTitleSx,
  ratingBadgeSx,
  scoreRowSx,
  sectionTitleSx,
  subtitleSx,
  surfaceSx,
  taglineSx,
  titleSx,
} from './MovieDetailsPage.styles'
import {
  formatMoney,
  formatOneDecimal,
  formatRuntime,
  getRatingColor,
  getRatingPercent,
  type MovieDetails,
  POSTER_FALLBACK_URL,
} from './MovieDetailsPage.utils'

export const MovieDetailsPage = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams()

  const movieId = Number(id)
  const isValidMovieId = Number.isFinite(movieId)

  const { data, isLoading, error } = useGetMovieDetailsQuery(movieId, { skip: !isValidMovieId })

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={loadingContainerSx}>
        <Stack spacing={2}>
          <Skeleton variant="rectangular" height={380} sx={{ borderRadius: 3 }} />
          <Skeleton variant="text" height={52} width="60%" />
          <Skeleton variant="text" height={28} width="45%" />
          <Skeleton variant="rectangular" height={140} sx={{ borderRadius: 2 }} />
        </Stack>
      </Container>
    )
  }

  if (error || !data) {
    return (
      <Container maxWidth="lg" sx={errorContainerSx}>
        <Typography>{t('movie_details_error')}</Typography>
      </Container>
    )
  }

  const movie = data as MovieDetails

  const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : ''

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : POSTER_FALLBACK_URL

  const locale = i18n.language || 'en'
  const unknownLabel = t('movie_details_unknown')
  const voteAverage = movie.vote_average ?? 0
  const releaseDateLabel = movie.release_date
    ? new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(new Date(movie.release_date))
    : unknownLabel

  const ratingPercent = getRatingPercent(voteAverage)
  const ratingValue = formatOneDecimal(voteAverage, locale)
  const ratingColor = getRatingColor(ratingPercent)

  const runtimeLabel = formatRuntime(movie.runtime, t('movie_runtime_unknown'))
  const votesLabel = new Intl.NumberFormat(locale).format(movie.vote_count ?? 0)
  const popularityLabel = formatOneDecimal(movie.popularity ?? 0, locale)
  const budgetLabel = formatMoney(movie.budget, locale, unknownLabel)
  const revenueLabel = formatMoney(movie.revenue, locale, unknownLabel)
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
      return
    }
    navigate(ROUTES.home)
  }

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
          {t('movie_details_back')}
        </Button>
      </Box>

      <Box sx={heroSectionSx(backdrop)}>
        <Box sx={heroOverlaySx} />

        <Container maxWidth="lg" sx={heroContainerSx}>
          <Stack direction={heroStackDirection} spacing={heroStackSpacing}>
            <Box
              component="img"
              src={poster}
              alt={movie.title}
              sx={theme => ({ ...posterSx(theme), ...fadeUpSx(520) })}
            />

            <Box sx={heroContentGridSx}>
              <Box sx={fadeUpSx(560)}>
                <Typography variant="h3" sx={titleSx}>
                  {movie.title}
                </Typography>

                {!!movie.tagline && <Typography sx={taglineSx}>{movie.tagline}</Typography>}

                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={metaChipsSx}>
                  <Chip label={releaseDateLabel} size="small" />
                  <Chip label={`${t('movie_runtime_label')}: ${runtimeLabel}`} size="small" />
                  <Chip label={`${t('movie_details_status')}: ${movie.status}`} size="small" />
                  <Chip
                    label={`${t('movie_details_adult')}: ${movie.adult ? t('movie_details_yes') : t('movie_details_no')}`}
                    size="small"
                  />
                </Stack>

                <Stack direction="row" spacing={2} alignItems="center" sx={scoreRowSx}>
                  <Box sx={ratingBadgeSx(ratingColor, ratingPercent)}>{ratingValue}</Box>

                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {t('movie_details_user_score')}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {votesLabel} {t('movie_details_votes')}
                  </Typography>
                </Stack>

                {movie.genres?.length > 0 && (
                  <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={genresRowSx}>
                    {movie.genres.map(genre => (
                      <Chip key={genre.id} label={genre.name} size="small" sx={genreChipSx} />
                    ))}
                  </Stack>
                )}
              </Box>

              <Box sx={theme => ({ ...quickFactsCardSx(theme), ...fadeUpSx(640) })}>
                <Typography variant="subtitle2" color="text.secondary" sx={quickFactsTitleSx}>
                  {t('movie_details_facts')}
                </Typography>

                <Stack spacing={quickFactsStackSx.spacing}>
                  <Typography variant="body2">
                    <strong>{t('movie_details_budget')}:</strong> {budgetLabel}
                  </Typography>
                  <Typography variant="body2">
                    <strong>{t('movie_details_revenue')}:</strong> {revenueLabel}
                  </Typography>
                  <Typography variant="body2">
                    <strong>{t('movie_details_language')}:</strong>{' '}
                    {movie.original_language?.toUpperCase() || unknownLabel}
                  </Typography>
                  <Typography variant="body2">
                    <strong>{t('movie_details_popularity')}:</strong> {popularityLabel}
                  </Typography>
                  <Typography variant="body2">
                    <strong>{t('movie_details_original_title')}:</strong>{' '}
                    {movie.original_title || unknownLabel}
                  </Typography>
                  {movie.belongs_to_collection?.name && (
                    <Typography variant="body2">
                      <strong>{t('movie_details_collection')}:</strong>{' '}
                      {movie.belongs_to_collection.name}
                    </Typography>
                  )}
                </Stack>

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={1.1}
                  sx={actionButtonsSx}
                >
                  {movie.homepage && (
                    <Button
                      variant="contained"
                      href={movie.homepage}
                      target="_blank"
                      rel="noreferrer"
                      endIcon={<OpenInNewRoundedIcon fontSize="small" />}
                    >
                      {t('movie_details_homepage')}
                    </Button>
                  )}

                  {movie.imdb_id && (
                    <Button
                      variant="outlined"
                      href={`https://www.imdb.com/title/${movie.imdb_id}`}
                      target="_blank"
                      rel="noreferrer"
                      endIcon={<OpenInNewRoundedIcon fontSize="small" />}
                    >
                      IMDb
                    </Button>
                  )}
                </Stack>
              </Box>
            </Box>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={detailsContainerSx}>
        <Box sx={detailsGridSx}>
          <Box sx={surfaceSx(700)}>
            <Typography variant="h6" sx={sectionTitleSx}>
              {t('movie_details_overview')}
            </Typography>
            <Typography color="text.secondary" sx={overviewTextSx}>
              {movie.overview || unknownLabel}
            </Typography>
          </Box>

          <Box sx={surfaceSx(760)}>
            <Typography variant="subtitle2" color="text.secondary" sx={subtitleSx}>
              {t('movie_details_spoken_languages')}
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={languageRowSx}>
              {(movie.spoken_languages?.length ? movie.spoken_languages : []).map(language => (
                <Chip
                  key={language.iso_639_1}
                  size="small"
                  label={language.name || language.english_name}
                />
              ))}
            </Stack>

            <Divider sx={dividerSx} />

            <Typography variant="subtitle2" color="text.secondary" sx={subtitleSx}>
              {t('movie_details_countries')}
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              {(movie.production_countries?.length ? movie.production_countries : []).map(
                country => (
                  <Chip key={country.iso_3166_1} size="small" label={country.name} />
                ),
              )}
            </Stack>
          </Box>
        </Box>

        {movie.production_companies?.length > 0 && (
          <Box sx={theme => ({ ...productionBoxSx, ...surfaceSx(820)(theme) })}>
            <Typography variant="h6" sx={sectionTitleSx}>
              {t('movie_details_production')}
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              {movie.production_companies.map(company => (
                <Chip key={company.id} size="small" label={company.name} />
              ))}
            </Stack>
          </Box>
        )}
      </Container>
    </Box>
  )
}
