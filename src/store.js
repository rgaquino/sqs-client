import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './app/reducers';

const initialState = {};

const middleware = [thunk];

const composedMiddleware = compose(applyMiddleware(...middleware));

const store = createStore(
  rootReducer,
  initialState,
  composedMiddleware,
);

export default store;
