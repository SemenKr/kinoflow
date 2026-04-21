import { PageLoader } from '@/shared/ui/loading/PageLoader'
import { MainPage } from '@/pages/MainPage/MainPage'
import { MovieDetailsPage } from '@/pages/MovieDetailsPage/MovieDetailsPage'
import { Suspense, lazy } from 'react'

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

const PersonDetailsPage = lazy(async () => ({
  default: (await import('@/pages/PersonDetailsPage/PersonDetailsPage')).PersonDetailsPage,
}))

const NotFoundPage = lazy(async () => ({
  default: (await import('@/pages/NotFoundPage/NotFoundPage')).NotFoundPage,
}))

const RouteFallback = () => <PageLoader lines={4} />

const withRouteSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<RouteFallback />}>
    <Component />
  </Suspense>
)

export const MainPageRoute = () => withRouteSuspense(MainPage)

export const CategoryMoviesPageRoute = () => withRouteSuspense(CategoryMoviesPage)

export const FilteredMoviesPageRoute = () => withRouteSuspense(FilteredMoviesPage)

export const SearchPageRoute = () => withRouteSuspense(SearchPage)

export const FavoritesPageRoute = () => withRouteSuspense(FavoritesPage)

export const MovieDetailsPageRoute = () => withRouteSuspense(MovieDetailsPage)

export const PersonDetailsPageRoute = () => withRouteSuspense(PersonDetailsPage)

export const NotFoundPageRoute = () => withRouteSuspense(NotFoundPage)
