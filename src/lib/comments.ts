import { API_BASE } from './apiBase'

const PROFILE_KEY = 'afsal_comment_profile_v1'
const ADMIN_KEY = 'afsal_comment_admin_v1'

export type CommentReply = {
  id: string
  body: string
  createdAt: string
  authorName: string
}

export type BlogComment = {
  id: string
  name: string
  body: string
  createdAt: string
  replies: CommentReply[]
}

export type CommentProfile = {
  name: string
  email: string
}

function trim(s: string, max: number) {
  return s.trim().slice(0, max)
}

export function getCommentProfile(): CommentProfile | null {
  try {
    const raw = localStorage.getItem(PROFILE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as CommentProfile
    if (!parsed?.name?.trim() || !parsed?.email?.trim()) return null
    return { name: parsed.name.trim(), email: parsed.email.trim() }
  } catch {
    return null
  }
}

export function saveCommentProfile(profile: CommentProfile) {
  localStorage.setItem(
    PROFILE_KEY,
    JSON.stringify({
      name: trim(profile.name, 80),
      email: trim(profile.email, 120),
    }),
  )
}

export function getAdminKey(): string | null {
  try {
    return sessionStorage.getItem(ADMIN_KEY)
  } catch {
    return null
  }
}

export function saveAdminKey(key: string) {
  sessionStorage.setItem(ADMIN_KEY, key.trim())
}

export function clearAdminKey() {
  sessionStorage.removeItem(ADMIN_KEY)
}

export async function fetchComments(slug: string): Promise<BlogComment[]> {
  const res = await fetch(`${API_BASE}/comments?slug=${encodeURIComponent(slug)}`, {
    mode: 'cors',
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('Failed to load comments')
  const data = (await res.json()) as { comments?: BlogComment[] }
  return Array.isArray(data.comments) ? data.comments : []
}

export async function postComment(input: {
  slug: string
  name: string
  email: string
  body: string
}): Promise<BlogComment[]> {
  const res = await fetch(`${API_BASE}/comments`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      slug: input.slug,
      name: trim(input.name, 80),
      email: trim(input.email, 120),
      body: trim(input.body, 2000),
    }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data?.error || 'Failed to post comment')
  return Array.isArray(data.comments) ? data.comments : []
}

export async function postReply(input: {
  slug: string
  commentId: string
  body: string
  adminKey: string
}): Promise<BlogComment[]> {
  const res = await fetch(`${API_BASE}/comments/reply`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      slug: input.slug,
      commentId: input.commentId,
      body: trim(input.body, 2000),
      adminKey: input.adminKey.trim(),
    }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data?.error || 'Failed to post reply')
  return Array.isArray(data.comments) ? data.comments : []
}
