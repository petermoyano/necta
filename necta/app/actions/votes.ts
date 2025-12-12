'use server'

import { promises as fs } from 'fs'
import path from 'path'
import type { PrizeSlug, VotesData } from '@/app/lib/types'

const VOTES_FILE = path.join(process.cwd(), 'data', 'votes.json')

async function readVotes(): Promise<VotesData> {
  try {
    const data = await fs.readFile(VOTES_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return {
      'mejor-companero': {},
      'voz-del-equipo': {},
      'salva-el-dia': {}
    }
  }
}

async function writeVotes(votes: VotesData): Promise<void> {
  await fs.writeFile(VOTES_FILE, JSON.stringify(votes, null, 2))
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

