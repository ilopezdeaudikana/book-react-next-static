import { combineReducers, configureStore } from '@reduxjs/toolkit'
import cardsReducer from './slices/cards-slice'
import userReducer from './slices/user-slice'
import scoreReducer from './slices/score-slice'

const rootReducer = combineReducers({
  cards: cardsReducer,
  user: userReducer,
  score: scoreReducer
})
export type RootState = ReturnType<typeof rootReducer>

export const setupStore = (preloadedState?: RootState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export const store = setupStore()