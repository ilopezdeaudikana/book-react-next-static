import { HYDRATE } from 'next-redux-wrapper'
import { LOAD_COMPANIES_SUCCESS } from '../sagas/companies.saga'
import { Company, Action } from '../models'

export const companiesReducer = (state: Company[] = [], action: Action) => {
  if (!action.payload) return state

  switch (action.type) {
    case HYDRATE:
      return action.payload.companies ? [...action.payload.companies] : [...state]
    case LOAD_COMPANIES_SUCCESS:
      return action.payload && Array.isArray(action.payload)
        ? [...action.payload]
        : [...state]

    default:
      return [...state]
  }
}
