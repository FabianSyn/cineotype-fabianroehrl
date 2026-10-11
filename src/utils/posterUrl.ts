export function posterUrl(
  path: string | null,
  size = "w500"
): string {
  if (!path) {
    return "/placeholder.png"
  }

  return `https://image.tmdb.org/t/p/${size}${path}`
}