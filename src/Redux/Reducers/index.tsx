// import { combineReducers } from 'redux';
// import userReducer from './userReducer';
// export default combineReducers({
//     userResponse: userReducer
// });


import { combineReducers } from 'redux';
// import { feedReducer } from './feed.reducer';
// import { storiesReducer } from './stories.reducer'
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
    userResponse: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;