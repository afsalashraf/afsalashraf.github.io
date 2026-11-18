import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { AuroraBackground } from '../components/AuroraBackground'
import { ScrollProgress, Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { getPostBySlug, blogPosts } from '../data/blogs'
import { profile } from '../data/portfolio'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) return <Navigate to="/blog" replace />

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <div className="relative min-h-screen">
      <AuroraBackground />
      <ScrollProgress />
      <Navbar />
      <main className="relative z-10 pt-28 pb-24">
        <article className="max-w-3xl mx-auto px-6 md:px-8">
          <div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-cyan-300 transition-colors mb-10"
            >
              <ArrowLeft size={14} />
              All posts
            </Link>

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span key={tag} className="tag-violet">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white tracking-tight leading-[1.15]">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed">
              {post.subtitle}
            </p>

            <div className="mt-8 flex items-center gap-3 pb-8 border-b border-white/[0.08]">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/30 to-violet-500/30 border border-white/10 flex items-center justify-center text-sm font-display font-bold text-white">
                AA
              </div>
              <div>
                <p className="text-sm font-medium text-slate-100">{profile.name}</p>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  {formatDate(post.date)} · {post.readTime} read
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 space-y-6">
            {post.content.map((paragraph, i) => (
              <p
                key={i}
                className="text-slate-200 text-[17px] md:text-lg leading-[1.8] font-body"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-14 pt-10 border-t border-white/[0.06]">
            <p className="section-label mb-6">More writing</p>
            <div className="space-y-5">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/blog/${r.slug}`}
                  className="block group"
                >
                  <h3 className="font-display text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {r.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">{r.readTime} · {r.tags.join(' · ')}</p>
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
