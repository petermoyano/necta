import { PrizeSelector } from '@/app/components/prize-selector'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 flex flex-col items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-lg">
        {/* Trophy icon */}
        <div className="text-7xl animate-bounce" style={{ animationDuration: '2s' }}>
          🏆
        </div>
        
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
            Premios Necta 2024
          </h1>
          <p className="text-zinc-400 text-lg">
            Elegí un premio y votá a esa persona especial
          </p>
        </div>
        
        {/* Prize selector */}
        <PrizeSelector />
        
        {/* Footer hint */}
        <p className="text-zinc-500 text-sm text-center mt-4">
          Tu voto define quién se lleva cada premio 🗳️
        </p>
      </div>
    </main>
  )
}
