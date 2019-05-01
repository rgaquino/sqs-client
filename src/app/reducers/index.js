import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import queueReducer from './queueReducer';
import errorReducer from './errorReducer';
import messageReducer from './messageReducer';

export default function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    error: errorReducer,
    queue: queueReducer,
    message: messageReducer,
  });
}
