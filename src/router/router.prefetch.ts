const routeImporters = {
  home: () => import('@/pages/MainPage/MainPage'),
  categories: () => import('@/pages/CategoryMoviesPage/CategoryMoviesPage'),
  filtered: () => import('@/pages/FilteredMoviesPage/FilteredMoviesPage'),
  search: () => import('@/pages/SearchPage/SearchPage'),
  favorites: () => import('@/pages/FavoritesPage/FavoritesPage'),
  movieDetails: () => import('@/pages/MovieDetailsPage/MovieDetailsPage'),
  notFound: () => import('@/pages/NotFoundPage/NotFoundPage'),
} as const

type RoutePrefetchKey = keyof typeof routeImporters

const prefetchedRoutes = new Set<RoutePrefetchKey>()

export const prefetchRoute = (key: RoutePrefetchKey) => {
  if (prefetchedRoutes.has(key)) return

  prefetchedRoutes.add(key)
  void routeImporters[key]()
}
