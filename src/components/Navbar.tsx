import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { navLinks, profile } from '../data/portfolio'
import { AfsalLogo } from './AfsalLogo'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
      style={{ scaleX, background: 'linear-gradient(90deg, #06b6d4, #8b5cf6, #ec4899)' }}
    />
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass border-b border-white/5 shadow-2xl shadow-black/30' : ''
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="hover:opacity-90 transition-opacity">
          <AfsalLogo size="sm" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors relative group">
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-violet-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a href={profile.resume} download className="btn-primary text-sm !px-5 !py-2">
            Resume
          </a>
        </div>

        <button className="md:hidden p-2 text-slate-300" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden glass border-t border-white/5 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="block text-slate-300 hover:text-white py-1">
              {link.label}
            </a>
          ))}
          <a href={profile.resume} download className="block text-cyan-400 font-semibold py-1">Resume</a>
        </div>
      )}
    </motion.nav>
  )
}
