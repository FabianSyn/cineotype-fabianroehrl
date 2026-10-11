import { useState } from "react"
import type {
  ChangeEvent,
  FormEvent,
} from "react"

type SearchBarProps = {
  onSearch: (query: string) => void
}

export default function SearchBar({
  onSearch,
}: SearchBarProps) {
  const [text, setText] = useState("")

  function handleChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    setText(event.target.value)
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()
    onSearch(text.trim())
  }

  return (
    <div className="mb-9">
      <div className="speech-bubble mb-7 inline-block px-5 py-3">
        <p className="manga-title text-lg">
          Welchen Film suchen wir?!
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="comic-border manga-dots flex flex-col gap-3 bg-[#f6e6c1] p-4 sm:flex-row"
      >
        <input
          type="search"
          value={text}
          onChange={handleChange}
          placeholder="Filmtitel eingeben ..."
          aria-label="Filmtitel suchen"
          className="min-w-0 flex-1 border-3 border-[#222222] bg-white px-5 py-4 font-bold text-[#222222] outline-none placeholder:text-zinc-500 focus:bg-yellow-50"
        />

        <button
          type="submit"
          className="manga-button bg-[#f28b82] px-8 py-4 text-lg"
        >
          Suchen!
        </button>
      </form>
    </div>
  )
}