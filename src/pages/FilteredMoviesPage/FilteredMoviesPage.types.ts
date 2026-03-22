export interface FilterSidebarLabels {
  title: string
  hide: string
  sortBy: string
  rating: string
  ratingRange: string
  genres: string
  reset: string
}

export interface GenreOption {
  id: number
  name: string
}

export interface SortOption {
  value: string
  label: string
}

export interface FilterStateShape {
  sortBy: string
  rating: {
    min: number
    max: number
  }
  genres: number[]
}
