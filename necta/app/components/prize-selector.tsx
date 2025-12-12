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
          className="group relative overflow-hidden rounded-2xl border-2 border-purple-300/40 bg-gradient-to-br from-purple-700/90 to-purple-800/90 backdrop-blur-sm p-6 transition-all duration-300 hover:border-purple-300/60 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-[1.02]"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          
          <div className="relative flex items-start gap-4">
            <span className="text-4xl">{prize.emoji}</span>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-purple-100 group-hover:text-purple-50 transition-colors">
                {prize.title}
              </h3>
              <p className="mt-1 text-sm text-purple-200/70 group-hover:text-purple-200 transition-colors">
                {prize.description}
              </p>
            </div>
            <div className="text-purple-400/50 group-hover:text-purple-300 transition-colors">
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


