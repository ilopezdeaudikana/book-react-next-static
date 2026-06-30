import { create } from 'zustand'
import type { Card } from '../types/models'

interface SelectedCard {
  id: number
  value: number
}

export interface CardStore {
  list: Card[]
  paired: Card[]
  visible: SelectedCard[]
  isAnimationOn: boolean
  setCards: (list: Card[]) => void
  selectCard: (card: SelectedCard) => void
  resetVisibleCards: () => void
  resetCards: () => void
  toggleAnimation: (isOn: boolean) => void
}

export const useCards = create<CardStore>(set => ({
  list: [],
  paired: [],
  visible: [],
  isAnimationOn: false,
  setCards: (list: Card[]) => set(() => ({ list })),
  selectCard: (card: SelectedCard) => set((state) => {
    const newPair =
      state.visible.length && state.visible[0].value === card.value
        ? [state.visible[0], card]
        : []
    return {
      ...state,
      visible: newPair.length ? [] : state.visible.concat(card),
      paired: state.paired.concat(newPair)
    }
  }),
  resetVisibleCards: () => set((state) => {
    return {
      ...state,
      visible: [],
      isAnimationOn: false
    }
  }),
  resetCards: () => set((state) => {
    return {
      ...state,
      visible: [],
      isAnimationOn: false,
      paired: []
    }
  }),
  toggleAnimation: (isOn: boolean) => set((state) => {
    return {
      ...state,
      isAnimationOn: isOn
    }
  })
}))

