 import { configureStore } from '@reduxjs/toolkit'
import { projectsReducer, companiesReducer } from './reducers'


export const makeStore = () => {
  return configureStore({
    reducer: {
      companies: companiesReducer,
      projects: projectsReducer
    },
    // Adding the listener middleware to the store
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
 