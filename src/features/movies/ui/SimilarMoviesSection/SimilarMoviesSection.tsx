import { useLazyGetSimilarMoviesQuery } from '@/features/movies/api/moviesApi'
import type { Movie } from '@/features/movies/api/moviesApi.types'
import { MovieCard } from '@/features/movies/ui/MovieGrid/MovieCard/MovieCard'
import { Box, CircularProgress, Typography } from '@mui/material'
import { type UIEvent, useCallback, useEffect, useRef, useState } from 'react'
import {
  footerSx,
  headerSx,
  loadingSx,
  moviesRowSx,
  sectionSx,
} from './SimilarMoviesSection.styles'

interface Props {
  title: string
  movieId: number
}

const LOAD_MORE_STEP = 6

const appendUniqueMovies = (current: Movie[], next: Movie[]) => {
  const seen = new Set(current.map(movie => movie.id))
  const uniqueNext = next.filter(movie => !seen.has(movie.id))
  return [...current, ...uniqueNext]
}

export const SimilarMoviesSection = ({ title, movieId }: Props) => {
  const [trigger, { isFetching }] = useLazyGetSimilarMoviesQuery()
  const [movies, setMovies] = useState<Movie[]>([])
  const [visibleCount, setVisibleCount] = useState(LOAD_MORE_STEP)
  const pageRef = useRef(0)
  const totalPagesRef = useRef(1)
  const visibleMovies = movies.slice(0, visibleCount)

  const loadPage = useCallback(
    async (pageToLoad: number) => {
      const response = await trigger({ movieId, page: pageToLoad }).unwrap()
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
    },
    [movieId, trigger],
  )

  const handleLoadMore = useCallback(async () => {
    if (isFetching) return

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
    setVisibleCount(Math.min(targetVisibleCount, mergedLength))
  }, [isFetching, loadPage, movies.length, visibleCount])

  useEffect(() => {
    let isActive = true

    const initialize = async () => {
      const initialLength = await loadPage(1)
      if (isActive) {
        setVisibleCount(Math.min(LOAD_MORE_STEP, initialLength))
      }
    }

    void initialize()

    return () => {
      isActive = false
    }
  }, [loadPage])

  const handleRowScroll = (event: UIEvent<HTMLDivElement>) => {
    const { scrollLeft, clientWidth, scrollWidth } = event.currentTarget
    const isNearEnd = scrollLeft + clientWidth >= scrollWidth - 120

    if (isNearEnd) {
      void handleLoadMore()
    }
  }

  if (!visibleMovies.length && !isFetching) return null

  return (
    <Box sx={sectionSx}>
      <Typography variant="h6" sx={headerSx}>
        {title}
      </Typography>

      <Box sx={moviesRowSx} role="list" onScroll={handleRowScroll}>
        {visibleMovies.map(movie => (
          <Box
            key={movie.id}
            role="listitem"
            sx={{ width: { xs: 180, sm: 200, md: 220 }, flex: '0 0 auto' }}
          >
            <MovieCard movie={movie} />
          </Box>
        ))}
      </Box>

      <Box sx={footerSx}>
        {isFetching && (
          <Box sx={loadingSx}>
            <CircularProgress size={22} />
          </Box>
        )}
      </Box>
    </Box>
  )
}
