import { useMovie } from "../hooks/useMovie"
import { posterUrl } from "../utils/posterUrl"

type MovieDetailsProps = {
  id: number
  onBack: () => void
}

export default function MovieDetails({
  id,
  onBack,
}: MovieDetailsProps) {
  const {
    movie,
    loading,
    error,
  } = useMovie(id)

  return (
    <section>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="manga-button px-5 py-3 text-sm"
        >
          ← Zurück zum Archiv
        </button>

        <span className="border-2 border-black bg-[#f6d365] px-4 py-2 text-xs font-black uppercase">
          Special Chapter
        </span>
      </div>

      {loading && (
        <div className="comic-border manga-dots bg-[#f6e6c1] p-12 text-center">
          <p className="manga-title animate-pulse text-3xl">
            Loading ...
          </p>

          <p className="mt-3 font-bold">
            Das Filmkapitel wird geladen.
          </p>
        </div>
      )}

      {error && (
        <div className="comic-border bg-[#f6b3aa] p-6">
          <p className="font-black">
            Fehler beim Laden: {error}
          </p>
        </div>
      )}

      {!loading && !error && !movie && (
        <p className="font-bold">
          Keine Filmdetails gefunden.
        </p>
      )}

      {movie && (
        <article className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <div>
            <div className="manga-panel overflow-hidden">
              <img
                src={posterUrl(movie.poster_path)}
                alt={`Filmplakat: ${movie.title}`}
                className="w-full object-cover"
              />
            </div>

            <div className="comic-border mt-6 bg-[#f6d365] p-4 text-center">
              <p className="text-xs font-black uppercase tracking-widest">
                Movie Rating
              </p>

              <p className="manga-title mt-2 text-4xl">
                ★ {movie.vote_average.toFixed(1)}
              </p>

              <p className="text-xs font-bold">
                von 10 Punkten
              </p>
            </div>
          </div>

          <div>
            <div className="comic-border manga-dots bg-[#f6e6c1] p-5">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#c5443e]">
                Character File / Movie File
              </p>

              <h2 className="manga-title mt-3 break-words text-4xl md:text-5xl">
                {movie.title}
              </h2>
            </div>

            {movie.tagline && (
              <div className="speech-bubble mt-7 inline-block px-5 py-4">
                <p className="text-lg font-bold italic">
                  „{movie.tagline}“
                </p>
              </div>
            )}

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="comic-border bg-white p-4">
                <p className="text-xs font-black uppercase text-[#c5443e]">
                  Erscheinungsdatum
                </p>

                <p className="mt-2 font-black">
                  {movie.release_date || "Unbekannt"}
                </p>
              </div>

              <div className="comic-border bg-white p-4">
                <p className="text-xs font-black uppercase text-[#c5443e]">
                  Laufzeit
                </p>

                <p className="mt-2 font-black">
                  {movie.runtime !== null
                    ? `${movie.runtime} Minuten`
                    : "Unbekannt"}
                </p>
              </div>
            </div>

            <div className="mt-7">
              <h3 className="manga-title text-2xl">
                Genres!
              </h3>

              <ul className="mt-3 flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <li
                    key={genre.id}
                    className="border-2 border-black bg-[#f6d365] px-4 py-2 text-sm font-black"
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="comic-border mt-7 bg-white p-6">
              <h3 className="manga-title text-2xl">
                Die Story!
              </h3>

              <p className="mt-4 leading-8 text-zinc-700">
                {movie.overview ||
                  "Für diesen Film ist keine Beschreibung vorhanden."}
              </p>
            </div>
          </div>
        </article>
      )}
    </section>
  )
}