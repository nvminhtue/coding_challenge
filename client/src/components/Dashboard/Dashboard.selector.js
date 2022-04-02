import { createSelector } from 'reselect';

const selector = (state) => state.dashboardReducer;

export const searchInfoSelector = createSelector(
  selector,
  ({ pagyInfo, searchItems }) => ({ pagyInfo, searchItems }),
);
