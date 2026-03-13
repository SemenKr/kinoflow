import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: headers => {
    headers.set('Authorization', `Bearer ${import.meta.env.VITE_API_TOKEN}`)

    headers.set('Content-Type', 'application/json')

    return headers
  },
})
