import { Layout } from '@/components/layout/Layout'

import { MainPage } from '@/pages/MainPage/MainPage'
import { CategoryMoviesPage } from '@/pages/CategoryMoviesPage/CategoryMoviesPage'
import { FilteredMoviesPage } from '@/pages/FilteredMoviesPage/FilteredMoviesPage'
import { SearchPage } from '@/pages/SearchPage/SearchPage'
import { FavoritesPage } from '@/pages/FavoritesPage/FavoritesPage'
import { ROUTES } from '@/shared/constats'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: ROUTES.home, element: <MainPage /> },
      { path: ROUTES.categories, element: <CategoryMoviesPage /> },
      { path: ROUTES.filtered, element: <FilteredMoviesPage /> },
      { path: ROUTES.search, element: <SearchPage /> },
      { path: ROUTES.favorites, element: <FavoritesPage /> },
    ],
  },
])
