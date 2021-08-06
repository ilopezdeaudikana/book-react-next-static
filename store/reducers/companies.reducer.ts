import { HYDRATE } from 'next-redux-wrapper';
import { LOAD_COMPANIES_SUCCESS } from '../sagas/companies.saga';
import { Company, Action } from '../models';

export const companiesReducer = (state: Company[] = [], action: Action) => {
  switch (action.type) {
    case HYDRATE:
      return [...action.payload.companies]
    case LOAD_COMPANIES_SUCCESS:
      return [...action.payload];

    default:
      return state;
  }
};
