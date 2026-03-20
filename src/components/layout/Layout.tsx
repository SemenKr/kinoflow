import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { GlobalLoadingBar } from '@/shared/ui/loading/GlobalLoadingBar'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <Box sx={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <ScrollToTop />
      <Header />
      <GlobalLoadingBar />

      <Box component="main" sx={{ flex: 1 }}>
        <Outlet />
      </Box>

      <Footer />
    </Box>
  )
}
