import { createStore, applyMiddleware, combineReducers } from 'redux';
import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('FETCH_ALL_TASKS', fetchAllTasks);
  yield takeEvery('ADD_NEW_TASK', addTask);
  // yield takeEvery('');
}

function* fetchAllTasks() {
  try {
    // Get the tasks:
    const tasksResponse = yield axios.get('/api/todo');
    // Set the value of the tasks reducer:
    yield put({
      type: 'SET_TASKS',
      payload: tasksResponse.data,
    });
  } catch (error) {
    console.log('fetchAllTasks error:', error);
  }
}

function* addTask(action) {
  try {
    // Add new task
    yield axios.post('/api/todo', action.payload);
    yield put({
      type: 'FETCH_ALL_TASKS',
    });
  } catch (error) {
    console.log('Error in adding new task:', error);
  }
}

// Create sagaMiddleWare
const sagaMiddleware = createSagaMiddleware();

// Used to store tasks returned from the server
const tasks = (state = [], action) => {
  switch (action.type) {
    case 'SET_TASKS':
      return action.payload;
    default:
      return state;
  }
};

// PUT

// DELETE

// Create one store that all components can be use
const storeInstance = createStore(
  combineReducers({
    tasks,
  }),

  //Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger)
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

export default storeInstance;
