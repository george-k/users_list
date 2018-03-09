export const USER_FETCH = 'USER_FETCH';
export const USER_FETCH_FAILED = 'USER_FETCH_FAILED';
export const USER_FETCHED = 'USER_FETCHED';
export const USER_START_FETCHING = 'USER_START_FETCHING';

export const USERS_FETCH = 'USERS_FETCH';
export const USERS_FETCH_FAILED = 'USERS_FETCH_FAILED';
export const USERS_FETCHED = 'USERS_FETCHED';
export const USERS_START_FETCHING = 'USERS_START_FETCHING';


export function fetchUser(userId) {
  return {type: USER_FETCH, payload: {userId}};
}

export function userFetched(data) {
  return {type: USER_FETCHED, payload: {data}};
}

export function fetchUsers() {
  return {type: USERS_FETCH};
}

export function usersFetched(items) {
  return {type: USERS_FETCHED, payload: {items}};
}
