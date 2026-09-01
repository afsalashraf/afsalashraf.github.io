import { motion } from 'framer-motion'
import { about } from '../data/portfolio'

export function About() {
  return (
    <section id="about" className="py-24 border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-label mb-3">About</p>
          <h2 className="section-title text-white">Who I am</h2>
        </motion.div>

        <div className="mt-10 space-y-6 max-w-3xl">
          {about.map((paragraph, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-slate-400 text-[15px] md:text-base leading-[1.75]"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  )
}
