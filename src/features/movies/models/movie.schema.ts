import { z } from 'zod'

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  original_title: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  release_date: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
  popularity: z.number(),
  genre_ids: z.array(z.number()),
  adult: z.boolean(),
  original_language: z.string(),
})
export const MoviesResponseSchema = z.object({
  page: z.number(),
  results: z.array(MovieSchema),
  total_pages: z.number(),
  total_results: z.number(),
})

const GenreSchema = z.object({
  id: z.number(),
  name: z.string(),
})

const ProductionCompanySchema = z.object({
  id: z.number(),
  name: z.string(),
})

const ProductionCountrySchema = z.object({
  iso_3166_1: z.string(),
  name: z.string(),
})

const SpokenLanguageSchema = z.object({
  iso_639_1: z.string(),
  english_name: z.string(),
  name: z.string(),
})

const BelongsToCollectionSchema = z.object({
  id: z.number(),
  name: z.string(),
})

const MovieCastMemberSchema = z.object({
  id: z.number(),
  name: z.string(),
  character: z.string(),
  profile_path: z.string().nullable(),
})

const MovieCreditsSchema = z.object({
  cast: z.array(MovieCastMemberSchema),
})

export const MovieDetailsSchema = z.object({
  id: z.number(),
  title: z.string(),
  original_title: z.string(),
  overview: z.string(),
  backdrop_path: z.string().nullable(),
  poster_path: z.string().nullable(),
  release_date: z.string(),
  runtime: z.number(),
  vote_average: z.number(),
  vote_count: z.number(),
  genres: z.array(GenreSchema),
  homepage: z.string().nullable(),
  imdb_id: z.string().nullable(),
  tagline: z.string().nullable(),
  status: z.string(),
  budget: z.number(),
  revenue: z.number(),
  original_language: z.string(),
  production_companies: z.array(ProductionCompanySchema),
  production_countries: z.array(ProductionCountrySchema),
  spoken_languages: z.array(SpokenLanguageSchema),
  popularity: z.number(),
  adult: z.boolean(),
  belongs_to_collection: BelongsToCollectionSchema.nullable(),
  credits: MovieCreditsSchema.optional(),
})
