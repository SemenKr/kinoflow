import { baseQuery } from '@/shared/api/baseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery,
  tagTypes: ['Movies', 'Movie', 'Genres'],
  endpoints: () => ({}),
})
