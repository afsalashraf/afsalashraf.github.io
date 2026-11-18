/**
 * Portfolio API — visitor stats + blog comments (Cloudflare KV).
 *
 * GET  /stats
 * POST /hit
 * GET  /comments?slug=
 * POST /comments            { slug, name, email, body }
 * POST /comments/reply      { slug, commentId, body, adminKey }
 *
 * Set author reply key once:
 *   npx wrangler secret put ADMIN_KEY
 */

const STATS_KEY = 'stats:v1'
const AUTHOR_NAME = 'Afsal Ashraf'
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

function commentsKey(slug) {
  return `comments:v1:${slug}`
}

function normalizeCountry(code) {
  const cc = String(code || 'XX').toUpperCase()
  return /^[A-Z]{2}$/.test(cc) ? cc : 'XX'
}

function trimStr(value, max) {
  return String(value || '')
    .trim()
    .slice(0, max)
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidSlug(slug) {
  return typeof slug === 'string' && /^[a-z0-9-]{1,120}$/.test(slug)
}

function publicComments(list) {
  return (Array.isArray(list) ? list : []).map((c) => ({
    id: c.id,
    name: c.name,
    body: c.body,
    createdAt: c.createdAt,
    replies: Array.isArray(c.replies)
      ? c.replies.map((r) => ({
          id: r.id,
          body: r.body,
          createdAt: r.createdAt,
          authorName: r.authorName || AUTHOR_NAME,
        }))
      : [],
  }))
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

async function readComments(env, slug) {
  const raw = await env.VISITORS.get(commentsKey(slug))
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

async function writeComments(env, slug, list) {
  await env.VISITORS.put(commentsKey(slug), JSON.stringify(list))
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

    if (url.pathname === '/comments' && request.method === 'GET') {
      const slug = url.searchParams.get('slug') || ''
      if (!isValidSlug(slug)) return json({ error: 'Invalid slug' }, 400)
      const list = await readComments(env, slug)
      return json({ comments: publicComments(list) })
    }

    if (url.pathname === '/comments' && request.method === 'POST') {
      let body
      try {
        body = await request.json()
      } catch {
        return json({ error: 'Invalid JSON' }, 400)
      }

      const slug = trimStr(body?.slug, 120)
      const name = trimStr(body?.name, 80)
      const email = trimStr(body?.email, 120).toLowerCase()
      const text = trimStr(body?.body, 2000)

      if (!isValidSlug(slug)) return json({ error: 'Invalid slug' }, 400)
      if (!name || !email || !text) return json({ error: 'Name, email, and comment are required' }, 400)
      if (!isValidEmail(email)) return json({ error: 'Invalid email' }, 400)

      const list = await readComments(env, slug)
      if (list.length >= 200) return json({ error: 'Comment limit reached for this post' }, 400)

      list.push({
        id: crypto.randomUUID(),
        name,
        email,
        body: text,
        createdAt: new Date().toISOString(),
        replies: [],
      })
      await writeComments(env, slug, list)
      return json({ comments: publicComments(list) })
    }

    if (url.pathname === '/comments/reply' && request.method === 'POST') {
      let body
      try {
        body = await request.json()
      } catch {
        return json({ error: 'Invalid JSON' }, 400)
      }

      const slug = trimStr(body?.slug, 120)
      const commentId = trimStr(body?.commentId, 80)
      const text = trimStr(body?.body, 2000)
      const adminKey = trimStr(body?.adminKey, 200)
      const expected = trimStr(env.ADMIN_KEY, 200)

      if (!expected) return json({ error: 'Author replies are not configured' }, 503)
      if (!adminKey || adminKey !== expected) return json({ error: 'Invalid author key' }, 401)
      if (!isValidSlug(slug) || !commentId || !text) {
        return json({ error: 'slug, commentId, and body are required' }, 400)
      }

      const list = await readComments(env, slug)
      const target = list.find((c) => c.id === commentId)
      if (!target) return json({ error: 'Comment not found' }, 404)

      if (!Array.isArray(target.replies)) target.replies = []
      target.replies.push({
        id: crypto.randomUUID(),
        body: text,
        createdAt: new Date().toISOString(),
        authorName: AUTHOR_NAME,
      })
      await writeComments(env, slug, list)
      return json({ comments: publicComments(list) })
    }

    return json({ error: 'not found' }, 404)
  },
}
