'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { WordCloud } from '@/app/components/word-cloud'
import { PRIZES, type PrizeSlug } from '@/app/lib/types'
import { clearAllVotes } from '@/app/actions/votes'
import { useRouter } from 'next/navigation'
import type { VotesData } from '@/app/lib/types'

interface AdminClientProps {
  votes: VotesData
  totalVotes: number
}

export function AdminClient({ votes, totalVotes }: AdminClientProps) {
  const [visiblePrizes, setVisiblePrizes] = useState<Record<PrizeSlug, boolean>>({
    'mejor-companero': false,
    'voz-del-equipo': false,
    'salva-el-dia': false
  })
  const [isClearing, setIsClearing] = useState(false)
  const router = useRouter()

  function togglePrize(prizeSlug: PrizeSlug) {
    setVisiblePrizes(prev => ({
      ...prev,
      [prizeSlug]: !prev[prizeSlug]
    }))
  }

  async function handleClearVotes() {
    if (!confirm('¿Estás seguro de que querés limpiar todos los votos? Esta acción no se puede deshacer.')) {
      return
    }

    setIsClearing(true)
    const result = await clearAllVotes()
    
    if (result.success) {
      router.refresh()
      alert('Todos los votos han sido limpiados.')
    } else {
      alert(result.error || 'Error al limpiar los votos')
    }
    
    setIsClearing(false)
  }

  return (
    <>
      {/* Toggle buttons for each prize */}
      <div className="flex flex-col gap-3 mb-8">
        {PRIZES.map((prize) => (
          <Button
            key={prize.slug}
            onClick={() => togglePrize(prize.slug)}
            className="h-12 px-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold border-2 border-purple-400/50 flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <span>{prize.emoji}</span>
              <span>{prize.title}</span>
            </span>
            <span className="text-sm">
              {visiblePrizes[prize.slug] ? 'Ocultar' : 'Mostrar'}
            </span>
          </Button>
        ))}
      </div>

      {/* Word clouds */}
      <div className="grid gap-6 mb-16">
        {PRIZES.map((prize) => (
          visiblePrizes[prize.slug] && (
            <div key={prize.slug} className="animate-in fade-in duration-300">
              <WordCloud
                votes={votes[prize.slug]}
                title={prize.title}
                emoji={prize.emoji}
              />
            </div>
          )
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-8 pb-4 text-center space-y-4">
        <p className="text-purple-300/60 text-sm">
          Los resultados se actualizan al recargar la página
        </p>
        
        {/* Clear votes button - smaller, at bottom */}
        <Button
          onClick={handleClearVotes}
          disabled={isClearing}
          variant="destructive"
          className="h-10 px-6 text-sm bg-red-600 hover:bg-red-700 text-white font-semibold border border-red-400/50 disabled:opacity-50"
        >
          {isClearing ? (
            <>
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Limpiando...
            </>
          ) : (
            '🗑️ Limpiar Todos los Votos'
          )}
        </Button>
      </div>
    </>
  )
}

