import Image from 'next/image'
import { PrizeSelector } from '@/app/components/prize-selector'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-950 via-purple-900 to-purple-950 flex flex-col items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-lg">
        {/* Logo */}
        <div className="animate-bounce">
          <Image
            src="/logo-necta.jpeg"
            alt="Necta Logo"
            width={120}
            height={120}
            className="rounded-full"
            priority
          />
        </div>
        
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-200 via-purple-400 to-purple-200 bg-clip-text text-transparent">
            Premios Necta 2025
          </h1>
          <p className="text-purple-200/80 text-lg">
            Elegí un premio y votá a esa persona especial
          </p>
        </div>
        
        {/* Prize selector */}
        <PrizeSelector />
        
        {/* Footer hint */}
        <p className="text-purple-300/70 text-sm text-center mt-4">
          Tu voto define quién se lleva cada premio 🗳️
        </p>
      </div>
    </main>
  )
}
