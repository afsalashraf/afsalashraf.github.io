export function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-void">
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-void to-void" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/[0.04] blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-violet-500/[0.03] blur-[100px] rounded-full" />
    </div>
  )
}
