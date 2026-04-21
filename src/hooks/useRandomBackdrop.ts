import { useMemo } from 'react'
import { useGetPopularMoviesQuery } from '@/features/movies/api/moviesApi'
import { useApiLanguage } from '@/hooks/useApiLanguage'

export const useRandomBackdrop = () => {
  const apiLanguage = useApiLanguage()
  const { data } = useGetPopularMoviesQuery({ page: 1, language: apiLanguage })

  return useMemo(() => {
    if (!data?.results.length) return ''

    const moviesWithBackdrop = data.results.filter(movie => Boolean(movie.backdrop_path))
    if (!moviesWithBackdrop.length) return ''

    // eslint-disable-next-line react-hooks/purity
    const index = Math.floor(Math.random() * moviesWithBackdrop.length)
    const path = moviesWithBackdrop[index]?.backdrop_path

    return path ?? ''
  }, [data])
}
