import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import queueReducer from './queueReducer';
import errorReducer from './errorReducer';

export default function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    error: errorReducer,
    queue: queueReducer,
  });
}
