import { LOAD_COMPANIES_SUCCESS } from '../sagas/companies.saga';
import { Company, Action } from '../models';

export const companiesReducer = (state: Company[] = [], action: Action) => {
  switch (action.type) {
    case LOAD_COMPANIES_SUCCESS:
      return [...action.payload];

    default:
      return state;
  }
};
