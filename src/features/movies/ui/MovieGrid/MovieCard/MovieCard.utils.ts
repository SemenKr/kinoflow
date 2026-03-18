const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500'

export const createPosterFallbackUrl = (label: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 750">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#141a24"/>
      <stop offset="100%" stop-color="#0b1018"/>
    </linearGradient>
  </defs>
  <rect width="500" height="750" fill="url(#bg)"/>
  <rect x="70" y="100" width="360" height="520" rx="20" fill="none" stroke="#2c3a52" stroke-width="6"/>
  <path d="M120 540l88-104 70 82 54-63 48 85H120z" fill="#2c3a52"/>
  <circle cx="188" cy="240" r="28" fill="#2c3a52"/>
  <text x="250" y="650" text-anchor="middle" font-family="Arial,sans-serif" font-size="30" fill="#9fb0c9">
    ${label}
  </text>
</svg>`
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

export const getPosterUrl = (posterPath: string | null, fallbackUrl: string) =>
  posterPath ? `${POSTER_BASE_URL}${posterPath}` : fallbackUrl

export const getRatingPercent = (voteAverage: number) => {
  const normalized = Math.round(voteAverage * 10)
  return Math.min(100, Math.max(0, normalized))
}

export const getRatingValue = (voteAverage: number) => {
  const normalized = Number(voteAverage.toFixed(1))
  return Math.min(10, Math.max(0, normalized))
}

export const getRatingColor = (ratingPercent: number) => {
  if (ratingPercent >= 70) return '#21d07a'
  if (ratingPercent >= 50) return '#d2d531'
  return '#db2360'
}

export const getReleaseYear = (releaseDate?: string) => releaseDate?.slice(0, 4)
