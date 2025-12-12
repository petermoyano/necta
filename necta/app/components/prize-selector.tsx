'use client'

import Link from 'next/link'
import { PRIZES } from '@/app/lib/types'

export function PrizeSelector() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      {PRIZES.map((prize, index) => (
        <Link
          key={prize.slug}
          href={`/votar/${prize.slug}`}
          className="group relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/10 hover:scale-[1.02]"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          
          <div className="relative flex items-start gap-4">
            <span className="text-4xl">{prize.emoji}</span>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-amber-100 group-hover:text-amber-50 transition-colors">
                {prize.title}
              </h3>
              <p className="mt-1 text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
                {prize.description}
              </p>
            </div>
            <div className="text-amber-500/50 group-hover:text-amber-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

