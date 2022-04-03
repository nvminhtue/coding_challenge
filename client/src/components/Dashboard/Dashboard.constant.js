import keyMirror from 'fbjs/lib/keyMirror';

export const ActionTypes = keyMirror({
  UPLOAD_CSV: undefined,
  FETCH_SEARCH: undefined,
  SAVE_SEARCH_INFO: undefined,
});

export const SearchStatus = {
  Pending: 0,
  Success: 1,
  Fail: 2,
}

export const PagyConstant = {
  PageItems: 15,
  FirstPage: 1,
}
