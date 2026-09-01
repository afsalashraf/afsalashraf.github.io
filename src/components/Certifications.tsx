import { motion } from 'framer-motion'
import { certifications } from '../data/portfolio'
import { BrandLogo } from './logos/BrandLogos'

export function Certifications() {
  return (
    <section id="certifications" className="py-24 border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label mb-3">Credentials</p>
          <h2 className="section-title text-white">Certifications</h2>
          <p className="mt-4 text-slate-500 max-w-2xl text-[15px] leading-relaxed">
            Validated expertise across cloud architecture, AI, and DevOps — recognized by Microsoft, Google, and Anthropic.
          </p>
        </motion.div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="glass-card p-6 group"
            >
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center mb-4 border border-white/[0.06]"
                style={{ backgroundColor: `${cert.color}10` }}
              >
                <BrandLogo name={cert.logo} size={26} />
              </div>
              <h3 className="font-display font-semibold text-white text-sm leading-snug">{cert.name}</h3>
              <p className="text-xs text-slate-500 mt-2">{cert.issuer}</p>
              <p className="text-xs font-mono text-slate-600 mt-1">{cert.year}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
