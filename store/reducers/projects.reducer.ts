import { HYDRATE } from 'next-redux-wrapper';
import { Action, Project, ProjectDetail } from '../models';
import {
  PROJECTS_FETCH_SUCCEEDED,
  PROJECT_FETCH_SUCCEEDED,
} from '../sagas/projects.saga';

export const projectsReducer = (
  state: Project[] = [],
  action: Action
): Project[] => {
  switch (action.type) {
    case HYDRATE:
      return [...action.payload.projects];
    case PROJECTS_FETCH_SUCCEEDED:
      return [...action.payload];
    default:
      return state;
  }
};

export const currentProjectReducer = (
  state: ProjectDetail = {} as ProjectDetail,
  action: Action
): ProjectDetail => {
  switch (action.type) {
    case HYDRATE:
      return { ...action.payload.currentProject };
    case PROJECT_FETCH_SUCCEEDED:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
