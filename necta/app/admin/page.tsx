import Image from 'next/image'
import { getVotes } from '@/app/actions/votes'
import { PRIZES } from '@/app/lib/types'
import { WordCloud } from '@/app/components/word-cloud'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AdminPage() {
  const votes = await getVotes()
  
  const totalVotes = Object.values(votes).reduce(
    (sum, prizeVotes) => sum + Object.values(prizeVotes).reduce((s, c) => s + c, 0),
    0
  )

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-950 via-purple-900 to-purple-950 px-4 py-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-purple-200/70 hover:text-purple-300 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Volver a votar
          </Link>
          
          <a 
            href="/admin"
            className="flex items-center gap-2 text-purple-200/70 hover:text-purple-300 transition-colors text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
              <path d="M3 3v5h5"/>
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
              <path d="M16 16h5v5"/>
            </svg>
            Actualizar
          </a>
        </div>

        {/* Title */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image
              src="/logo-necta.jpeg"
              alt="Necta Logo"
              width={60}
              height={60}
              className="rounded-full"
            />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-200 via-purple-400 to-purple-200 bg-clip-text text-transparent">
              Resultados en Vivo
            </h1>
          </div>
          <p className="text-purple-200/80">
            Premios Necta 2024 — {totalVotes} voto{totalVotes !== 1 ? 's' : ''} registrado{totalVotes !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Word clouds */}
        <div className="grid gap-6">
          {PRIZES.map((prize) => (
            <WordCloud
              key={prize.slug}
              votes={votes[prize.slug]}
              title={prize.title}
              emoji={prize.emoji}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-purple-300/60 text-sm">
            Los resultados se actualizan al recargar la página
          </p>
        </div>
      </div>
    </main>
  )
}


