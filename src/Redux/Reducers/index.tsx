import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { markeReducer } from './markeReduces';
export const rootReducer = combineReducers({
    userResponse: userReducer,
    markeResponse: markeReducer
});

export type RootState = ReturnType<typeof rootReducer>;