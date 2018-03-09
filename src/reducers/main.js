import {
  USER_CLEAR,
  USER_FETCH_FAILED,
  USER_FETCHED,
  USER_START_FETCHING,
  USERS_FETCH_FAILED,
  USERS_FETCHED,
  USERS_START_FETCHING,
} from '../actions/main';


const currentUserInitialState = {
  isFetchFailed: false,
  isFetched: false,
  isFetching: false,
  data: null,
};

export function currentUser(state = currentUserInitialState, action) {
  switch (action.type) {
    case USER_CLEAR:
      return currentUserInitialState;
    case USER_FETCH_FAILED:
      return Object.assign({}, currentUserInitialState, {
        isFetchFailed: true,
      });
    case USER_FETCHED:
      return Object.assign({}, state, {
        isFetched: true,
        isFetching: false,
        data: action.payload.data,
      });
    case USER_START_FETCHING:
      return Object.assign({}, state, {
        isFetched: false,
        isFetching: true,
      });
    default:
      return state;
  }
}


const usersInitialState = {
  isFetchFailed: false,
  isFetched: false,
  isFetching: false,
  items: null,
};

export function users(state = usersInitialState, action) {
  switch (action.type) {
    case USERS_FETCH_FAILED:
      return Object.assign({}, usersInitialState, {
        isFetchFailed: true,
      });
    case USERS_FETCHED:
      return Object.assign({}, state, {
        isFetched: true,
        isFetching: false,
        items: action.payload.items,
      });
    case USERS_START_FETCHING:
      return Object.assign({}, state, {
        isFetched: false,
        isFetching: true,
      });
    default:
      return state;
  }
}
