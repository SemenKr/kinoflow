import { useLazyGetSimilarMoviesQuery } from '@/features/movies/api/moviesApi'
import type { Movie } from '@/features/movies/api/moviesApi.types'
import { MovieCard } from '@/features/movies/ui/MovieGrid/MovieCard/MovieCard'
import { MovieCardSkeleton } from '@/features/movies/ui/MovieGrid/MovieCardSkeleton'
import { useGlobalLoading } from '@/hooks'
import { SectionLoader } from '@/shared/ui/loading/SectionLoader'
import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { type UIEvent, useCallback, useEffect, useRef, useState } from 'react'
import {
  errorTextSx,
  footerSx,
  headerSx,
  moviesRowSx,
  sectionSx,
} from './SimilarMoviesSection.styles'

interface Props {
  title: string
  movieId: number
  language: string
}

const LOAD_MORE_STEP = 6

const appendUniqueMovies = (current: Movie[], next: Movie[]) => {
  const seen = new Set(current.map(movie => movie.id))
  const uniqueNext = next.filter(movie => !seen.has(movie.id))
  return [...current, ...uniqueNext]
}

const renderLoadingSkeletonItems = (count: number) =>
  Array.from({ length: count }).map((_, index) => (
    <MovieCardSkeleton
      key={`similar-skeleton-${index}`}
      sx={{ width: { xs: 180, sm: 200, md: 220 }, flex: '0 0 auto' }}
    />
  ))

export const SimilarMoviesSection = ({ title, movieId, language }: Props) => {
  const { t } = useTranslation()
  const { track } = useGlobalLoading()
  const [trigger, { isFetching }] = useLazyGetSimilarMoviesQuery()
  const [movies, setMovies] = useState<Movie[]>([])
  const [visibleCount, setVisibleCount] = useState(LOAD_MORE_STEP)
  const [hasError, setHasError] = useState(false)
  const pageRef = useRef(0)
  const totalPagesRef = useRef(1)
  const rowRef = useRef<HTMLDivElement | null>(null)
  const requestInFlightRef = useRef(false)
  const requestIdRef = useRef(0)
  const visibleMovies = movies.slice(0, visibleCount)

  const loadPage = useCallback(
    async (pageToLoad: number) => {
      if (requestInFlightRef.current) return null

      requestInFlightRef.current = true
      const requestId = ++requestIdRef.current
      setHasError(false)

      try {
        const response = await track(trigger({ movieId, page: pageToLoad, language }).unwrap())
        if (requestId !== requestIdRef.current) return null

        let mergedLength = response.results.length

        setMovies(prev => {
          const nextMovies =
            pageToLoad === 1 ? response.results : appendUniqueMovies(prev, response.results)
          mergedLength = nextMovies.length
          return nextMovies
        })

        pageRef.current = pageToLoad
        totalPagesRef.current = response.total_pages

        return mergedLength
      } catch {
        if (requestId === requestIdRef.current) {
          setHasError(true)
        }
        return null
      } finally {
        if (requestId === requestIdRef.current) {
          requestInFlightRef.current = false
        }
      }
    },
    [language, movieId, track, trigger],
  )

  const handleLoadMore = useCallback(async () => {
    if (requestInFlightRef.current) return

    const targetVisibleCount = visibleCount + LOAD_MORE_STEP

    if (targetVisibleCount <= movies.length) {
      setVisibleCount(targetVisibleCount)
      return
    }

    if (pageRef.current >= totalPagesRef.current) {
      setVisibleCount(Math.min(targetVisibleCount, movies.length))
      return
    }

    const mergedLength = await loadPage(pageRef.current + 1)
    if (mergedLength === null) return

    setVisibleCount(Math.min(targetVisibleCount, mergedLength))
  }, [loadPage, movies.length, visibleCount])

  useEffect(() => {
    let isActive = true

    const initialize = async () => {
      setMovies([])
      setVisibleCount(LOAD_MORE_STEP)
      setHasError(false)
      pageRef.current = 0
      totalPagesRef.current = 1
      requestInFlightRef.current = false
      requestIdRef.current += 1

      const initialLength = await loadPage(1)
      if (isActive && initialLength !== null) {
        setVisibleCount(Math.min(LOAD_MORE_STEP, initialLength))
      }
    }

    void initialize()

    return () => {
      isActive = false
    }
  }, [loadPage])

  useEffect(() => {
    const row = rowRef.current
    if (!row || !movies.length || requestInFlightRef.current) return

    const isScrollable = row.scrollWidth > row.clientWidth + 1
    const hasHiddenLoadedMovies = visibleCount < movies.length
    const hasMorePages = pageRef.current < totalPagesRef.current

    if (!isScrollable && (hasHiddenLoadedMovies || hasMorePages)) {
      void handleLoadMore()
    }
  }, [handleLoadMore, movies.length, visibleCount])

  const handleRowScroll = (event: UIEvent<HTMLDivElement>) => {
    const { scrollLeft, clientWidth, scrollWidth } = event.currentTarget
    const isNearEnd = scrollLeft + clientWidth >= scrollWidth - 120

    if (isNearEnd) {
      void handleLoadMore()
    }
  }

  if (!visibleMovies.length && isFetching && !hasError) {
    return (
      <Box sx={sectionSx}>
        <SectionLoader cards={4} titleWidth="24%" />
      </Box>
    )
  }

  if (!visibleMovies.length && !isFetching && !hasError) return null

  return (
    <Box sx={sectionSx}>
      <Typography variant="h6" sx={headerSx}>
        {title}
      </Typography>

      <Box ref={rowRef} sx={moviesRowSx} role="list" onScroll={handleRowScroll}>
        {visibleMovies.map(movie => (
          <Box
            key={movie.id}
            role="listitem"
            sx={{ width: { xs: 180, sm: 200, md: 220 }, flex: '0 0 auto' }}
          >
            <MovieCard movie={movie} />
          </Box>
        ))}
        {isFetching && renderLoadingSkeletonItems(3)}
      </Box>

      <Box sx={footerSx}>
        {hasError && (
          <>
            <Typography variant="body2" color="text.secondary" sx={errorTextSx}>
              {t('movie_details_similar_error')}
            </Typography>
            <Button size="small" variant="text" onClick={() => void handleLoadMore()}>
              {t('movie_details_retry')}
            </Button>
          </>
        )}
      </Box>
    </Box>
  )
}
