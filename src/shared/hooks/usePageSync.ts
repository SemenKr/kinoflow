import { useEffect } from 'react'

interface UsePageSyncOptions {
  page: number
  totalPages: number
  enabled?: boolean
  onCorrectPage: (nextPage: number) => void
}

export const usePageSync = ({
  page,
  totalPages,
  enabled = true,
  onCorrectPage,
}: UsePageSyncOptions) => {
  const safePage = Math.max(1, Math.min(page, Math.max(1, totalPages)))

  useEffect(() => {
    if (!enabled) return
    if (page === safePage) return

    onCorrectPage(safePage)
  }, [enabled, onCorrectPage, page, safePage])

  return safePage
}
