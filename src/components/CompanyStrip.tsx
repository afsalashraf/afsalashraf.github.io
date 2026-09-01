import { motion } from 'framer-motion'
import { experience } from '../data/portfolio'
import { CompanyLogo, isWideCompanyLogo } from './logos/BrandLogos'

export function CompanyStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.6 }}
      className="mt-16"
    >
      <div className="flex items-center justify-between gap-4 mb-6">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500">
          Enterprise experience
        </p>
        <div className="hidden sm:block flex-1 h-px bg-gradient-to-r from-white/[0.08] to-transparent" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {experience.map((job, i) => (
          <motion.a
            key={job.id}
            href="#work"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.06 }}
            className="group glass-card p-4 hover:border-white/[0.14] transition-all"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex-shrink-0 ${
                  isWideCompanyLogo(job.logo)
                    ? ''
                    : 'rounded-lg overflow-hidden ring-1 ring-white/[0.06] group-hover:ring-white/[0.12] transition-all'
                }`}
              >
                <CompanyLogo id={job.logo} size={36} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">{job.shortName}</p>
                <p className="text-[10px] font-mono text-slate-600 mt-0.5 truncate">{job.period.split('–')[0].trim()}</p>
              </div>
            </div>
            <ul className="mt-3 space-y-1">
              {job.impact.map((point) => (
                <li key={point} className="text-[11px] text-slate-500 leading-snug flex gap-1.5">
                  <span className="text-cyan-500/60 flex-shrink-0">›</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.a>
        ))}
      </div>
    </motion.div>
  )
}
