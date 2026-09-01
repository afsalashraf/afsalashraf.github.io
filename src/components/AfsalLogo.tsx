type LogoProps = {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

const sizes = { sm: 32, md: 38, lg: 46 }

/**
 * Mark: stroke-based A with orbital arc from the right foot.
 * Clean at 16px favicon and navbar sizes.
 */
export function AfsalLogoMark({ size = 36, className = '' }: { size?: number; className?: string }) {
  const id = `lm-${size}`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      className={className}
    >
      <rect width="48" height="48" rx="14" fill="#0a0f1c" />

      {/* Orbital arc — begins at the right foot of the A */}
      <path
        d="M 33.5 35 C 41 33.5 44 23 39 14.5 C 35 8 26 6.5 17.5 11"
        stroke={`url(#${id})`}
        strokeWidth="2.25"
        fill="none"
        strokeLinecap="round"
        opacity="0.55"
      />

      {/* A letterform */}
      <path
        d="M 14.5 35.5 L 24 12.5 L 33.5 35.5"
        stroke={`url(#${id})`}
        strokeWidth="3.25"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 17.5 27.5 H 30.5"
        stroke={`url(#${id})`}
        strokeWidth="3.25"
        strokeLinecap="round"
      />

      <defs>
        <linearGradient id={id} x1="14" y1="10" x2="40" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22d3ee" />
          <stop offset="1" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function AfsalLogo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const s = sizes[size]

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <AfsalLogoMark size={s} />
      {showText && (
        <span className="font-display font-semibold text-[15px] text-white tracking-tight">
          Afsal<span className="text-gradient-cyan">.</span>
        </span>
      )}
    </div>
  )
}
