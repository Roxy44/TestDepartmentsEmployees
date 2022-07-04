import { combineReducers} from '@reduxjs/toolkit';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { departmentReducer } from '../reducers/departmentReducer';
import { employeeReducer } from '../reducers/employeeReducer';
import rootSaga from '../saga';

const rootReducer = combineReducers({
  departments: departmentReducer,
  employees: employeeReducer,
})

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga)