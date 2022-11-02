import { createStore, applyMiddleware, Store } from 'redux';
import { createWrapper, Context } from 'next-redux-wrapper';
import createSagaMiddleware, { Task, SagaMiddlewareOptions } from 'redux-saga';
import { combineReducers } from 'redux';
import { companiesReducer } from './reducers/companies.reducer';
import {
  currentProjectReducer,
  projectsReducer,
} from './reducers/projects.reducer';
import companiesSaga from './sagas/companies.saga';
import projectsSaga from './sagas/projects.saga';

const rootReducer = combineReducers({
  projects: projectsReducer,
  currentProject: currentProjectReducer,
  companies: companiesReducer,
});

export type State = ReturnType<typeof rootReducer>;

export interface SagaStore extends Store<State> {
  companiesTask?: Task;
  projectsTask?: Task;
}

export const makeStore: any = (context: Context) => {

  const sagaMiddleware = createSagaMiddleware();
  const enhancers = applyMiddleware(sagaMiddleware);
  const store = createStore(rootReducer, enhancers);


  (store as SagaStore).companiesTask = sagaMiddleware.run(companiesSaga);
  (store as SagaStore).projectsTask = sagaMiddleware.run(projectsSaga);

  return store;
};

export const wrapper = createWrapper<Store<State>>(makeStore, { debug: process.env.NODE_ENV !== 'production' });


