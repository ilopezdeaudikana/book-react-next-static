import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Company, Status } from '../../app/types'

export interface CompaniesState {
  value: Company[]
  status: Status
}

const initialState: CompaniesState = {
  value: [],
  status: Status.Idle,
}

export const companiesSlice = createSlice({
  name: 'Companies',
  initialState,
  reducers: {
    hydrate: (state, action) => {
      state.value = action.payload
      state.status = Status.Succeeded
    }
  },
})

export default companiesSlice.reducer
