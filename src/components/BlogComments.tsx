import { FormEvent, useEffect, useState } from 'react'
import { MessageSquare, Reply, Shield } from 'lucide-react'
import { profile } from '../data/portfolio'
import {
  clearAdminKey,
  fetchComments,
  getAdminKey,
  getCommentProfile,
  postComment,
  postReply,
  saveAdminKey,
  saveCommentProfile,
  type BlogComment,
  type CommentProfile,
} from '../lib/comments'

function formatWhen(iso: string) {
  try {
    return new Date(iso).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  } catch {
    return ''
  }
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export function BlogComments({ slug }: { slug: string }) {
  const [comments, setComments] = useState<BlogComment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const [userProfile, setUserProfile] = useState<CommentProfile | null>(() => getCommentProfile())
  const [name, setName] = useState(userProfile?.name ?? '')
  const [email, setEmail] = useState(userProfile?.email ?? '')
  const [body, setBody] = useState('')
  const [editingProfile, setEditingProfile] = useState(!userProfile)

  const [adminKey, setAdminKeyState] = useState(() => getAdminKey() ?? '')
  const [adminUnlocked, setAdminUnlocked] = useState(() => Boolean(getAdminKey()))
  const [showAdmin, setShowAdmin] = useState(false)
  const [replyFor, setReplyFor] = useState<string | null>(null)
  const [replyBody, setReplyBody] = useState('')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError('')
      try {
        const list = await fetchComments(slug)
        if (!cancelled) setComments(list)
      } catch {
        if (!cancelled) setError('Comments are temporarily unavailable.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [slug])

  async function onSubmitComment(e: FormEvent) {
    e.preventDefault()
    setError('')
    const nextName = name.trim()
    const nextEmail = email.trim()
    const nextBody = body.trim()
    if (!nextName || !nextEmail || !nextBody) {
      setError('Name, email, and comment are required.')
      return
    }
    if (!isValidEmail(nextEmail)) {
      setError('Enter a valid email address.')
      return
    }

    setSubmitting(true)
    try {
      const profileData = { name: nextName, email: nextEmail }
      saveCommentProfile(profileData)
      setUserProfile(profileData)
      setEditingProfile(false)
      const list = await postComment({
        slug,
        name: nextName,
        email: nextEmail,
        body: nextBody,
      })
      setComments(list)
      setBody('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not post comment.')
    } finally {
      setSubmitting(false)
    }
  }

  function unlockAdmin(e: FormEvent) {
    e.preventDefault()
    if (!adminKey.trim()) return
    saveAdminKey(adminKey.trim())
    setAdminUnlocked(true)
    setShowAdmin(false)
  }

  function lockAdmin() {
    clearAdminKey()
    setAdminUnlocked(false)
    setAdminKeyState('')
    setReplyFor(null)
  }

  async function onSubmitReply(e: FormEvent, commentId: string) {
    e.preventDefault()
    setError('')
    const key = getAdminKey()
    if (!key) {
      setError('Unlock author tools first.')
      return
    }
    if (!replyBody.trim()) return
    setSubmitting(true)
    try {
      const list = await postReply({
        slug,
        commentId,
        body: replyBody,
        adminKey: key,
      })
      setComments(list)
      setReplyBody('')
      setReplyFor(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not post reply.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="mt-14 pt-10 border-t border-white/[0.06] max-w-3xl">
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <MessageSquare size={16} className="text-cyan-400/80" />
          <h2 className="font-display text-xl font-semibold text-white">
            Comments
            <span className="ml-2 text-sm font-mono font-normal text-slate-500">
              {comments.length}
            </span>
          </h2>
        </div>
        <button
          type="button"
          onClick={() => setShowAdmin((v) => !v)}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-300 transition-colors"
        >
          <Shield size={12} />
          {adminUnlocked ? 'Author' : 'Author tools'}
        </button>
      </div>

      {showAdmin && (
        <div className="mb-6 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
          {adminUnlocked ? (
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-slate-300">
                Signed in as author — you can reply to comments.
              </p>
              <button
                type="button"
                onClick={lockAdmin}
                className="text-xs text-slate-500 hover:text-white"
              >
                Lock
              </button>
            </div>
          ) : (
            <form onSubmit={unlockAdmin} className="space-y-3">
              <p className="text-sm text-slate-400">
                Enter your author key to reply as {profile.name}.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="password"
                  value={adminKey}
                  onChange={(e) => setAdminKeyState(e.target.value)}
                  placeholder="Author key"
                  className="flex-1 rounded-lg border border-white/[0.1] bg-black/30 px-3 py-2 text-sm text-white placeholder:text-slate-600 outline-none focus:border-cyan-400/40"
                />
                <button type="submit" className="btn-primary !px-4 !py-2 text-sm">
                  Unlock
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      <form onSubmit={onSubmitComment} className="space-y-3 mb-10">
        {(editingProfile || !userProfile) && (
          <div className="grid sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              maxLength={80}
              className="rounded-lg border border-white/[0.1] bg-black/30 px-3 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none focus:border-cyan-400/40"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              maxLength={120}
              className="rounded-lg border border-white/[0.1] bg-black/30 px-3 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none focus:border-cyan-400/40"
            />
          </div>
        )}

        {userProfile && !editingProfile && (
          <p className="text-xs text-slate-500">
            Commenting as <span className="text-slate-300">{userProfile.name}</span>
            {' · '}
            <button
              type="button"
              onClick={() => setEditingProfile(true)}
              className="text-cyan-400/80 hover:text-cyan-300"
            >
              Change name / email
            </button>
          </p>
        )}

        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write a comment…"
          required
          rows={4}
          maxLength={2000}
          className="w-full rounded-lg border border-white/[0.1] bg-black/30 px-3 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none focus:border-cyan-400/40 resize-y"
        />

        {error && <p className="text-sm text-rose-400">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="btn-primary !px-5 !py-2.5 text-sm disabled:opacity-60"
        >
          {submitting ? 'Posting…' : 'Post comment'}
        </button>
      </form>

      {loading ? (
        <p className="text-sm text-slate-500">Loading comments…</p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-slate-500">No comments yet — start the discussion.</p>
      ) : (
        <ul className="space-y-6">
          {comments.map((c) => (
            <li key={c.id} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 md:p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-white">{c.name}</p>
                  <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                    {formatWhen(c.createdAt)}
                  </p>
                </div>
                {adminUnlocked && (
                  <button
                    type="button"
                    onClick={() => {
                      setReplyFor(replyFor === c.id ? null : c.id)
                      setReplyBody('')
                    }}
                    className="inline-flex items-center gap-1 text-xs text-cyan-400/80 hover:text-cyan-300"
                  >
                    <Reply size={12} />
                    Reply
                  </button>
                )}
              </div>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                {c.body}
              </p>

              {c.replies?.length > 0 && (
                <ul className="mt-4 space-y-3 border-l border-cyan-400/20 pl-4">
                  {c.replies.map((r) => (
                    <li key={r.id}>
                      <p className="text-xs font-medium text-cyan-300">
                        {r.authorName}
                        <span className="ml-2 font-mono font-normal text-slate-500">
                          {formatWhen(r.createdAt)}
                        </span>
                      </p>
                      <p className="mt-1.5 text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                        {r.body}
                      </p>
                    </li>
                  ))}
                </ul>
              )}

              {adminUnlocked && replyFor === c.id && (
                <form onSubmit={(e) => onSubmitReply(e, c.id)} className="mt-4 space-y-2">
                  <textarea
                    value={replyBody}
                    onChange={(e) => setReplyBody(e.target.value)}
                    placeholder={`Reply as ${profile.name}…`}
                    rows={3}
                    maxLength={2000}
                    className="w-full rounded-lg border border-cyan-400/20 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-slate-600 outline-none focus:border-cyan-400/40 resize-y"
                  />
                  <button
                    type="submit"
                    disabled={submitting || !replyBody.trim()}
                    className="btn-primary !px-4 !py-2 text-sm disabled:opacity-60"
                  >
                    Post reply
                  </button>
                </form>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
