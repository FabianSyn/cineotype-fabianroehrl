import type { Movie } from "../types/movie"
import MovieCard from "./MovieCard"

type MovieListProps = {
  movies: Movie[]
  onSelect: (id: number) => void
}

export default function MovieList({
  movies,
  onSelect,
}: MovieListProps) {
  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}