import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { User } from '../../types/models'

export const userSlice = createSlice({
  name: 'memory/user',
  initialState: { id: 0, name: '' },
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      return {
        ...state,
        ...action.payload
      }
    }
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer