type LogoProps = { className?: string; size?: number }
type LogoComponent = (props: LogoProps) => JSX.Element

export function AzureLogo({ className = '', size = 40 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 96 96" fill="none">
      <path d="M33.34 10.5L11.5 50.18l21.84 35.32h26.32L81.5 50.18 59.66 10.5H33.34z" fill="#0078D4"/>
      <path d="M46.5 10.5L24.66 50.18 46.5 85.5h13.16L81.5 50.18 59.66 10.5H46.5z" fill="#50E6FF" opacity=".8"/>
    </svg>
  )
}

export function GoogleCloudLogo({ className = '', size = 40 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24">
      <path fill="#EA4335" d="M6.5 18.5c-2.5-1.7-4.1-4.5-4.1-7.7 0-1.5.4-3 1.1-4.3l3.5 2.7c-.3.8-.5 1.6-.5 2.5 0 2.5 1.2 4.7 3 6.1l-3 1.7z"/>
      <path fill="#4285F4" d="M12 22c3.3 0 6.1-1.2 8.2-3.2l-3.9-3c-1.1.8-2.5 1.2-4.3 1.2-3.3 0-6.1-2.2-7.1-5.2l-3.5 2.7C3.6 19.5 7.4 22 12 22z"/>
      <path fill="#34A853" d="M4.9 12c0-.9.2-1.7.5-2.5L2 6.8C1.3 8.1 1 9.5 1 11c0 1.5.3 3 .9 4.3l3.5-2.7c-.3-.8-.4-1.6-.4-2.6z"/>
      <path fill="#FBBC05" d="M12 5.4c1.8 0 3.4.6 4.7 1.8l3.5-3.5C18.1 1.7 15.3.5 12 .5 7.4.5 3.6 3 1.9 6.8l3.5 2.7C6.4 6.6 9 5.4 12 5.4z"/>
    </svg>
  )
}

export function MicrosoftLogo({ className = '', size = 40 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 23 23">
      <path fill="#f25022" d="M1 1h10v10H1z"/><path fill="#00a4ef" d="M12 1h10v10H12z"/>
      <path fill="#7fba00" d="M1 12h10v10H1z"/><path fill="#ffb900" d="M12 12h10v10H12z"/>
    </svg>
  )
}

export function AnthropicLogo({ className = '', size = 40 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 46 46" fill="none">
      <rect width="46" height="46" rx="10" fill="#D97757"/>
      <path d="M23 10L14 34h4.5l1.5-4.5h7l1.5 4.5H33L23 10zm-1 12l2.5-7.5L27 22h-5z" fill="white"/>
    </svg>
  )
}

export function KubernetesLogo({ className = '', size = 40 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24">
      <path fill="#326CE5" d="M12 2l1.5 4.5h3L13.5 9l1.5 4.5L12 11l-3 2.5 1.5-4.5L7.5 6.5h3L12 2z"/>
      <circle cx="12" cy="12" r="8" stroke="#326CE5" strokeWidth="1.5" fill="none"/>
      <path stroke="#326CE5" strokeWidth="1" d="M4 12h16M12 4v16M6.3 6.3l11.4 11.4M17.7 6.3L6.3 17.7"/>
    </svg>
  )
}

export function TerraformLogo({ className = '', size = 40 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24">
      <path fill="#844FBA" d="M3 3h7v7H3V3zm11 0h7v4h-7V3zM3 14h7v7H3v-7zm11 3h7v7h-7v-7z"/>
    </svg>
  )
}

export function NvidiaLogo({ className = '', size = 40 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24">
      <path fill="#76B900" d="M8.5 8.5v7l3.5 2V6.5l-3.5 2zm7 0v7l3.5 2V6.5l-3.5 2zM2 10.5l9-6 11 6v3l-11 6.5L2 13.5v-3z"/>
    </svg>
  )
}

export function OpenAILogo({ className = '', size = 40 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#10a37f"/>
      <path d="M12 6c-2.5 0-4.5 1.5-5.5 3.5 1 .5 2 1 3 1.5-1-1.5-1-3.5 0-5 1.5 1 2.5 3 2.5 5s-1 4-2.5 5c1.5-1 2.5-2.5 2.5-4.5.5.5 1 1 1.5 1.5C16.5 14.5 18 13 18 11s-1.5-3.5-4-3.5c.5 1 .5 2 0 3 1-.5 2-.5 3 0-1.5 1-2.5 2.5-2.5 4.5z" fill="white"/>
    </svg>
  )
}

export function GitHubLogo({ className = '', size = 40 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.12.83-.26.83-.58 0-.28-.01-1.02-.02-2-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.1-.75.08-.74.08-.74 1.22.09 1.86 1.25 1.86 1.25 1.08 1.85 2.83 1.32 3.52 1.01.11-.78.42-1.32.76-1.62-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.3 0 .32.22.7.84.58A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}

export function DockerLogo({ className = '', size = 40 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24">
      <path fill="#2496ED" d="M22 11.5h-1.2c-.1 0-.2-.1-.2-.2V10c0-.1-.1-.2-.2-.2h-1.4c-.1 0-.2.1-.2.2v1.3c0 .1-.1.2-.2.2H18c-.1 0-.2-.1-.2-.2V10c0-.1-.1-.2-.2-.2h-1.4c-.1 0-.2.1-.2.2v1.3c0 .1-.1.2-.2.2h-1.2c-.1 0-.2-.1-.2-.2V10c0-.1-.1-.2-.2-.2H13c-.1 0-.2.1-.2.2v1.3c0 .1-.1.2-.2.2h-1.2V9.8c0-.1-.1-.2-.2-.2H9.8c-.1 0-.2.1-.2.2v1.5H8.4c-.1 0-.2-.1-.2-.2V9.8c0-.1-.1-.2-.2-.2H6.6c-.1 0-.2.1-.2.2v1.5H5c-.1 0-.2-.1-.2-.2V9.8c0-.1-.1-.2-.2-.2H3.2c-.1 0-.2.1-.2.2v1.5H1.8c-.1 0-.2.1-.2.2v1.4c0 3.5 1.5 6.5 4.5 8.5 2.5 1.6 5.5 2 8.5 1.5 3-.5 5.5-2 7-4.5.5-.8.8-1.7 1-2.6.1-.1 0-.2-.1-.2z"/>
    </svg>
  )
}

export function PythonLogo({ className = '', size = 40 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24">
      <path fill="#3776AB" d="M12 2C7 2 4 4 4 7v3h8V9H6.5c0-1 1-2 3.5-2h5c2 0 3.5 1 3.5 3v2.5H9v3h9v-2c0-3-2-5.5-6-5.5z"/>
      <path fill="#FFD43B" d="M12 22c5 0 8-2 8-5v-3h-8v3h5.5c0 1-1 2-3.5 2h-5c-2 0-3.5-1-3.5-3v-2.5h9v-3H4v2c0 3 2 5.5 6 5.5z"/>
      <circle cx="8" cy="6.5" r="1" fill="white"/><circle cx="16" cy="17.5" r="1" fill="white"/>
    </svg>
  )
}

export function CompanyBadge({ name, color, size = 48 }: { name: string; color: string; size?: number }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  return (
    <div
      className="rounded-xl flex items-center justify-center font-bold text-white shadow-lg"
      style={{ width: size, height: size, backgroundColor: color, fontSize: size * 0.3 }}
    >
      {initials}
    </div>
  )
}

type ImageLogoConfig = { src: string; aspect: number }

const imageLogos: Record<string, ImageLogoConfig> = {
  adcb: { src: '/logos/adcb.svg', aspect: 2.35 },
  walmart: { src: '/logos/walmart.svg', aspect: 3.6 },
  techm: { src: '/logos/techm.svg', aspect: 3.53 },
  xerox: { src: '/logos/xerox.svg', aspect: 4.1 },
  syntel: { src: '/logos/syntel.svg', aspect: 2.98 },
  smu: { src: '/logos/smu.jpg', aspect: 1.28 },
  calicut: { src: '/logos/calicut.png', aspect: 1 },
}

function ImageBrandLogo({
  src,
  aspect,
  size = 40,
  className = '',
}: LogoProps & ImageLogoConfig) {
  const height = size
  const width = Math.round(size * aspect)

  return (
    <div
      className={`flex items-center justify-center bg-white rounded-md overflow-hidden shrink-0 ${className}`}
      style={{ width, height }}
      aria-hidden
    >
      <img
        src={src}
        alt=""
        className="h-[72%] w-[92%] object-contain"
        draggable={false}
      />
    </div>
  )
}

export function AdcbLogo({ className = '', size = 40 }: LogoProps) {
  return <ImageBrandLogo {...imageLogos.adcb} size={size} className={className} />
}

export function WalmartLogo({ className = '', size = 40 }: LogoProps) {
  return <ImageBrandLogo {...imageLogos.walmart} size={size} className={className} />
}

export function TechMahindraLogo({ className = '', size = 40 }: LogoProps) {
  return <ImageBrandLogo {...imageLogos.techm} size={size} className={className} />
}

export function XeroxLogo({ className = '', size = 40 }: LogoProps) {
  return <ImageBrandLogo {...imageLogos.xerox} size={size} className={className} />
}

export function SyntelLogo({ className = '', size = 40 }: LogoProps) {
  return <ImageBrandLogo {...imageLogos.syntel} size={size} className={className} />
}

export function SmuLogo({ className = '', size = 40 }: LogoProps) {
  return <ImageBrandLogo {...imageLogos.smu} size={size} className={className} />
}

export function CalicutLogo({ className = '', size = 40 }: LogoProps) {
  return <ImageBrandLogo {...imageLogos.calicut} size={size} className={className} />
}

const logoMap: Record<string, LogoComponent> = {
  azure: AzureLogo,
  google: GoogleCloudLogo,
  microsoft: MicrosoftLogo,
  anthropic: AnthropicLogo,
  kubernetes: KubernetesLogo,
  terraform: TerraformLogo,
  nvidia: NvidiaLogo,
  openai: OpenAILogo,
  github: GitHubLogo,
  docker: DockerLogo,
  python: PythonLogo,
  adcb: AdcbLogo,
  walmart: WalmartLogo,
  techm: TechMahindraLogo,
  xerox: XeroxLogo,
  syntel: SyntelLogo,
  smu: SmuLogo,
  calicut: CalicutLogo,
}

export function BrandLogo({ name, size = 40, className = '' }: { name: string; size?: number; className?: string }) {
  const Logo = logoMap[name]
  if (!Logo) return null
  return <Logo size={size} className={className} />
}

export function CompanyLogo({ id, size = 40, className = '' }: { id: string; size?: number; className?: string }) {
  return <BrandLogo name={id} size={size} className={className} />
}

export function InstitutionLogo({ id, size = 40, className = '' }: { id: string; size?: number; className?: string }) {
  return <BrandLogo name={id} size={size} className={className} />
}

export function isWideCompanyLogo(id: string) {
  return id in imageLogos
}

export function isWideImageLogo(id: string) {
  const cfg = imageLogos[id]
  return !!cfg && cfg.aspect > 2.2
}
