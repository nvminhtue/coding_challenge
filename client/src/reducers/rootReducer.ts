import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  // reducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
