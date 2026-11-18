import { useEffect, useRef, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, FileText, X, ZoomIn } from 'lucide-react'
import { marked } from 'marked'
import { AuroraBackground } from '../components/AuroraBackground'
import { ScrollProgress, Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { getDocumentBySlug, documents } from '../data/documents'

marked.setOptions({ gfm: true, breaks: false })

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })
}

export function DocumentView() {
  const { slug } = useParams<{ slug: string }>()
  const doc = slug ? getDocumentBySlug(slug) : undefined
  const proseRef = useRef<HTMLDivElement>(null)
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [lightbox])

  useEffect(() => {
    const root = proseRef.current
    if (!root) return

    const onClick = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.tagName !== 'IMG') return
      const img = target as HTMLImageElement
      setLightbox({ src: img.currentSrc || img.src, alt: img.alt || 'Diagram' })
    }

    root.addEventListener('click', onClick)
    return () => root.removeEventListener('click', onClick)
  }, [doc?.slug])

  if (!doc) return <Navigate to="/documents" replace />

  const html = (marked.parse(doc.markdown) as string).replace(
    /<img /g,
    '<img loading="eager" decoding="async" class="doc-zoomable" ',
  )
  const related = documents.filter((d) => d.slug !== doc.slug).slice(0, 2)

  return (
    <div className="relative min-h-screen">
      <AuroraBackground />
      <ScrollProgress />
      <Navbar />
      <main className="relative z-10 pt-28 pb-24">
        <article className="max-w-6xl mx-auto px-6 md:px-8">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <Link
              to="/documents"
              className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-cyan-300 transition-colors mb-10"
            >
              <ArrowLeft size={14} />
              All documents
            </Link>

            <div className="flex flex-wrap gap-2 mb-6">
              {doc.tags.map((tag) => (
                <span key={tag} className="tag-cyan">
                  {tag}
                </span>
              ))}
            </div>

            <p className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 mb-3">
              <FileText size={12} />
              {doc.type} · {doc.audience}
            </p>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] max-w-4xl">
              {doc.title}
            </h1>
            <p className="mt-3 text-sm font-mono text-slate-500">
              Updated {formatDate(doc.updated)} · {doc.file}
            </p>
            <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-slate-600">
              <ZoomIn size={12} />
              Click any diagram to enlarge
            </p>
          </motion.div>

          <motion.div
            ref={proseRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.08 }}
            className="doc-prose doc-prose-wide mt-10"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <div className="mt-14 pt-10 border-t border-white/[0.06] max-w-3xl">
            <p className="section-label mb-6">More documents</p>
            <div className="space-y-5">
              {related.map((r) => (
                <Link key={r.slug} to={`/documents/${r.slug}`} className="block group">
                  <h3 className="font-display text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {r.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {r.type} · {r.tags.join(' · ')}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </article>
      </main>
      <Footer />

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Expanded diagram"
          >
            <button
              type="button"
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <motion.img
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-w-[min(96vw,1400px)] max-h-[88vh] w-auto h-auto object-contain rounded-xl border border-white/10 shadow-2xl"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
