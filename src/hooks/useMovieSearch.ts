import { useEffect, useState } from "react"
import { searchMovies } from "../services/tmdb"
import type { Movie } from "../types/movie"

export function useMovieSearch(query: string) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let ignore = false

    if (query.trim() === "") {
      setMovies([])
      setLoading(false)
      setError(null)
      return
    }

    async function load() {
      setLoading(true)
      setError(null)
      setMovies([])

      try {
        const results = await searchMovies(query)

        if (!ignore) {
          setMovies(results)
        }
      } catch (err: unknown) {
        if (!ignore) {
          setError(
            err instanceof Error
              ? err.message
              : "Unbekannter Fehler"
          )
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      ignore = true
    }
  }, [query])

  return {
    movies,
    loading,
    error,
  }
}