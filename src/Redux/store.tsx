import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './Reducers';
import thunk from 'redux-thunk';

const middleware = applyMiddleware(thunk);

export const store = createStore(rootReducer, middleware);