import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Score } from '../../types/models'

export const scoreSlice = createSlice({
  name: 'memory/score',
  initialState: { value: 0 },
  reducers: {
    setScore(state, action: PayloadAction<Score>) {
      return {
        ...state,
        ...action.payload
      }
    }
  }
})

export const { setScore } = scoreSlice.actions
export default scoreSlice.reducer