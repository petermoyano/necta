'use client'

interface WordCloudProps {
  votes: Record<string, number>
  title: string
  emoji: string
}

export function WordCloud({ votes, title, emoji }: WordCloudProps) {
  const entries = Object.entries(votes).sort((a, b) => b[1] - a[1])
  
  if (entries.length === 0) {
    return (
      <div className="bg-purple-700/80 border-2 border-purple-400/40 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{emoji}</span>
          <h2 className="text-xl font-semibold text-purple-200">{title}</h2>
        </div>
        <p className="text-purple-300/60 text-center py-8">
          Todavía no hay votos en esta categoría
        </p>
      </div>
    )
  }

  const maxVotes = entries[0][1]
  const minVotes = entries[entries.length - 1][1]
  
  // Find all winners (tied for first place)
  const winners = entries.filter(([, count]) => count === maxVotes)
  
  // Calculate font size range (min 14px, max 48px)
  const minFontSize = 14
  const maxFontSize = 48
  
  function getFontSize(voteCount: number): number {
    if (maxVotes === minVotes) return maxFontSize
    const ratio = (voteCount - minVotes) / (maxVotes - minVotes)
    return minFontSize + ratio * (maxFontSize - minFontSize)
  }

  const totalVotes = entries.reduce((sum, [, count]) => sum + count, 0)

  return (
    <div className="bg-purple-700/80 border-2 border-purple-400/40 rounded-2xl p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{emoji}</span>
          <h2 className="text-xl font-semibold text-purple-200">{title}</h2>
        </div>
        <span className="text-sm text-purple-300/70">
          {totalVotes} voto{totalVotes !== 1 ? 's' : ''}
        </span>
      </div>
      
      <div className="flex flex-wrap gap-x-4 gap-y-2 items-center justify-center min-h-[120px]">
        {entries.map(([name, count]) => {
          const fontSize = getFontSize(count)
          const isWinner = count === maxVotes
          
          return (
            <span
              key={name}
              className={`transition-all duration-300 hover:scale-110 cursor-default ${
                isWinner 
                  ? 'text-yellow-300 font-bold animate-pulse drop-shadow-[0_0_20px_rgba(253,224,71,0.6)]' 
                  : 'text-purple-200/80 hover:text-purple-200'
              }`}
              style={{ 
                fontSize: `${fontSize}px`,
                lineHeight: 1.2
              }}
              title={`${name}: ${count} voto${count !== 1 ? 's' : ''}`}
            >
              {name}
            </span>
          )
        })}
      </div>

      {/* Winner highlight with animation */}
      <div className="mt-6 pt-4 border-t border-purple-500/30">
        <div className="relative flex flex-col items-center justify-center gap-3">
          {/* Animated background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/10 to-yellow-500/0 rounded-xl animate-pulse" />
          
          {/* Trophy animation */}
          <div className="relative">
            <span className="text-4xl animate-bounce inline-block">🏆</span>
            {/* Sparkles */}
            <span className="absolute -top-1 -left-2 text-xs animate-ping">✨</span>
            <span className="absolute -top-2 -right-1 text-xs animate-ping" style={{ animationDelay: '0.3s' }}>✨</span>
            <span className="absolute -bottom-1 left-0 text-xs animate-ping" style={{ animationDelay: '0.6s' }}>✨</span>
          </div>
          
          {/* Winner name(s) */}
          <div className="relative flex flex-wrap justify-center gap-2">
            {winners.map(([name, count], index) => (
              <div 
                key={name}
                className="flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 via-yellow-400/30 to-yellow-500/20 px-4 py-2 rounded-full border border-yellow-400/40"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="font-bold text-yellow-200 text-lg tracking-wide">
                  {name}
                </span>
                <span className="text-yellow-300/70 text-sm">
                  ({count} voto{count !== 1 ? 's' : ''})
                </span>
              </div>
            ))}
          </div>
          
          {/* Confetti effect - decorative dots */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-float opacity-60" />
            <div className="absolute top-2 right-1/4 w-1.5 h-1.5 bg-purple-300 rounded-full animate-float opacity-60" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-2 left-1/3 w-1 h-1 bg-yellow-300 rounded-full animate-float opacity-60" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-0 right-1/3 w-2 h-2 bg-purple-400 rounded-full animate-float opacity-60" style={{ animationDelay: '0.7s' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
