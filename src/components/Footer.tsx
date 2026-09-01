import { Download, Mail, MapPin } from 'lucide-react'
import { navLinks, profile } from '../data/portfolio'
import { AfsalLogo } from './AfsalLogo'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-white/[0.06] bg-black/20">
      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.75fr_0.75fr] gap-8 lg:gap-10 items-start">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <AfsalLogo size="sm" />
            <p className="mt-3 text-sm text-slate-500 leading-relaxed line-clamp-3">
              {profile.tagline}
            </p>
            <p className="mt-2.5 text-xs font-mono text-slate-600 inline-flex items-center gap-1.5">
              <MapPin size={12} className="text-slate-600 shrink-0" />
              {profile.location}
            </p>
          </div>

          {/* Navigate */}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-600 mb-3">
              Navigate
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources — email + resume only */}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-600 mb-3">
              Resources
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <Mail size={14} className="shrink-0 opacity-60" />
                  <span className="truncate">{profile.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={profile.resume}
                  download
                  className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <Download size={14} className="shrink-0 opacity-60" />
                  Resume
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <p>© {year} {profile.name}</p>
          <p className="font-mono text-slate-500">{profile.title}</p>
        </div>
      </div>
    </footer>
  )
}
