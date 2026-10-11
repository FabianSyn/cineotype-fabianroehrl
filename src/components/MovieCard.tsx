import type { Movie } from "../types/movie"
import { posterUrl } from "../utils/posterUrl"

type MovieCardProps = {
  movie: Movie
  onSelect: (id: number) => void
}

export default function MovieCard({
  movie,
  onSelect,
}: MovieCardProps) {
  const year = movie.release_date
    ? movie.release_date.slice(0, 4)
    : "Unbekannt"

  const rating = movie.vote_average.toFixed(1)

  return (
    <button
      type="button"
      onClick={() => onSelect(movie.id)}
      className="manga-panel group w-full overflow-hidden text-left"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-[#e7dcc7]">
        <img
          src={posterUrl(movie.poster_path)}
          alt={`Filmplakat: ${movie.title}`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />

        <div className="absolute top-2 right-2 border-2 border-black bg-[#f6d365] px-2 py-1 text-xs font-black">
          ★ {rating}
        </div>
      </div>

      <div className="border-t-3 border-black bg-white p-3">
        <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#c5443e]">
          Movie File
        </p>

        <h3 className="mt-1 line-clamp-2 min-h-11 text-sm font-black text-[#222222] sm:text-base">
          {movie.title}
        </h3>

        <div className="mt-3 flex items-center justify-between gap-2 border-t-2 border-dashed border-zinc-300 pt-2">
          <span className="text-xs font-bold text-zinc-600">
            {year}
          </span>

          <span className="text-xs font-black text-[#c5443e]">
            OPEN →
          </span>
        </div>
      </div>
    </button>
  )
}