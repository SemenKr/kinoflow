import { Layout } from '@/components/layout/Layout'

import { MainPage } from '@/pages/MainPage/MainPage'
import { CategoryMoviesPage } from '@/pages/CategoryMoviesPage/CategoryMoviesPage'
import { FilteredMoviesPage } from '@/pages/FilteredMoviesPage/FilteredMoviesPage'
import { SearchPage } from '@/pages/SearchPage/SearchPage'
import { FavoritesPage } from '@/pages/FavoritesPage/FavoritesPage'
import { MovieDetailsPage } from '@/pages/MovieDetailsPage/MovieDetailsPage'
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage'
import { ROUTES } from '@/shared/constants'
import { Navigate, createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: ROUTES.home, element: <MainPage /> },
      {
        path: ROUTES.categories,
        element: <Navigate to={ROUTES.movieCategory('popular')} replace />,
      },
      { path: ROUTES.movieCategory(':category'), element: <CategoryMoviesPage /> },
      { path: ROUTES.filtered, element: <FilteredMoviesPage /> },
      { path: ROUTES.search, element: <SearchPage /> },
      { path: ROUTES.favorites, element: <FavoritesPage /> },
      { path: ROUTES.movieDetails(':id'), element: <MovieDetailsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
