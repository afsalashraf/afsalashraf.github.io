import { motion } from 'framer-motion'
import { education } from '../data/portfolio'
import { InstitutionLogo, isWideImageLogo } from './logos/BrandLogos'

export function Education() {
  return (
    <section id="education" className="py-24 border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="section-label mb-3">Education</p>
          <h2 className="section-title">Academic Background</h2>
        </motion.div>

        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          {education.map((edu, i) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-6"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 ${
                    isWideImageLogo(edu.logo) ? '' : 'rounded-lg overflow-hidden ring-1 ring-white/[0.06]'
                  }`}
                >
                  <InstitutionLogo id={edu.logo} size={isWideImageLogo(edu.logo) ? 40 : 52} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-slate-600 mb-1.5">
                    {edu.shortName}
                  </p>
                  <h3 className="font-display font-semibold text-white text-[15px] leading-snug">{edu.degree}</h3>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">{edu.school}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
