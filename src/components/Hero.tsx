import { motion } from 'framer-motion'
import { ArrowDown, Download, Linkedin, Mail, MapPin } from 'lucide-react'
import { profile, splitHero } from '../data/portfolio'
import { CompanyStrip } from './CompanyStrip'
import { ToptalBadge } from './ToptalBadge'

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="lg:grid lg:grid-cols-[1fr_auto] lg:gap-12 xl:gap-16 lg:items-start">
          <div>
        {/* Eyebrow */}
        <motion.div custom={0} initial="hidden" animate="visible" variants={fade} className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-8">
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Available for opportunities
          </span>
          <span className="text-slate-600 hidden sm:inline">·</span>
          <span className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
            <MapPin size={12} className="text-slate-600" />
            {profile.location}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fade}
          className="font-display text-[clamp(2.5rem,6vw,4.75rem)] font-bold leading-[1.08] tracking-tight text-white"
        >
          {profile.name} builds{' '}
          <span className="text-gradient-cyan">enterprise cloud</span>
          {' & '}
          <span className="text-gradient-violet">production AI</span>
          {' '}platforms.
        </motion.h1>

        {/* Lead */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fade}
          className="mt-8 text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl font-light"
        >
          {profile.tagline}
        </motion.p>

        {/* Role line */}
        <motion.p
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fade}
          className="mt-4 text-sm font-mono text-slate-500"
        >
          {profile.title} · {profile.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div custom={4} initial="hidden" animate="visible" variants={fade} className="mt-10 flex flex-wrap gap-4">
          <a href={profile.resume} download className="btn-primary">
            <Download size={18} />
            Download Resume
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener" className="btn-ghost">
            <Linkedin size={18} />
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className="btn-ghost">
            <Mail size={18} />
            Email
          </a>
        </motion.div>
          </div>

          {/* Toptal badge — right column on desktop */}
          <div className="hidden lg:flex justify-center lg:justify-end lg:pt-20 xl:pt-24 lg:sticky lg:top-28">
            <ToptalBadge />
          </div>
        </div>

        {/* Toptal badge — centered on mobile/tablet */}
        <div className="lg:hidden flex justify-center mt-12">
          <ToptalBadge />
        </div>

        <CompanyStrip />

        {/* Dual expertise — clean text columns, no photo */}
        <motion.div
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fade}
          className="mt-20 pt-12 border-t border-white/[0.06] grid md:grid-cols-2 gap-10 md:gap-16 max-w-5xl"
        >
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400/80 mb-3">01 — Platform</p>
            <h2 className="font-display text-2xl font-semibold text-white lowercase mb-4">
              {splitHero.left.label}
            </h2>
            <p className="text-slate-400 leading-relaxed text-[15px]">{splitHero.left.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['Azure', 'Kubernetes', 'Terraform', 'GKE', 'DevSecOps'].map((t) => (
                <span key={t} className="tag-cyan">{t}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-violet-400/80 mb-3">02 — Intelligence</p>
            <h2 className="font-display text-2xl font-semibold text-white lowercase mb-4">
              {splitHero.right.label}
            </h2>
            <p className="text-slate-400 leading-relaxed text-[15px]">{splitHero.right.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['Agentic AI', 'RAG', 'Microsoft Foundry', 'NVIDIA AI', 'MLOps'].map((t) => (
                <span key={t} className="tag-violet">{t}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#stats"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600 hover:text-slate-400 transition-colors"
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        aria-label="Scroll to content"
      >
        <ArrowDown size={20} />
      </motion.a>
    </section>
  )
}
