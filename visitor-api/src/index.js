/**
 * Persistent visitor counter for the portfolio.
 * Deploy once: cd visitor-api && npx wrangler kv namespace create VISITORS
 * Update wrangler.toml id, then: npx wrangler deploy
 * Counts live in Cloudflare KV — safe across GitHub Pages rebuilds.
 *
 * GET  /stats          → { total, countries: [{ code, count }] }
 * POST /hit            → records one visit (uses CF-IPCountry)
 * OPTIONS /*           → CORS
 */

const STATS_KEY = 'stats:v1'
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  })
}

async function readStats(env) {
  const raw = await env.VISITORS.get(STATS_KEY)
  if (!raw) return { total: 0, countries: {} }
  try {
    const parsed = JSON.parse(raw)
    return {
      total: Number(parsed.total) || 0,
      countries: parsed.countries && typeof parsed.countries === 'object' ? parsed.countries : {},
    }
  } catch {
    return { total: 0, countries: {} }
  }
}

async function writeStats(env, stats) {
  await env.VISITORS.put(STATS_KEY, JSON.stringify(stats))
}

function normalizeCountry(code) {
  const cc = String(code || 'XX').toUpperCase()
  return /^[A-Z]{2}$/.test(cc) ? cc : 'XX'
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS })
    }

    if (url.pathname === '/stats' && request.method === 'GET') {
      const stats = await readStats(env)
      const countries = Object.entries(stats.countries)
        .map(([code, count]) => ({ code, count: Number(count) || 0 }))
        .filter((c) => c.count > 0)
        .sort((a, b) => b.count - a.count)
      return json({ total: stats.total, countries })
    }

    if (url.pathname === '/hit' && request.method === 'POST') {
      let bodyCountry = null
      try {
        const body = await request.json()
        bodyCountry = body?.country
      } catch {
        /* empty body ok */
      }

      const cfCountry = request.cf?.country
      const country = normalizeCountry(bodyCountry || cfCountry || 'XX')
      const stats = await readStats(env)
      stats.total += 1
      if (country !== 'XX') {
        stats.countries[country] = (Number(stats.countries[country]) || 0) + 1
      }
      await writeStats(env, stats)

      const countries = Object.entries(stats.countries)
        .map(([code, count]) => ({ code, count: Number(count) || 0 }))
        .filter((c) => c.count > 0)
        .sort((a, b) => b.count - a.count)

      return json({ total: stats.total, countries })
    }

    return json({ error: 'not found' }, 404)
  },
}
