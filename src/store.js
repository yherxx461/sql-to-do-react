import { createStore, applyMiddleware, combineReducers } from 'redux';
import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('FETCH_ALL_TASKS', fetchAllTasks);
  yield takeEvery('ADD_NEW_TASK', addTask);
  yield takeEvery('UPDATE_STATUS', updateTaskComplete);
  yield takeEvery('DELETE_TASK', deleteTask);
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

// PUT
function* updateTaskComplete(action) {
  try {
    console.log('UPDATE_STATUS PAYLOAD:', action.payload);
    // Add new task
    yield axios.put(`/api/todo/${action.payload.id}`, action.payload);
    yield put({
      type: 'FETCH_ALL_TASKS',
    });
  } catch (error) {
    console.log('Error in updating task status:', error);
  }
}
// DELETE
function* deleteTask(action) {
  try {
    console.log('DELETE_TASK PAYLOAD:', action.payload);
    // Delete a task
    yield axios.delete(`/api/todo/${action.payload.id}`);
    yield put({
      type: 'FETCH_ALL_TASKS',
    });
  } catch (error) {
    console.log('Error in deleting task:', error);
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
