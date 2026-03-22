import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded'
import { Fab, Zoom } from '@mui/material'
import { useEffect, useState } from 'react'

import { backToTopFabSx } from '../FilteredMoviesPage.styles'

interface BackToTopButtonProps {
  label: string
}

export const BackToTopButton = ({ label }: BackToTopButtonProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Zoom in={isVisible}>
      <Fab
        color="primary"
        size="medium"
        aria-label={label}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        sx={backToTopFabSx}
      >
        <KeyboardArrowUpRoundedIcon />
      </Fab>
    </Zoom>
  )
}
