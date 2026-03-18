export interface Genre {
  id: number
  name: string
}

export interface ProductionCompany {
  id: number
  name: string
}

export interface ProductionCountry {
  iso_3166_1: string
  name: string
}

export interface SpokenLanguage {
  iso_639_1: string
  english_name: string
  name: string
}

export interface BelongsToCollection {
  id: number
  name: string
}

export interface MovieDetails {
  id: number
  title: string
  original_title: string
  overview: string
  backdrop_path: string | null
  poster_path: string | null
  release_date: string
  runtime: number
  vote_average: number
  vote_count: number
  genres: Genre[]
  homepage: string | null
  imdb_id: string | null
  tagline: string | null
  status: string
  budget: number
  revenue: number
  original_language: string
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  spoken_languages: SpokenLanguage[]
  popularity: number
  adult: boolean
  belongs_to_collection: BelongsToCollection | null
}

export const POSTER_FALLBACK_URL = 'https://placehold.co/500x750?text=No+Poster'

export const formatRuntime = (minutes: number | null | undefined, fallback: string) => {
  if (!minutes || minutes <= 0) return fallback
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins}m`
}

export const formatMoney = (value: number | null | undefined, locale: string, fallback: string) => {
  if (!value || value <= 0) return fallback
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

export const formatOneDecimal = (value: number, locale: string) =>
  new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value)

export const getRatingPercent = (voteAverage: number) =>
  Math.max(0, Math.min(100, Math.round((voteAverage || 0) * 10)))

export const getRatingColor = (ratingPercent: number) => {
  if (ratingPercent >= 70) return '#21d07a'
  if (ratingPercent >= 50) return '#d2d531'
  return '#db2360'
}
