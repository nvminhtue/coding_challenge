import { createSelector } from 'reselect';

const selector = (state) => state.authReducer;

export const userInfoSelector = createSelector(
  selector,
  ({ userId, username }) => ({ userId, username }),
);
