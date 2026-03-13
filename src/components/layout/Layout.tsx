import { Header } from '@/components/layout/Header'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <>
      <Header />

      <main style={{ padding: '24px' }}>
        <Outlet />
      </main>
    </>
  )
}
