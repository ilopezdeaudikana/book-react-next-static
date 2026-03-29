import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Card } from '../../types/models'
interface SelectedCard {
  id: number
  value: number
}

export interface CardsSlice {
  list: Card[]
  paired: Card[]
  visible: SelectedCard[]
  isAnimationOn: boolean
}
const initialState: CardsSlice = {
  list: [],
  paired: [],
  visible: [],
  isAnimationOn: false
}
const cardsSlice = createSlice({
  name: 'memory/cards',
  initialState,
  reducers: {
    setCards(state, action: PayloadAction<Card[]>) {
      state.list = action.payload
    },
    selectCard(state, action: PayloadAction<SelectedCard>) {
      const newPair =
        state.visible.length && state.visible[0].value === action.payload.value
          ? [state.visible[0], action.payload]
          : []
      return {
        ...state,
        visible: newPair.length ? [] : state.visible.concat(action.payload),
        paired: state.paired.concat(newPair)
      }
    },
    resetVisibleCards(state) {
      return {
        ...state,
        visible: [],
        isAnimationOn: false
      }
    },
    resetCards(state) {
      return {
        ...state,
        visible: [],
        isAnimationOn: false,
        paired: []
      }
    },
    toggleAnimation(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        isAnimationOn: action.payload
      }
    }
  }
})

export const { setCards, selectCard, resetVisibleCards, resetCards, toggleAnimation } = cardsSlice.actions
export default cardsSlice.reducer
