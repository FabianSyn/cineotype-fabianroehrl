import type {
  Movie,
  SearchResponse,
  MovieDetails,
} from "../types/movie"

const PROXY_URL = import.meta.env.VITE_PROXY_URL

export async function searchMovies(
  query: string
): Promise<Movie[]> {
  const response = await fetch(
    `${PROXY_URL}/search?query=${encodeURIComponent(query)}`
  )

  if (!response.ok) {
    throw new Error(`Proxy-Fehler: ${response.status}`)
  }

  const data: SearchResponse = await response.json()
  return data.results
}

export async function getMovie(
  id: number
): Promise<MovieDetails> {
  const response = await fetch(`${PROXY_URL}/movie/${id}`)

  if (!response.ok) {
    throw new Error(`Proxy-Fehler: ${response.status}`)
  }

  const data: MovieDetails = await response.json()
  return data
}