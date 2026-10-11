import { useEffect, useState } from "react"
import { getMovie } from "../services/tmdb"
import type { MovieDetails } from "../types/movie"

export function useMovie(id: number) {
  const [movie, setMovie] =
    useState<MovieDetails | null>(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] =
    useState<string | null>(null)

  useEffect(() => {
    let ignore = false

    async function load() {
      setMovie(null)
      setLoading(true)
      setError(null)

      try {
        const result = await getMovie(id)

        if (!ignore) {
          setMovie(result)
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
  }, [id])

  return {
    movie,
    loading,
    error,
  }
}