export interface DiscoverMoviesParams {
  page?: number
  language?: string
  sort_by?: string

  'vote_average.gte'?: number
  'vote_average.lte'?: number

  with_genres?: string
}
