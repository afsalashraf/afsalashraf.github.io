import { motion } from 'framer-motion'
import { skillGroups } from '../data/portfolio'

export function Skills() {
  return (
    <section id="skills" className="py-24 border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="section-label mb-3">Expertise</p>
          <h2 className="section-title">Skills &amp; Technologies</h2>
        </motion.div>

        <div className="mt-10 space-y-8">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="text-sm text-slate-400 px-3 py-1.5 rounded-md border border-white/[0.06] bg-white/[0.02]">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
