import { useAppDispatch } from '@/hooks/redux'
import { startGlobalLoading, stopGlobalLoading } from '@/shared/ui/loading/ui.slice'
import { useCallback } from 'react'

export const useGlobalLoading = () => {
  const dispatch = useAppDispatch()

  const start = useCallback(() => {
    dispatch(startGlobalLoading())
  }, [dispatch])

  const stop = useCallback(() => {
    dispatch(stopGlobalLoading())
  }, [dispatch])

  const track = useCallback(
    async <T>(promise: Promise<T>) => {
      dispatch(startGlobalLoading())

      try {
        return await promise
      } finally {
        dispatch(stopGlobalLoading())
      }
    },
    [dispatch],
  )

  return { start, stop, track }
}
