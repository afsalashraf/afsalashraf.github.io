import { useEffect, useRef, useState } from 'react'
import { Eye, EyeOff, X } from 'lucide-react'
import {
  getCachedVisitorStats,
  refreshVisitorStats,
  trackAndLoadVisitorStats,
  type VisitorStats,
} from '../lib/visitorStats'

function formatCount(n: number) {
  return new Intl.NumberFormat('en', { notation: n >= 10000 ? 'compact' : 'standard' }).format(n)
}

export function VisitorEye() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<VisitorStats | null>(() => getCachedVisitorStats())
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      try {
        const next = await trackAndLoadVisitorStats()
        if (!cancelled) setStats(next)
      } catch {
        /* keep cache */
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!open) return
    let cancelled = false
    ;(async () => {
      try {
        const next = await refreshVisitorStats()
        if (!cancelled) setStats(next)
      } catch {
        /* ignore */
      }
    })()
    return () => {
      cancelled = true
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onPointer = (e: MouseEvent) => {
      if (!panelRef.current) return
      if (panelRef.current.contains(e.target as Node)) return
      setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('mousedown', onPointer)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('mousedown', onPointer)
    }
  }, [open])

  const total = stats?.total ?? 0
  const countries = stats?.countries ?? []

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Site viewers by country"
          className="w-[min(20.5rem,calc(100vw-2.5rem))] rounded-2xl border border-white/[0.1] bg-[#070b16]/95 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden"
        >
          <div className="flex items-start justify-between gap-3 px-4 pt-4 pb-3 border-b border-white/[0.06]">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-cyan-400/80">
                Site viewers
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-white tabular-nums">
                {loading && !stats ? '—' : formatCount(total)}
              </p>
              <p className="mt-0.5 text-xs text-slate-400">Total visits so far</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/[0.06] transition-colors"
              aria-label="Close viewers"
            >
              <X size={14} />
            </button>
          </div>

          <div className="max-h-64 overflow-y-auto px-2 py-2">
            {countries.length === 0 ? (
              <p className="px-2 py-4 text-sm text-slate-500 text-center">
                {loading ? 'Loading countries…' : 'No country data yet — check back soon.'}
              </p>
            ) : (
              <ul className="space-y-0.5">
                {countries.map((c) => (
                  <li
                    key={c.code}
                    className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 hover:bg-white/[0.04]"
                  >
                    <span className="text-base leading-none" aria-hidden>
                      {c.flag}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-slate-200 truncate">{c.name}</p>
                      <p className="text-[10px] font-mono text-slate-500">{c.code}</p>
                    </div>
                    <span className="text-sm font-mono text-cyan-300/90 tabular-nums">
                      {formatCount(c.count)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <p className="px-4 py-2.5 text-[10px] text-slate-600 border-t border-white/[0.06]">
            Counts are stored externally and keep growing across site rebuilds.
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group flex items-center gap-2 rounded-full border border-white/[0.1] bg-[#070b16]/90 backdrop-blur-md pl-3 pr-3.5 py-2.5 text-slate-200 shadow-lg shadow-black/40 hover:border-cyan-400/30 hover:text-white transition-colors"
        aria-expanded={open}
        aria-label={open ? 'Hide site viewers' : 'Show site viewers'}
      >
        {open ? <EyeOff size={16} className="text-cyan-300" /> : <Eye size={16} className="text-cyan-300" />}
        <span className="text-xs font-mono tabular-nums text-slate-300 group-hover:text-white">
          {loading && !stats ? '…' : formatCount(total)}
        </span>
      </button>
    </div>
  )
}
