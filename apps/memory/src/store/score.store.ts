import { create } from 'zustand'
import type { Score } from '../types/models'

interface ScoreStore {
  value: number,
  moves: number,
  setScore: (score: Partial<Score>) => void
}

export const useScore = create<ScoreStore>(set => ({
  value: 0,
  moves: 0,
  setScore: (score: Partial<Score>) => set((state: Score) => {
    return {
      ...state,
      ...score
    }
  })
}))
