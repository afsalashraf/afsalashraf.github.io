import { motion } from 'framer-motion'
import { Brain, Calendar, Car, Rocket, Star, TrendingUp } from 'lucide-react'
import { stats } from '../data/portfolio'

const iconMap: Record<string, typeof Calendar> = {
  calendar: Calendar,
  brain: Brain,
  rocket: Rocket,
  car: Car,
  star: Star,
  trending: TrendingUp,
}

export function Stats() {
  return (
    <section id="stats" className="py-16 border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
          {stats.map((stat, i) => {
            const Icon = iconMap[stat.icon] || Calendar
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-surface px-5 py-6 text-center"
              >
                <Icon size={16} className="text-cyan-400/60 mx-auto mb-3" />
                <div className="font-display text-2xl font-bold text-white">{stat.value}</div>
                <p className="mt-1 text-[11px] font-mono text-slate-500 leading-tight">{stat.label}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
