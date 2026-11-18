import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, ArrowUpRight } from 'lucide-react'
import { AuroraBackground } from '../components/AuroraBackground'
import { ScrollProgress, Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { documents } from '../data/documents'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

export function DocumentsIndex() {
  return (
    <div className="relative min-h-screen">
      <AuroraBackground />
      <ScrollProgress />
      <Navbar />
      <main className="relative z-10 pt-28 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <motion.header
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-14"
          >
            <p className="section-label mb-3">Library</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white">
              Technical Documents
            </h1>
            <p className="mt-4 text-slate-400 text-[15px] md:text-base leading-relaxed max-w-2xl">
              Architecture references and platform playbooks sourced from the{' '}
              <span className="font-mono text-slate-300">Documents/</span> folder —
              Medium-style reading, same site look.
            </p>
          </motion.header>

          <div className="divide-y divide-white/[0.06]">
            {documents.map((doc, i) => (
              <motion.article
                key={doc.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="py-10 first:pt-0"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-slate-500 mb-3">
                  <span className="inline-flex items-center gap-1.5 text-cyan-400/80">
                    <FileText size={12} />
                    {doc.type}
                  </span>
                  <span className="text-slate-700">·</span>
                  <time dateTime={doc.updated}>{formatDate(doc.updated)}</time>
                </div>

                <Link to={`/documents/${doc.slug}`} className="group block">
                  <h2 className="font-display text-2xl md:text-[1.75rem] font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors leading-snug">
                    {doc.title}
                  </h2>
                  <p className="mt-2 text-slate-400 text-[15px] leading-relaxed">
                    {doc.summary}
                  </p>
                  <p className="mt-2 text-xs font-mono text-slate-600">
                    {doc.file} · {doc.audience}
                  </p>
                </Link>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {doc.tags.map((tag) => (
                      <span key={tag} className="tag-violet">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/documents/${doc.slug}`}
                    className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-cyan-300 transition-colors"
                  >
                    Open
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
