'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { NameAutocomplete } from '@/app/components/name-autocomplete'
import { getPrizeBySlug, PRIZES, type PrizeSlug } from '@/app/lib/types'
import { notFound } from 'next/navigation'

export default function VotarPage() {
  const params = useParams()
  const router = useRouter()
  const [hasVoted, setHasVoted] = useState(false)
  
  const prizeSlug = params.premio as string
  const prize = getPrizeBySlug(prizeSlug)
  
  if (!prize) {
    notFound()
  }

  // Get next prize for "vote another" button
  const currentIndex = PRIZES.findIndex(p => p.slug === prizeSlug)
  const nextPrize = PRIZES[(currentIndex + 1) % PRIZES.length]
  const otherPrizes = PRIZES.filter(p => p.slug !== prizeSlug)

  function handleVoteSuccess() {
    setHasVoted(true)
  }

  function handleVoteAnother() {
    setHasVoted(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 flex flex-col items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-lg">
        {/* Back link */}
        <Link 
          href="/" 
          className="self-start flex items-center gap-2 text-zinc-400 hover:text-amber-400 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          Volver
        </Link>

        {hasVoted ? (
          // Success state
          <div className="flex flex-col items-center gap-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-7xl animate-bounce" style={{ animationDuration: '1s', animationIterationCount: '3' }}>
              🎉
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-amber-100">
                ¡Gracias por participar!
              </h1>
              <p className="text-zinc-400">
                Tu voto fue registrado en<br />
                <span className="text-amber-400 font-semibold">{prize.title}</span>
              </p>
            </div>

            <div className="flex flex-col gap-3 w-full max-w-xs mt-4">
              <Button
                onClick={handleVoteAnother}
                className="h-12 bg-amber-500 hover:bg-amber-600 text-zinc-900 font-semibold"
              >
                Votar otro en esta categoría
              </Button>
              
              <div className="text-zinc-500 text-sm">o elegí otra categoría:</div>
              
              {otherPrizes.map((p) => (
                <Link key={p.slug} href={`/votar/${p.slug}`}>
                  <Button
                    variant="outline"
                    className="w-full h-12 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-amber-100 hover:border-amber-500/50"
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
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                {prize.title}
              </h1>
              <p className="text-zinc-400">
                {prize.description}
              </p>
            </div>

            {/* Instruction */}
            <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-center">
              <p className="text-zinc-300 text-sm">
                📝 Escribí <span className="text-amber-400 font-semibold">NOMBRE Y APELLIDO</span> en MAYÚSCULAS
                <br />
                <span className="text-zinc-500">(sin segundo nombre)</span>
              </p>
            </div>

            {/* Autocomplete */}
            <NameAutocomplete 
              prizeSlug={prize.slug as PrizeSlug} 
              onVoteSuccess={handleVoteSuccess}
            />

            {/* Help text */}
            <p className="text-zinc-500 text-sm text-center">
              Empezá a escribir y seleccioná el nombre de la lista
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

