export interface DiscoverMoviesParams {
  page?: number
  sort_by?: string

  'vote_average.gte'?: number
  'vote_average.lte'?: number

  with_genres?: string
}
