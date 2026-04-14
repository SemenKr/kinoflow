import { useCallback, useState } from 'react'

interface UseProgressiveRevealParams {
  total: number
  initial: number
  step: number
  resetKey: number
}

export const useProgressiveReveal = ({
  total,
  initial,
  step,
  resetKey,
}: UseProgressiveRevealParams) => {
  const [state, setState] = useState({ key: resetKey, count: initial })

  const visibleCount = state.key === resetKey ? state.count : initial
  const canExpand = total > visibleCount
  const canCollapse = visibleCount > initial

  const showMore = useCallback(() => {
    setState(prev => {
      const baseCount = prev.key === resetKey ? prev.count : initial
      return {
        key: resetKey,
        count: Math.min(baseCount + step, total),
      }
    })
  }, [initial, resetKey, step, total])

  const hide = useCallback(() => {
    setState({ key: resetKey, count: initial })
  }, [initial, resetKey])

  return { visibleCount, canExpand, canCollapse, showMore, hide }
}
