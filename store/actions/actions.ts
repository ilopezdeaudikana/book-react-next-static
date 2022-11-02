import {
  COMPANIES_FETCH_REQUESTED,
} from '../sagas/companies.saga';

import { PROJECTS_FETCH_REQUESTED, PROJECT_FETCH_REQUESTED }from '../sagas/projects.saga';

export const fetchCompanies = () => ({
  type: COMPANIES_FETCH_REQUESTED,
  payload: null,
});

export const fetchProjects = () => ({
  type: PROJECTS_FETCH_REQUESTED,
  payload: null,
});

export const fetchProject = (id: string) => ({
  type: PROJECT_FETCH_REQUESTED,
  payload: id,
});