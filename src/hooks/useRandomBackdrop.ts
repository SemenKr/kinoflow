import { useMemo } from 'react'
import { useGetPopularMoviesQuery } from '@/features/movies/api/moviesApi'
import { IMAGE_BASE } from '@/shared/constants'

export const useRandomBackdrop = () => {
  const { data } = useGetPopularMoviesQuery({ page: 1 })

  return useMemo(() => {
    if (!data?.results.length) return ''

    // eslint-disable-next-line react-hooks/purity
    const index = Math.floor(Math.random() * data.results.length)
    const path = data.results[index]?.backdrop_path

    return path ? `${IMAGE_BASE}/original${path}` : ''
  }, [data])
}
