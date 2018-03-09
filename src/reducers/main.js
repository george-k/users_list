import {
  USER_CLEAR,
  USER_FETCHED,
  USER_START_FETCHING,
  USERS_FETCHED,
  USERS_START_FETCHING,
} from '../actions/main';


const currentUserInitialState = {
  isfetched: false,
  isfetching: false,
  data: null,
};

export function currentUser(state = currentUserInitialState, action) {
  switch (action.type) {
    case USER_CLEAR:
      return currentUserInitialState;
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


export function users(state = {
  isfetched: false,
  isfetching: false,
  items: [],
}, action) {
  switch (action.type) {
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
