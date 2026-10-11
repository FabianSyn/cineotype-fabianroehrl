import { useEffect, useState } from "react"
import SearchBar from "./components/SearchBar"
import MovieList from "./components/MovieList"
import MovieDetails from "./components/MovieDetails"
import { useMovieSearch } from "./hooks/useMovieSearch"

const MOVIES_PER_PAGE = 8
const PAGE_ANIMATION_MS = 480

type PageDirection = "next" | "previous"

export default function App() {
  const [query, setQuery] = useState("")

  const [selectedMovieId, setSelectedMovieId] =
    useState<number | null>(null)

  const [page, setPage] = useState(1)

  const [pageDirection, setPageDirection] =
    useState<PageDirection>("next")

  const [animationKey, setAnimationKey] =
    useState(0)

  const [isTurning, setIsTurning] =
    useState(false)

  const {
    movies,
    loading,
    error,
  } = useMovieSearch(query)

  const totalPages = Math.max(
    1,
    Math.ceil(movies.length / MOVIES_PER_PAGE)
  )

  const startIndex =
    (page - 1) * MOVIES_PER_PAGE

  const visibleMovies = movies.slice(
    startIndex,
    startIndex + MOVIES_PER_PAGE
  )

  useEffect(() => {
    if (!isTurning) {
      return
    }

    const timeout = window.setTimeout(() => {
      setIsTurning(false)
    }, PAGE_ANIMATION_MS)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [animationKey, isTurning])

  function animatePage(direction: PageDirection) {
    setPageDirection(direction)
    setAnimationKey((current) => current + 1)
    setIsTurning(true)
  }

  function handleSearch(newQuery: string) {
    setSelectedMovieId(null)
    setPage(1)
    setQuery(newQuery)

    animatePage("next")
  }

  function handleNextPage() {
    if (page >= totalPages || isTurning) {
      return
    }

    setPage((current) => current + 1)
    animatePage("next")
  }

  function handlePreviousPage() {
    if (page <= 1 || isTurning) {
      return
    }

    setPage((current) => current - 1)
    animatePage("previous")
  }

  function handleSelectMovie(id: number) {
    setSelectedMovieId(id)
    animatePage("next")
  }

  function handleBack() {
    setSelectedMovieId(null)
    animatePage("previous")
  }

  return (
    <div className="min-h-screen px-4 py-8 text-[#222222] md:px-8 md:py-12">
      <header className="mx-auto mb-10 flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => {
            setSelectedMovieId(null)
            setPage(1)
            animatePage("previous")
          }}
          className="manga-title text-3xl md:text-4xl"
        >
          CINEO
          <span className="text-[#d94943]">
            TYPE!
          </span>
        </button>

        <div className="rotate-2 border-3 border-black bg-[#f6d365] px-5 py-2 font-black shadow-[4px_4px_0_#222222]">
          MANGA MOVIE ARCHIVE
        </div>
      </header>

      <div className="mx-auto max-w-6xl">
        <div
          key={animationKey}
          className={`manga-paper min-h-[650px] p-5 md:p-10 ${
            isTurning
              ? pageDirection === "next"
                ? "page-next"
                : "page-previous"
              : ""
          }`}
        >
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b-3 border-black pb-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#c5443e]">
                Cineotype / Volume 01
              </p>

              <h1 className="manga-title mt-2 text-3xl md:text-5xl">
                {selectedMovieId !== null
                  ? "Special Chapter!"
                  : "Movie Archive!"}
              </h1>
            </div>

            <div className="border-2 border-black bg-[#f6d365] px-4 py-2 text-xs font-black uppercase">
              {selectedMovieId !== null
                ? "Film-Details"
                : `Seite ${page} / ${totalPages}`}
            </div>
          </div>

          {selectedMovieId !== null ? (
            <MovieDetails
              id={selectedMovieId}
              onBack={handleBack}
            />
          ) : (
            <>
              <div className="mb-8">
                <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-[#c5443e]">
                  Chapter 01 / Discover Movies
                </p>

                <h2 className="manga-title text-3xl md:text-4xl">
                  Deine nächste Filmmission!
                </h2>

                <p className="mt-3 max-w-2xl font-medium text-zinc-600">
                  Suche nach einem Film, blättere durch
                  die Ergebnisse und öffne ein
                  Filmkapitel.
                </p>
              </div>

              <SearchBar onSearch={handleSearch} />

              {loading && (
                <div className="comic-border manga-dots bg-[#f6e6c1] p-12 text-center">
                  <p className="manga-title animate-pulse text-3xl">
                    Loading ...
                  </p>

                  <p className="mt-3 font-bold">
                    Filmarchive werden durchsucht!
                  </p>
                </div>
              )}

              {error && (
                <div className="comic-border bg-[#f6b3aa] p-6">
                  <p className="font-black">
                    Fehler bei der Filmsuche:
                    {" "}
                    {error}
                  </p>
                </div>
              )}

              {!loading &&
                !error &&
                query.trim() === "" && (
                  <div className="comic-border manga-dots bg-[#f6e6c1] p-10 text-center">
                    <p className="text-6xl">
                      🎬
                    </p>

                    <h3 className="manga-title mt-5 text-3xl">
                      Dein Abenteuer beginnt!
                    </h3>

                    <p className="mt-4 font-bold text-zinc-600">
                      Gib oben einen Filmtitel ein.
                    </p>
                  </div>
                )}

              {!loading &&
                !error &&
                query.trim() !== "" &&
                movies.length === 0 && (
                  <div className="comic-border bg-[#f6e6c1] p-10 text-center">
                    <p className="manga-title text-3xl">
                      Keine Treffer!
                    </p>

                    <p className="mt-4 font-bold">
                      Versuche einen anderen Filmtitel.
                    </p>
                  </div>
                )}

              {!loading &&
                !error &&
                movies.length > 0 && (
                  <section>
                    <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
                      <h3 className="manga-title text-2xl">
                        Die Filmakten!
                      </h3>

                      <span className="border-2 border-black bg-white px-3 py-2 text-xs font-black">
                        {movies.length} Treffer
                      </span>
                    </div>

                    <MovieList
                      movies={visibleMovies}
                      onSelect={handleSelectMovie}
                    />
                  </section>
                )}

              <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t-3 border-black pt-7">
                <button
                  type="button"
                  onClick={handlePreviousPage}
                  disabled={
                    page <= 1 ||
                    loading ||
                    isTurning
                  }
                  className="manga-button px-4 py-3 text-sm"
                >
                  ← Vorherige Seite
                </button>

                <span className="manga-title text-lg">
                  {String(page).padStart(2, "0")}
                  {" / "}
                  {String(totalPages).padStart(2, "0")}
                </span>

                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={
                    page >= totalPages ||
                    loading ||
                    isTurning
                  }
                  className="manga-button bg-[#f28b82] px-4 py-3 text-sm"
                >
                  Nächste Seite →
                </button>
              </div>
            </>
          )}

          <div className="mt-10 border-t border-black/20 pt-5 text-center">
            <p className="text-xs font-bold text-zinc-500">
              CINEOTYPE • END OF PAGE
            </p>
          </div>
        </div>

        <footer className="mt-10 text-center text-xs font-medium text-zinc-600">
          <p>
            Cineotype verwendet die TMDB-API.
          </p>

          <p className="mt-2">
            Dieses Produkt verwendet die TMDB-API,
            wird jedoch nicht von TMDB unterstützt
            oder zertifiziert.
          </p>
        </footer>
      </div>
    </div>
  )
}