import { Layout } from '@/components/layout/Layout'
import {
  CategoryMoviesPageRoute,
  FavoritesPageRoute,
  FilteredMoviesPageRoute,
  MainPageRoute,
  MovieDetailsPageRoute,
  NotFoundPageRoute,
  SearchPageRoute,
} from '@/router/router.elements'
import { ROUTES } from '@/shared/constants'
import { Navigate, createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: ROUTES.home, element: <MainPageRoute /> },
      {
        path: ROUTES.categories,
        element: <Navigate to={ROUTES.movieCategory('popular')} replace />,
      },
      { path: ROUTES.movieCategory(':category'), element: <CategoryMoviesPageRoute /> },
      { path: ROUTES.filtered, element: <FilteredMoviesPageRoute /> },
      { path: ROUTES.search, element: <SearchPageRoute /> },
      { path: ROUTES.favorites, element: <FavoritesPageRoute /> },
      { path: ROUTES.movieDetails(':id'), element: <MovieDetailsPageRoute /> },
      { path: '*', element: <NotFoundPageRoute /> },
    ],
  },
])
