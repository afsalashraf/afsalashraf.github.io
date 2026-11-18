import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, FileText } from 'lucide-react'
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

  if (!doc) return <Navigate to="/documents" replace />

  const html = marked.parse(doc.markdown) as string
  const related = documents.filter((d) => d.slug !== doc.slug).slice(0, 2)

  return (
    <div className="relative min-h-screen">
      <AuroraBackground />
      <ScrollProgress />
      <Navbar />
      <main className="relative z-10 pt-28 pb-24">
        <article className="max-w-2xl mx-auto px-6">
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

            <h1 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight leading-[1.15]">
              {doc.title}
            </h1>
            <p className="mt-3 text-sm font-mono text-slate-500">
              Updated {formatDate(doc.updated)} · {doc.file}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.08 }}
            className="doc-prose mt-10"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <div className="mt-14 pt-10 border-t border-white/[0.06]">
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
    </div>
  )
}
