import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { experience } from '../data/portfolio'
import { CompanyLogo, isWideCompanyLogo } from './logos/BrandLogos'

export function WorkShowcase() {
  const [active, setActive] = useState(experience[0].id)
  const current = experience.find((e) => e.id === active)!

  return (
    <section id="work" className="py-24 border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="section-label mb-3">Experience</p>
          <h2 className="section-title">Career Highlights</h2>
          <p className="mt-4 text-slate-500 max-w-2xl text-[15px] leading-relaxed">
            From banking AI platforms in Abu Dhabi to Walmart-scale multi-cloud PaaS — enterprise cloud and AI engineering at scale.
          </p>
        </motion.div>

        <div className="mt-10 flex flex-wrap gap-2">
          {experience.map((job) => (
            <button
              key={job.id}
              onClick={() => setActive(job.id)}
              className={`inline-flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all border ${
                active === job.id
                  ? 'border-white/20 bg-white/[0.05] text-white shadow-[0_0_20px_rgba(34,211,238,0.06)]'
                  : 'border-white/[0.06] text-slate-500 hover:text-slate-300 hover:border-white/[0.1]'
              }`}
            >
              <span
                className={
                  isWideCompanyLogo(job.logo)
                    ? ''
                    : 'rounded-md overflow-hidden ring-1 ring-white/[0.06]'
                }
              >
                <CompanyLogo id={job.logo} size={isWideCompanyLogo(job.logo) ? 24 : 28} />
              </span>
              <span className="font-medium">{job.shortName}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8 glass-card p-6 md:p-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-5 mb-6">
              <div
                className={`flex-shrink-0 ${
                  isWideCompanyLogo(current.logo) ? '' : 'rounded-xl overflow-hidden ring-1 ring-white/[0.08]'
                }`}
              >
                <CompanyLogo id={current.logo} size={isWideCompanyLogo(current.logo) ? 48 : 56} />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl font-semibold text-white">{current.company}</h3>
                <p className="text-slate-400 mt-1">{current.role}</p>
                <p className="text-xs font-mono text-slate-600 mt-2">{current.period} · {current.location}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {current.impact.map((point) => (
                    <span
                      key={point}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/[0.03] text-slate-400 border border-white/[0.06]"
                    >
                      {point}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-slate-400 text-[15px] leading-relaxed mb-6 border-l-2 border-cyan-400/30 pl-4">
              {current.summary}
            </p>

            <ul className="space-y-3">
              {current.highlights.map((h) => (
                <li key={h} className="text-sm text-slate-400 leading-relaxed pl-4 relative before:content-['–'] before:absolute before:left-0 before:text-cyan-500/40">
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-6 border-t border-white/[0.06] flex flex-wrap gap-2">
              {current.tags.map((tag) => (
                <span key={tag} className="tag-cyan">{tag}</span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export function Experience() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <section id="experience" className="py-24 border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="section-label mb-3">Timeline</p>
          <h2 className="section-title">Full Experience</h2>
        </motion.div>

        <div className="mt-10 space-y-3">
          {experience.map((job, i) => {
            const isOpen = expanded === job.id
            return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="glass-card overflow-hidden"
              >
                <button
                  className="w-full p-5 text-left flex items-start justify-between gap-4"
                  onClick={() => setExpanded(isOpen ? null : job.id)}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 mt-0.5 ${
                        isWideCompanyLogo(job.logo) ? '' : 'rounded-lg overflow-hidden ring-1 ring-white/[0.06]'
                      }`}
                    >
                      <CompanyLogo id={job.logo} size={isWideCompanyLogo(job.logo) ? 32 : 40} />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-white text-[15px]">{job.company}</h3>
                      <p className="text-sm text-slate-500 mt-0.5">{job.role}</p>
                      <p className="text-xs font-mono text-slate-600 mt-1">{job.period} · {job.location}</p>
                    </div>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-slate-600 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-white/[0.06]">
                        <div className="mt-4 flex flex-wrap gap-2 mb-3">
                          {job.impact.map((point) => (
                            <span key={point} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-slate-500 border border-white/[0.05]">
                              {point}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-slate-500 mb-3">{job.summary}</p>
                        <ul className="space-y-2">
                          {job.highlights.map((h) => (
                            <li key={h} className="text-sm text-slate-400 leading-relaxed pl-4 relative before:content-['–'] before:absolute before:left-0 before:text-slate-600">
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
