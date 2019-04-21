import { combineReducers } from 'redux';
import queueReducer from './queueReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  error: errorReducer,
  queue: queueReducer,
});
