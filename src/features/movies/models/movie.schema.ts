import { z } from 'zod'

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  original_title: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  release_date: z.string().optional().default(''),
  vote_average: z.number().default(0),
  vote_count: z.number().default(0),
  popularity: z.number().default(0),
  genre_ids: z.array(z.number()).optional().default([]),
  adult: z.boolean(),
  original_language: z.string(),
})

export const MoviesResponseSchema = z.object({
  page: z.number().default(1),
  results: z.array(MovieSchema).default([]),
  total_pages: z.number().default(1),
  total_results: z.number().default(0),
})

const GenreSchema = z.object({
  id: z.number(),
  name: z.string(),
})

export const GenresResponseSchema = z.object({
  genres: z.array(GenreSchema).default([]),
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
  runtime: z.number().nullable().default(null),
  vote_average: z.number(),
  vote_count: z.number(),
  genres: z.array(GenreSchema).default([]),
  homepage: z.string().nullable().default(null),
  imdb_id: z.string().nullable(),
  tagline: z.string().nullable(),
  status: z.string(),
  budget: z.number(),
  revenue: z.number(),
  original_language: z.string(),
  spoken_languages: z.array(SpokenLanguageSchema).default([]),
  production_countries: z.array(ProductionCountrySchema).default([]),
  production_companies: z.array(ProductionCompanySchema).default([]),
  popularity: z.number(),
  adult: z.boolean(),
  belongs_to_collection: BelongsToCollectionSchema.nullable(),
  credits: MovieCreditsSchema.optional().default({ cast: [] }),
})

export const PersonDetailsSchema = z.object({
  adult: z.boolean().default(false),
  also_known_as: z.array(z.string()).default([]),
  biography: z.string().default(''),
  birthday: z.string().nullable().default(null),
  deathday: z.string().nullable().default(null),
  gender: z.number().default(0),
  homepage: z.string().nullable().default(null),
  id: z.number(),
  imdb_id: z.string().nullable().default(null),
  known_for_department: z.string().default(''),
  name: z.string().default(''),
  place_of_birth: z.string().nullable().default(null),
  popularity: z.number().default(0),
  profile_path: z.string().nullable().default(null),
})
