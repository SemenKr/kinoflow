import { Layout } from '@/components/layout/Layout'

import { MainPage } from '@/pages/MainPage/MainPage'
import { CategoryMoviesPage } from '@/pages/CategoryMoviesPage/CategoryMoviesPage'
import { FilteredMoviesPage } from '@/pages/FilteredMoviesPage/FilteredMoviesPage'
import { SearchPage } from '@/pages/SearchPage/SearchPage'
import { FavoritesPage } from '@/pages/FavoritesPage/FavoritesPage'
import { createBrowserRouter } from 'react-router'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <MainPage /> },
      { path: '/categories', element: <CategoryMoviesPage /> },
      { path: '/filtered', element: <FilteredMoviesPage /> },
      { path: '/search', element: <SearchPage /> },
      { path: '/favorites', element: <FavoritesPage /> },
    ],
  },
])
