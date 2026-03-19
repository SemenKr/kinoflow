import { Box, LinearProgress } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { useNavigation } from 'react-router-dom'
import { useAppSelector } from '@/hooks'

export const GlobalLoadingBar = () => {
  const navigation = useNavigation()
  const globalPendingCount = useAppSelector(state => state.ui.globalPendingCount)
  const isVisible = globalPendingCount > 0 || navigation.state === 'loading'

  return (
    <Box
      aria-hidden={!isVisible}
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1201,
        height: 3,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scaleY(1)' : 'scaleY(0.3)',
        transformOrigin: 'top',
        transition: 'opacity 180ms ease, transform 180ms ease',
      }}
    >
      <LinearProgress
        sx={theme => ({
          height: '100%',
          backgroundColor: alpha(theme.palette.primary.main, 0.12),
          '& .MuiLinearProgress-bar': {
            borderRadius: 999,
          },
        })}
      />
    </Box>
  )
}
