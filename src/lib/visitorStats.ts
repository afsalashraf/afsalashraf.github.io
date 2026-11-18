/**
 * Persistent visitor stats.
 * Prefers Cloudflare Worker API (VITE_VISITOR_API_URL) when set —
 * otherwise falls back to Abacus. Counts are external, so GitHub
 * Pages rebuilds never reset them.
 */

const NAMESPACE = 'afsalashraf-com'
const TOTAL_KEY = 'visits'
const ABACUS = 'https://abacus.jasoncameron.dev'
const CACHE_KEY = 'afsal_visitor_stats_v1'
const SESSION_KEY = 'afsal_visitor_hit_v1'
const KNOWN_KEY = 'afsal_visitor_countries_v1'

const WORKER_URL = (import.meta.env.VITE_VISITOR_API_URL as string | undefined)?.replace(/\/$/, '') || ''

const WATCH_COUNTRIES = [
  'AE', 'IN', 'US', 'GB', 'DE', 'SG', 'SA', 'QA', 'KW', 'BH', 'OM', 'PK', 'BD',
  'PH', 'EG', 'CA', 'AU', 'NL', 'FR', 'SE', 'CH', 'IE', 'JP', 'KR', 'CN', 'BR',
  'NG', 'ZA', 'TR', 'ID', 'MY', 'TH', 'VN', 'LK', 'NP', 'KE', 'IT', 'ES', 'PL',
  'RU', 'MX', 'AR', 'NZ', 'HK', 'TW', 'IL', 'AT', 'BE', 'DK', 'NO', 'FI', 'PT',
]

const COUNTRY_NAMES: Record<string, string> = {
  AE: 'United Arab Emirates', IN: 'India', US: 'United States', GB: 'United Kingdom',
  DE: 'Germany', SG: 'Singapore', SA: 'Saudi Arabia', QA: 'Qatar', KW: 'Kuwait',
  BH: 'Bahrain', OM: 'Oman', PK: 'Pakistan', BD: 'Bangladesh', PH: 'Philippines',
  EG: 'Egypt', CA: 'Canada', AU: 'Australia', NL: 'Netherlands', FR: 'France',
  SE: 'Sweden', CH: 'Switzerland', IE: 'Ireland', JP: 'Japan', KR: 'South Korea',
  CN: 'China', BR: 'Brazil', NG: 'Nigeria', ZA: 'South Africa', TR: 'Turkey',
  ID: 'Indonesia', MY: 'Malaysia', TH: 'Thailand', VN: 'Vietnam', LK: 'Sri Lanka',
  NP: 'Nepal', KE: 'Kenya', IT: 'Italy', ES: 'Spain', PL: 'Poland', RU: 'Russia',
  MX: 'Mexico', AR: 'Argentina', NZ: 'New Zealand', HK: 'Hong Kong', TW: 'Taiwan',
  IL: 'Israel', AT: 'Austria', BE: 'Belgium', DK: 'Denmark', NO: 'Norway',
  FI: 'Finland', PT: 'Portugal',
}

export type CountryStat = {
  code: string
  name: string
  flag: string
  count: number
}

export type VisitorStats = {
  total: number
  countries: CountryStat[]
  updatedAt: number
}

function flagEmoji(code: string) {
  const cc = code.toUpperCase()
  if (!/^[A-Z]{2}$/.test(cc)) return '🌐'
  return [...cc].map((c) => String.fromCodePoint(127397 + c.charCodeAt(0))).join('')
}

function countryName(code: string) {
  return COUNTRY_NAMES[code.toUpperCase()] ?? code.toUpperCase()
}

function isLocalHost() {
  const h = window.location.hostname
  return h === 'localhost' || h === '127.0.0.1' || h === '0.0.0.0'
}

function readCache(): VisitorStats | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as VisitorStats
  } catch {
    return null
  }
}

function writeCache(stats: VisitorStats) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(stats))
  } catch {
    /* ignore */
  }
}

function readKnownCountries(): string[] {
  try {
    const raw = localStorage.getItem(KNOWN_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as string[]
    return Array.isArray(parsed) ? parsed.map((c) => c.toUpperCase()) : []
  } catch {
    return []
  }
}

function rememberCountry(code: string) {
  const cc = code.toUpperCase()
  if (!/^[A-Z]{2}$/.test(cc)) return
  const next = Array.from(new Set([...readKnownCountries(), cc]))
  try {
    localStorage.setItem(KNOWN_KEY, JSON.stringify(next))
  } catch {
    /* ignore */
  }
}

function toCountryStat(code: string, count: number): CountryStat {
  const cc = code.toUpperCase()
  return {
    code: cc,
    name: countryName(cc),
    flag: flagEmoji(cc),
    count,
  }
}

function normalizeWorkerStats(data: {
  total?: number
  countries?: Array<{ code: string; count: number }>
}): VisitorStats {
  const countries = (data.countries ?? [])
    .map((c) => toCountryStat(c.code, Number(c.count) || 0))
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count)
  return {
    total: Number(data.total) || 0,
    countries,
    updatedAt: Date.now(),
  }
}

async function detectCountry(): Promise<string> {
  try {
    const res = await fetch('https://ipwho.is/', { mode: 'cors', cache: 'no-store' })
    if (!res.ok) return 'XX'
    const data = (await res.json()) as { success?: boolean; country_code?: string }
    if (!data.success || !data.country_code) return 'XX'
    return data.country_code.toUpperCase()
  } catch {
    return 'XX'
  }
}

