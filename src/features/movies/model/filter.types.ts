export interface FiltersState {
  sortBy: string

  rating: {
    min: number
    max: number
  }

  genres: number[]

  page: number
}
