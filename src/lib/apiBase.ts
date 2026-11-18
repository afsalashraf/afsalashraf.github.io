/** Cloudflare Worker used for visitors + blog comments (survives GitHub rebuilds). */
export const API_BASE = (
  (import.meta.env.VITE_VISITOR_API_URL as string | undefined) ||
  'https://afsal-visitors.afsalashraf.workers.dev'
).replace(/\/$/, '')
