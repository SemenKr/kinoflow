import type { PaginationParams } from '@/types'

export const buildMoviesListQuery = (
  endpoint: string,
  { page = 1, language = 'en-US', region }: PaginationParams = {},
) => ({
  url: endpoint,
  params: { page, language, region },
})
