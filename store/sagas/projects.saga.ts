import { call, put, takeLatest, all } from 'redux-saga/effects';
import { Action, Project, ProjectDetail } from '../models';
import data from '../../data';


export const PROJECTS_FETCH_SUCCEEDED = 'PROJECTS_FETCH_SUCCEEDED';
export const PROJECTS_FETCH_REQUESTED = 'PROJECTS_FETCH_REQUESTED';
export const PROJECT_FETCH_SUCCEEDED = 'PROJECT_FETCH_SUCCEEDED';
export const PROJECT_FETCH_REQUESTED = 'PROJECT_FETCH_REQUESTED';
export const PROJECTS_FETCH_FAILED = 'PROJECTS_FETCH_FAILED';
export const PROJECT_FETCH_FAILED = 'PROJECT_FETCH_FAILED';


export function* fetchProjects() {
  try {
    const response: Project[] = data.projects;
    yield put({ type: PROJECTS_FETCH_SUCCEEDED, payload: response });
  } catch (e) {
    console.log(e);
    yield put({ type: PROJECTS_FETCH_FAILED, message: e.message });
  }
}

export function* fetchProject(action: Action) {
  try {
    const response: ProjectDetail = data.records.find(record => record.projectId === action.payload);
    yield put({ type: PROJECT_FETCH_SUCCEEDED, payload: response });
  } catch (e) {
    console.log(e);
    yield put({ type: PROJECT_FETCH_FAILED, message: e.message });
  }
}


/*
  Starts fetch* on each dispatched `*_FETCH_REQUESTED` action.
  Allows concurrent fetches.
*/
function* projectsSaga() {
  yield all([
    takeLatest(PROJECTS_FETCH_REQUESTED, fetchProjects),
    takeLatest(PROJECT_FETCH_REQUESTED, fetchProject),
  ]);
}

export default projectsSaga;
