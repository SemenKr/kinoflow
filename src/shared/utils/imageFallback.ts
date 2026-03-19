interface ImageFallbackOptions {
  width: number
  height: number
  label?: string
}

export const createImageFallbackUrl = ({ width, height, label = 'No image' }: ImageFallbackOptions) => {
  const centerX = Math.round(width / 2)
  const frameX = Math.round(width * 0.14)
  const frameY = Math.round(height * 0.13)
  const frameWidth = Math.round(width * 0.72)
  const frameHeight = Math.round(height * 0.68)
  const frameRadius = Math.max(8, Math.round(width * 0.04))

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#141a24"/>
      <stop offset="100%" stop-color="#0b1018"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <rect x="${frameX}" y="${frameY}" width="${frameWidth}" height="${frameHeight}" rx="${frameRadius}" fill="none" stroke="#2c3a52" stroke-width="4"/>
  <path d="M${Math.round(width * 0.22)} ${Math.round(height * 0.7)}l${Math.round(width * 0.16)} ${Math.round(height * -0.16)} ${Math.round(width * 0.14)} ${Math.round(height * 0.12)} ${Math.round(width * 0.1)} ${Math.round(height * -0.09)} ${Math.round(width * 0.12)} ${Math.round(height * 0.13)}H${Math.round(width * 0.22)}z" fill="#2c3a52"/>
  <circle cx="${Math.round(width * 0.38)}" cy="${Math.round(height * 0.32)}" r="${Math.max(10, Math.round(width * 0.06))}" fill="#2c3a52"/>
  <text x="${centerX}" y="${Math.round(height * 0.88)}" text-anchor="middle" font-family="Arial,sans-serif" font-size="${Math.max(12, Math.round(width * 0.06))}" fill="#9fb0c9">
    ${label}
  </text>
</svg>`

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}