/* ── Cloudflare Worker backend ─────────────────────────────────────── */

async function workerGetStats(): Promise<VisitorStats> {
  const res = await fetch(`${WORKER_URL}/stats`, { mode: 'cors', cache: 'no-store' })
  if (!res.ok) throw new Error('worker stats failed')
  return normalizeWorkerStats(await res.json())
}

async function workerHit(country: string): Promise<VisitorStats> {
  const res = await fetch(`${WORKER_URL}/hit`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ country: country === 'XX' ? undefined : country }),
  })
  if (!res.ok) throw new Error('worker hit failed')
  return normalizeWorkerStats(await res.json())
}

/* ── Abacus fallback ───────────────────────────────────────────────── */

async function abacusGet(key: string): Promise<number> {
  const res = await fetch(`${ABACUS}/get/${NAMESPACE}/${key}`, {
    mode: 'cors',
    cache: 'no-store',
  })
  if (res.status === 404) return 0
  if (!res.ok) throw new Error(`get ${key} failed`)
  const data = (await res.json()) as { value?: number }
  return typeof data.value === 'number' ? data.value : 0
}

async function abacusHit(key: string): Promise<number> {
  const res = await fetch(`${ABACUS}/hit/${NAMESPACE}/${key}`, {
    mode: 'cors',
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`hit ${key} failed`)
  const data = (await res.json()) as { value?: number }
  return typeof data.value === 'number' ? data.value : 0
}

async function sleep(ms: number) {
  await new Promise((r) => setTimeout(r, ms))
}

async function fetchCountryCountsBatched(codes: string[]): Promise<CountryStat[]> {
  const unique = Array.from(
    new Set(codes.map((c) => c.toUpperCase()).filter((c) => /^[A-Z]{2}$/.test(c))),
  )
  const out: CountryStat[] = []
  const batchSize = 12

  for (let i = 0; i < unique.length; i += batchSize) {
    const batch = unique.slice(i, i + batchSize)
    const part = await Promise.all(
      batch.map(async (code) => {
        try {
          const count = await abacusGet(`cc-${code.toLowerCase()}`)
          return toCountryStat(code, count)
        } catch {
          return toCountryStat(code, 0)
        }
      }),
    )
    out.push(...part)
    if (i + batchSize < unique.length) await sleep(1100)
  }

  return out.filter((c) => c.count > 0).sort((a, b) => b.count - a.count)
}

async function abacusTrackAndLoad(skipHit: boolean, country: string): Promise<VisitorStats> {
  const cached = readCache()
  let total = cached?.total ?? 0

  if (skipHit) {
    total = await abacusGet(TOTAL_KEY)
  } else {
    total = await abacusHit(TOTAL_KEY)
    if (country !== 'XX') {
      await abacusHit(`cc-${country.toLowerCase()}`)
      rememberCountry(country)
    }
  }

  const codes = Array.from(
    new Set([...WATCH_COUNTRIES, ...readKnownCountries(), country].filter((c) => c !== 'XX')),
  )
  const countries = await fetchCountryCountsBatched(codes)
  return { total, countries, updatedAt: Date.now() }
}

async function abacusRefresh(): Promise<VisitorStats> {
  const cached = readCache()
  let total = cached?.total ?? 0
  try {
    total = await abacusGet(TOTAL_KEY)
  } catch {
    /* keep */
  }
  const codes = Array.from(new Set([...WATCH_COUNTRIES, ...readKnownCountries()]))
  let countries = cached?.countries ?? []
  try {
    countries = await fetchCountryCountsBatched(codes)
  } catch {
    /* keep */
  }
  return { total, countries, updatedAt: Date.now() }
}

/* ── Public API ────────────────────────────────────────────────────── */

export function getCachedVisitorStats(): VisitorStats | null {
  return readCache()
}

export async function trackAndLoadVisitorStats(): Promise<VisitorStats> {
  const cached = readCache()
  const alreadyHit = sessionStorage.getItem(SESSION_KEY) === '1'
  const skipHit = isLocalHost() || alreadyHit

  let country = 'XX'
  try {
    country = await detectCountry()
    if (country !== 'XX') rememberCountry(country)
  } catch {
    /* optional */
  }

  try {
    if (WORKER_URL) {
      const stats = skipHit ? await workerGetStats() : await workerHit(country)
      if (!skipHit) sessionStorage.setItem(SESSION_KEY, '1')
      writeCache(stats)
      return stats
    }

    const stats = await abacusTrackAndLoad(skipHit, country)
    if (!skipHit) sessionStorage.setItem(SESSION_KEY, '1')
    writeCache(stats)
    return stats
  } catch {
    return cached ?? { total: 0, countries: [], updatedAt: Date.now() }
  }
}

export async function refreshVisitorStats(): Promise<VisitorStats> {
  const cached = readCache()
  try {
    if (WORKER_URL) {
      const stats = await workerGetStats()
      writeCache(stats)
      return stats
    }
    const stats = await abacusRefresh()
    writeCache(stats)
    return stats
  } catch {
    return cached ?? { total: 0, countries: [], updatedAt: Date.now() }
  }
}
