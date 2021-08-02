import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { combineReducers } from 'redux';
import { companiesReducer } from './reducers/companies.reducer';
import { currentProjectReducer, projectsReducer } from './reducers/projects.reducer';
import companiesSaga from './sagas/companies.saga';
import projectsSaga from './sagas/projects.saga';

export const sagaMiddleware = createSagaMiddleware();
const enhancers = composeWithDevTools(applyMiddleware(sagaMiddleware));

const rootReducer = combineReducers({
  projects: projectsReducer,
  currentProject: currentProjectReducer,
  companies: companiesReducer,
});

export type State = ReturnType<typeof rootReducer>

export const configureStore = () => {
  return createStore(rootReducer, enhancers);
};

export const store = configureStore();
sagaMiddleware.run(companiesSaga);
sagaMiddleware.run(projectsSaga);
