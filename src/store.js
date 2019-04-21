import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './app/reducers/';

export const history = createHashHistory();
const rootReducer = createRootReducer(history);

export const configureStore = () => {
  const initialState = {};
  const middleware = [thunk, routerMiddleware(history)];
  const composedMiddleware = compose(applyMiddleware(...middleware));
  return createStore(
    rootReducer,
    initialState,
    composedMiddleware,
  );
};
