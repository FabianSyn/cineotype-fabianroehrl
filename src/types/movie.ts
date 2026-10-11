export type Movie = {
  id: number
  title: string
  poster_path: string | null
  overview: string
  release_date: string
  vote_average: number
}

export type SearchResponse = {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export type Genre = {
  id: number
  name: string
}

export type MovieDetails = Movie & {
  genres: Genre[]
  runtime: number | null
  tagline?: string
}