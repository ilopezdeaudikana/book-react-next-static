import { createSlice } from '@reduxjs/toolkit'
import { ProjectDetail, Status } from '../../app/types'

export interface ProjectState {
  value: ProjectDetail
  status: Status
}

const initialState: ProjectState = {
  value: {} as ProjectDetail,
  status: Status.Idle
}

export const projectSlice = createSlice({
  name: 'Project',
  initialState,
  reducers: {
    hydrate: (state, action) => {
      state.value = action.payload
      state.status = Status.Succeeded
    }
  },
})

export default projectSlice.reducer
