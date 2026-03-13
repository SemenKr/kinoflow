import i18n from '@/app/providers/i18n'
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: headers => {
    headers.set('Authorization', `Bearer ${import.meta.env.VITE_API_TOKEN}`)

    headers.set('Content-Type', 'application/json')

    return headers
  },
  paramsSerializer: params => {
    const language = i18n.language === 'ru' ? 'ru-RU' : 'en-US'

    return new URLSearchParams({
      ...params,
      language,
    }).toString()
  },
})
