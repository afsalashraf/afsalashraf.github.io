import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { AuroraBackground } from '../components/AuroraBackground'
import { ScrollProgress, Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { blogPosts } from '../data/blogs'
import { profile } from '../data/portfolio'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function BlogIndex() {
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
            <p className="section-label mb-3">Writing</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white">
              Technical Blog
            </h1>
            <p className="mt-4 text-slate-400 text-[15px] md:text-base leading-relaxed max-w-2xl">
              Notes on cloud platforms, Agentic AI, Kubernetes, and building production systems —
              from {profile.name}.
            </p>
          </motion.header>

          <div className="divide-y divide-white/[0.06]">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="py-10 first:pt-0"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-slate-500 mb-3">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="text-slate-700">·</span>
                  <span>{post.readTime} read</span>
                </div>

                <Link to={`/blog/${post.slug}`} className="group block">
                  <h2 className="font-display text-2xl md:text-[1.75rem] font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-slate-400 text-[15px] leading-relaxed">
                    {post.subtitle}
                  </p>
                  <p className="mt-3 text-slate-500 text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </Link>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="tag-cyan">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-cyan-300 transition-colors"
                  >
                    Read
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
