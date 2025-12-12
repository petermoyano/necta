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
  
  // Calculate font size range (min 14px, max 48px)
  const minFontSize = 14
  const maxFontSize = 48
  
  function getFontSize(voteCount: number): number {
    if (maxVotes === minVotes) return maxFontSize
    const ratio = (voteCount - minVotes) / (maxVotes - minVotes)
    return minFontSize + ratio * (maxFontSize - minFontSize)
  }

  const winner = entries[0]
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
        {entries.map(([name, count], index) => {
          const fontSize = getFontSize(count)
          const isWinner = index === 0
          
          return (
            <span
              key={name}
              className={`transition-all duration-300 hover:scale-110 cursor-default ${
                isWinner 
                  ? 'text-purple-300 font-bold drop-shadow-[0_0_10px_rgba(196,181,253,0.5)]' 
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

      {/* Winner highlight */}
      <div className="mt-6 pt-4 border-t border-purple-800/50">
        <div className="flex items-center justify-center gap-2 text-purple-300">
          <span className="text-lg">👑</span>
          <span className="font-semibold">{winner[0]}</span>
          <span className="text-purple-300/70 text-sm">
            ({winner[1]} voto{winner[1] !== 1 ? 's' : ''})
          </span>
        </div>
      </div>
    </div>
  )
}


