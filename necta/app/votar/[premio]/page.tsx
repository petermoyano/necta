'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { NameAutocomplete } from '@/app/components/name-autocomplete'
import { getPrizeBySlug, PRIZES, type PrizeSlug } from '@/app/lib/types'

export default function VotarPage() {
  const params = useParams()
  const [hasVoted, setHasVoted] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const prizeSlug = params.premio as string
  const prize = getPrizeBySlug(prizeSlug)
  
  if (!prize) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-purple-950 via-purple-900 to-purple-950 flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-purple-200 mb-4">Premio no encontrado</h1>
          <Link href="/" className="text-purple-300 hover:text-purple-200">
            Volver al inicio
          </Link>
        </div>
      </main>
    )
  }

  // Get next prize for "vote another" button
  const currentIndex = PRIZES.findIndex(p => p.slug === prizeSlug)
  const nextPrize = PRIZES[(currentIndex + 1) % PRIZES.length]
  const otherPrizes = PRIZES.filter(p => p.slug !== prizeSlug)

  function handleVoteSuccess() {
    setHasVoted(true)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-950 via-purple-900 to-purple-950 flex flex-col items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-lg">
        {/* Back link */}
        <Link 
          href="/" 
          className="self-start flex items-center gap-2 text-purple-200/70 hover:text-purple-300 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          Volver
        </Link>

        {hasVoted ? (
          // Success state
          <div className="flex flex-col items-center gap-6 text-center">
            <div 
              className="text-7xl animate-bounce" 
              style={mounted ? { animationDuration: '1s', animationIterationCount: 3 } : undefined}
            >
              🎉
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-purple-100">
                ¡Gracias por participar!
              </h1>
              <p className="text-purple-200/80">
                Tu voto fue registrado en<br />
                <span className="text-purple-300 font-semibold">{prize.title}</span>
              </p>
            </div>

            <div className="flex flex-col gap-3 w-full max-w-xs mt-4">
              <div className="text-purple-200/70 text-sm">Elegí otra categoría:</div>
              
              {otherPrizes.map((p) => (
                <Link key={p.slug} href={`/votar/${p.slug}`}>
                  <Button
                    variant="outline"
                    className="w-full h-12 border-purple-700/50 text-purple-200 hover:bg-purple-900/50 hover:text-purple-100 hover:border-purple-500/50"
                    onClick={() => setHasVoted(false)}
                  >
                    {p.emoji} {p.title}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          // Voting state
          <div className="flex flex-col items-center gap-6 w-full">
            {/* Prize header */}
            <div className="text-center space-y-3">
              <span className="text-5xl">{prize.emoji}</span>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-200 via-purple-400 to-purple-200 bg-clip-text text-transparent">
                {prize.title}
              </h1>
              <p className="text-purple-200/80">
                {prize.description}
              </p>
            </div>

            {/* Instruction */}
            <div className="bg-purple-900/30 border border-purple-700/50 rounded-xl px-4 py-3 text-center">
              <p className="text-purple-200 text-sm">
                📝 Escribí <span className="text-purple-300 font-semibold">NOMBRE Y APELLIDO</span> en MAYÚSCULAS
                <br />
                <span className="text-purple-300/60">(sin segundo nombre)</span>
              </p>
            </div>

            {/* Autocomplete */}
            <NameAutocomplete 
              prizeSlug={prize.slug as PrizeSlug} 
              onVoteSuccess={handleVoteSuccess}
            />

            {/* Help text */}
            <p className="text-purple-200/70 text-sm text-center">
              Empezá a escribir y seleccioná el nombre de la lista
            </p>
          </div>
        )}
      </div>
    </main>
  )
}


