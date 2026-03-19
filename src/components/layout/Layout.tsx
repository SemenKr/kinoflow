import { Header } from '@/components/layout/Header'
import { GlobalLoadingBar } from '@/shared/ui/loading/GlobalLoadingBar'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <>
      <Header />
      <GlobalLoadingBar />

      <main>
        <Outlet />
      </main>
    </>
  )
}
