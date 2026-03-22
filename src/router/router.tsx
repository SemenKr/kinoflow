import { Layout } from '@/components/layout/Layout'
import { ROUTES } from '@/shared/constants'
import { PageLoader } from '@/shared/ui/loading/PageLoader'
import { type ComponentType, Suspense, lazy } from 'react'
import { Navigate, createBrowserRouter } from 'react-router-dom'

const MainPage = lazy(async () => ({
  default: (await import('@/pages/MainPage/MainPage')).MainPage,
}))

const CategoryMoviesPage = lazy(async () => ({
  default: (await import('@/pages/CategoryMoviesPage/CategoryMoviesPage')).CategoryMoviesPage,
}))

const FilteredMoviesPage = lazy(async () => ({
  default: (await import('@/pages/FilteredMoviesPage/FilteredMoviesPage')).FilteredMoviesPage,
}))

const SearchPage = lazy(async () => ({
  default: (await import('@/pages/SearchPage/SearchPage')).SearchPage,
}))

const FavoritesPage = lazy(async () => ({
  default: (await import('@/pages/FavoritesPage/FavoritesPage')).FavoritesPage,
}))

const MovieDetailsPage = lazy(async () => ({
  default: (await import('@/pages/MovieDetailsPage/MovieDetailsPage')).MovieDetailsPage,
}))

const NotFoundPage = lazy(async () => ({
  default: (await import('@/pages/NotFoundPage/NotFoundPage')).NotFoundPage,
}))

const renderLazyPage = (Component: ComponentType) => (
  <Suspense fallback={<PageLoader lines={4} />}>
    <Component />
  </Suspense>
)

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: ROUTES.home, element: renderLazyPage(MainPage) },
      {
        path: ROUTES.categories,
        element: <Navigate to={ROUTES.movieCategory('popular')} replace />,
      },
      { path: ROUTES.movieCategory(':category'), element: renderLazyPage(CategoryMoviesPage) },
      { path: ROUTES.filtered, element: renderLazyPage(FilteredMoviesPage) },
      { path: ROUTES.search, element: renderLazyPage(SearchPage) },
      { path: ROUTES.favorites, element: renderLazyPage(FavoritesPage) },
      { path: ROUTES.movieDetails(':id'), element: renderLazyPage(MovieDetailsPage) },
      { path: '*', element: renderLazyPage(NotFoundPage) },
    ],
  },
])
