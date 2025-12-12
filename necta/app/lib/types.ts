export type PrizeSlug = 'mejor-companero' | 'voz-del-equipo' | 'salva-el-dia'

export interface Prize {
  slug: PrizeSlug
  title: string
  description: string
  emoji: string
}

export interface VotesData {
  'mejor-companero': Record<string, number>
  'voz-del-equipo': Record<string, number>
  'salva-el-dia': Record<string, number>
}

export const PRIZES: Prize[] = [
  {
    slug: 'mejor-companero',
    title: 'Mejor Compañero del Año',
    description: 'Para ese ser que siempre está cuando lo necesitás',
    emoji: '🤝'
  },
  {
    slug: 'voz-del-equipo',
    title: 'La Voz del Equipo',
    description: 'Para ese ser que nunca deja que el día se vuelva aburrido',
    emoji: '🎤'
  },
  {
    slug: 'salva-el-dia',
    title: 'El que te salva el día',
    description: 'Para esa persona que aparece justo a tiempo',
    emoji: '🦸'
  }
]

export function getPrizeBySlug(slug: string): Prize | undefined {
  return PRIZES.find(p => p.slug === slug)
}

