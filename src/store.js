import { createStore, applyMiddleWare, combinedReducers } from 'redux';
import { logger } from 'redux-logger';

// Reducers

// Store Reducers
export const store = () =>
  createStore(
    combinedReducers({}),

    //Malware
    applyMiddleware(logger)
  );
