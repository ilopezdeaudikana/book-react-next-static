import { createSlice } from '@reduxjs/toolkit'
import { Project, Status } from '../../app/types'

export interface ProjectsState {
  value: Project[]
  status: Status
}

const initialState: ProjectsState = {
  value: [],
  status: Status.Idle,
}

export const projectsSlice = createSlice({
  name: 'Projects',
  initialState,

  reducers: {
    hydrate: (state, action) => {
      state.value = action.payload
      state.status = Status.Succeeded
    }
  },
})

export const { hydrate } = projectsSlice.actions

export default projectsSlice.reducer
