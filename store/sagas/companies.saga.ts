import { put, takeLatest, all } from 'redux-saga/effects';
import data from '../../data';

import { Company } from '../models';

export const LOAD_COMPANIES_SUCCESS = 'LOAD_COMPANIES_SUCCESS';
export const COMPANIES_FETCH_REQUESTED = 'COMPANIES_FETCH_REQUESTED';
export const COMPANIES_FETCH_FAILED = 'COMPANIES_FETCH_FAILED';


export function* fetchCompanies() {
  try {
    const response: Company[] = data.companies;// yield call(getCompanies);
    yield put({ type: LOAD_COMPANIES_SUCCESS, payload: response });
  } catch (e) {
    console.log(e);
    yield put({ type: COMPANIES_FETCH_FAILED, message: e.message });
  }
}

/*
  Starts fetch* on each dispatched `*_FETCH_REQUESTED` action.
  Allows concurrent fetches.
*/
function* companiesSaga() {
  yield all([
    takeLatest(COMPANIES_FETCH_REQUESTED, fetchCompanies),
  ]);
}

export default companiesSaga;
