import { motion } from 'framer-motion'
import { Download, ExternalLink, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { profile } from '../data/portfolio'

const channels = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
    description: 'Best for roles, consulting, and architecture discussions',
  },
  {
    label: 'LinkedIn',
    value: 'Connect on LinkedIn',
    href: profile.linkedin,
    icon: Linkedin,
    external: true,
    description: 'Message me for opportunities or introductions',
  },
  {
    label: 'Toptal',
    value: 'Hire via Toptal',
    href: profile.toptal,
    icon: ExternalLink,
    external: true,
    description: 'Top 3% vetted talent — contract and remote engagements',
  },
  {
    label: 'Phone',
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, '')}`,
    icon: Phone,
    description: 'UAE · available for scheduled calls',
  },
]

export function Contact() {
  return (
    <section id="contact" className="py-24 border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          {profile.available && (
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-emerald-400/90 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Open to opportunities
            </span>
          )}
          <p className="section-label mb-3">Contact</p>
          <h2 className="section-title">Let&apos;s work together</h2>
          <p className="mt-4 text-slate-500 text-[15px] leading-relaxed">
            Open to AI platform architecture, cloud engineering leadership, and enterprise
            transformation roles across the UAE and globally — remote or hybrid.
          </p>
        </motion.div>

        <div className="mt-12 grid sm:grid-cols-2 gap-4">
          {channels.map((ch, i) => {
            const Icon = ch.icon
            return (
              <motion.a
                key={ch.label}
                href={ch.href}
                target={ch.external ? '_blank' : undefined}
                rel={ch.external ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="glass-card p-6 group hover:border-white/[0.12] transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-cyan-400/80 group-hover:text-cyan-400 transition-colors">
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-slate-600">
                      {ch.label}
                    </p>
                    <p className="font-medium text-white mt-1 group-hover:text-cyan-50 transition-colors">
                      {ch.value}
                    </p>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">{ch.description}</p>
                  </div>
                </div>
              </motion.a>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 glass-card p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div className="flex items-start gap-3">
            <MapPin size={18} className="text-slate-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-white">{profile.location}</p>
              <p className="text-xs text-slate-500 mt-1">
                {profile.title} · {profile.subtitle}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={profile.resume} download className="btn-primary text-sm !px-5 !py-2.5">
              <Download size={16} />
              Download Resume
            </a>
            <a
              href={profile.toptal}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-sm !px-5 !py-2.5"
            >
              <ExternalLink size={16} />
              Toptal Profile
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
