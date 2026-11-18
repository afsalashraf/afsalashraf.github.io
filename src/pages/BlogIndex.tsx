import { Link } from 'react-router-dom'
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
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <header className="mb-12">
            <p className="section-label mb-3 text-cyan-400/90">Writing</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white">
              Technical Blog
            </h1>
            <p className="mt-4 text-slate-300 text-[15px] md:text-base leading-relaxed max-w-2xl">
              Notes on cloud platforms, Agentic AI, Kubernetes, and building production systems —
              from {profile.name}.
            </p>
            <p className="mt-3 text-sm font-mono text-slate-400">
              {blogPosts.length} {blogPosts.length === 1 ? 'post' : 'posts'}
            </p>
          </header>

          {blogPosts.length === 0 ? (
            <p className="text-slate-300 text-base">No posts published yet.</p>
          ) : (
            <ul className="space-y-4 list-none p-0 m-0">
              {blogPosts.map((post) => (
                <li key={post.slug}>
                  <article className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-6 md:px-7 md:py-7 hover:border-cyan-400/25 hover:bg-white/[0.045] transition-colors">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-slate-400 mb-3">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span className="text-slate-600">·</span>
                      <span>{post.readTime} read</span>
                    </div>

                    <Link to={`/blog/${post.slug}`} className="group block">
                      <h2 className="font-display text-xl md:text-2xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors leading-snug">
                        {post.title}
                      </h2>
                      <p className="mt-2 text-slate-300 text-[15px] leading-relaxed">
                        {post.subtitle}
                      </p>
                      <p className="mt-3 text-slate-400 text-sm leading-relaxed line-clamp-2">
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
                        className="inline-flex items-center gap-1 text-sm text-cyan-300 hover:text-cyan-200 transition-colors"
                      >
                        Read
                        <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
