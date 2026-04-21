import { spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { setTimeout as delay } from 'node:timers/promises'
import { chromium } from 'playwright'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const outputDir = path.join(rootDir, 'docs', 'screenshots')

const BASE_URL = process.env.SCREENSHOT_BASE_URL || 'http://127.0.0.1:4173'
const SCREENSHOT_WAIT_MS = 1500
const pnpmCmd = 'pnpm'

const log = message => console.log(`[screenshots] ${message}`)

const run = async () => {
  await mkdir(outputDir, { recursive: true })

  log('Starting dev server...')
  const server = spawn(
    pnpmCmd,
    ['exec', 'vite', '--host', '127.0.0.1', '--port', '4173', '--strictPort'],
    {
      cwd: rootDir,
      shell: true,
      stdio: 'inherit',
    },
  )

  const shutdown = () => {
    if (!server.killed) {
      server.kill()
    }
  }

  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)
  process.on('exit', shutdown)

  log('Waiting for dev server...')
  await waitForServer(`${BASE_URL}/`)
  log('Dev server is ready.')

  log('Launching browser...')
  const browser = await chromium.launch()

  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    })
    context.setDefaultTimeout(30000)
    await context.addInitScript(() => {
      window.localStorage.setItem('kino-flow-lang', 'en')
      window.localStorage.setItem('kino-flow-theme', 'dark')
    })

    const page = await context.newPage()

    log('Capturing search catalog...')
    await captureSearchCatalog(page)
    log('Capturing filters...')
    await captureFilters(page)
    log('Capturing movie details...')
    await captureMovieDetails(page)
    log('Capturing cast and similar...')
    await captureCastSimilar(page)
    log('Capturing favorites...')
    await captureFavorites(page)
    log('Capturing theme and language...')
    await captureThemeLanguage(page)

    await context.close()

    log('Capturing mobile navigation...')
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
    })
    mobileContext.setDefaultTimeout(30000)
    await mobileContext.addInitScript(() => {
      window.localStorage.setItem('kino-flow-lang', 'en')
      window.localStorage.setItem('kino-flow-theme', 'dark')
    })
    const mobilePage = await mobileContext.newPage()
    await captureMobileNav(mobilePage)
    await mobileContext.close()
    log('Screenshots complete.')
  } finally {
    await browser.close()
    shutdown()
  }
}

const waitForServer = async url => {
  const timeoutMs = 60000
  const start = Date.now()

  while (Date.now() - start < timeoutMs) {
    try {
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), 2000)
      const response = await fetch(url, { method: 'GET', signal: controller.signal })
      clearTimeout(timer)
      if (response.ok) return
    } catch {}

    await delay(750)
  }

  throw new Error('Dev server did not start in time.')
}

const goto = async (page, pathName, waitForSelector) => {
  await page.goto(`${BASE_URL}${pathName}`, { waitUntil: 'domcontentloaded' })

  try {
    await page.waitForLoadState('networkidle', { timeout: 15000 })
  } catch {}

  if (waitForSelector) {
    await page.waitForSelector(waitForSelector, { timeout: 20000 })
  }

  await delay(SCREENSHOT_WAIT_MS)
}

const saveShot = async (page, name) => {
  await page.screenshot({
    path: path.join(outputDir, `${name}.png`),
    fullPage: false,
  })
}

const captureSearchCatalog = async page => {
  await goto(page, '/search?q=matrix', 'article[role="button"]')
  await saveShot(page, 'search-catalog')
}

const captureFilters = async page => {
  await goto(
    page,
    '/filtered?sort=vote_average.desc&rating=7-10&genres=28,12',
    'article[role="button"]',
  )
  await saveShot(page, 'filters-sort')
}

const captureMovieDetails = async page => {
  await goto(page, '/movie/550')
  await saveShot(page, 'movie-details')
}

const captureCastSimilar = async page => {
  await goto(page, '/movie/550')
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 2.2))
  await delay(SCREENSHOT_WAIT_MS)
  await saveShot(page, 'cast-similar')
}

const captureFavorites = async page => {
  await goto(page, '/', 'button[aria-label="favorite"]')
  const favoriteButton = page.locator('button[aria-label="favorite"]').first()
  await favoriteButton.click({ force: true })
  await goto(page, '/favorites', 'article[role="button"]')
  await saveShot(page, 'favorites')
}

const captureThemeLanguage = async page => {
  await goto(page, '/')
  await page.evaluate(() => window.scrollTo(0, 0))
  await delay(SCREENSHOT_WAIT_MS)
  await saveShot(page, 'theme-language')
}

const captureMobileNav = async page => {
  await goto(page, '/')
  await page.click('button[aria-label="Open navigation menu"]')
  await delay(800)
  await saveShot(page, 'mobile-nav')
}

run().catch(error => {
  console.error(error)
  process.exitCode = 1
})
