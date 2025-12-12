'use server'

import { kv } from '@vercel/kv'
import type { PrizeSlug, VotesData } from '@/app/lib/types'

// Keys for storing votes in KV
const VOTES_KEY = 'necta:votes'

async function readVotes(): Promise<VotesData> {
  try {
    const votes = await kv.get<VotesData>(VOTES_KEY)
    return votes || {
      'mejor-companero': {},
      'voz-del-equipo': {},
      'salva-el-dia': {}
    }
  } catch (error) {
    console.error('Error reading votes from KV:', error)
    return {
      'mejor-companero': {},
      'voz-del-equipo': {},
      'salva-el-dia': {}
    }
  }
}

async function writeVotes(votes: VotesData): Promise<void> {
  await kv.set(VOTES_KEY, votes)
}

export async function submitVote(prizeSlug: PrizeSlug, employeeName: string): Promise<{ success: boolean; error?: string }> {
  try {
    const votes = await readVotes()
    const normalizedName = employeeName.toUpperCase().trim()
    
    if (!votes[prizeSlug]) {
      votes[prizeSlug] = {}
    }
    
    votes[prizeSlug][normalizedName] = (votes[prizeSlug][normalizedName] || 0) + 1
    
    await writeVotes(votes)
    
    return { success: true }
  } catch (error) {
    console.error('Error submitting vote:', error)
    return { success: false, error: 'No se pudo registrar el voto' }
  }
}

export async function getVotes(): Promise<VotesData> {
  return readVotes()
}

export async function getVotesForPrize(prizeSlug: PrizeSlug): Promise<Record<string, number>> {
  const votes = await readVotes()
  return votes[prizeSlug] || {}
}

export async function clearAllVotes(): Promise<{ success: boolean; error?: string }> {
  try {
    const emptyVotes: VotesData = {
      'mejor-companero': {},
      'voz-del-equipo': {},
      'salva-el-dia': {}
    }
    await writeVotes(emptyVotes)
    return { success: true }
  } catch (error) {
    console.error('Error clearing votes:', error)
    return { success: false, error: 'No se pudieron limpiar los votos' }
  }
}
