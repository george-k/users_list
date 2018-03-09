/* global fetch */
import {all, call, put, select, takeLatest} from 'redux-saga/effects';

import {
  userFetched,
  usersFetched,
  USER_FETCH,
  USER_FETCH_FAILED,
  USER_START_FETCHING,
  USERS_FETCH,
  USERS_FETCH_FAILED,
  USERS_START_FETCHING,
} from 'actions/main';

import {
  currentUserFetchStateSelector,
  usersFetchStateSelector,
  usersSelector,
} from 'selectors/main';


export function* fetchUserDetails(action) {
  try {
    const {payload: {userId}} = action;

    // Check is user already fetched to whole list and return it if yes
    const existingUsers = yield select(usersSelector);
    const currentUser = existingUsers.find(({id})=> String(id) === userId);
    if (currentUser) {
      yield put(userFetched(currentUser));
      return;
    }

    const {isFetched, isFetching} = yield select(currentUserFetchStateSelector);
    if (isFetching || isFetched) {
      return;
    }
    yield put({type: USER_START_FETCHING});
    const data = yield call(()=> new Promise((resolve, reject)=> {
      fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`,
      ).then((response)=> response.json().then(
        (responseData)=> resolve(responseData),
      ).catch(reject)).catch(reject);
    }));
    yield put(userFetched(data));
  } catch (error) {
    yield put({type: USER_FETCH_FAILED});
  }
}

export function* fetchUsersList() {
  try {
    const {isFetched, isFetching} = yield select(usersFetchStateSelector);
    if (isFetching || isFetched) {
      return;
    }
    yield put({type: USERS_START_FETCHING});
    const users = yield call(()=> new Promise((resolve, reject)=> {
      fetch(
        'https://jsonplaceholder.typicode.com/users',
      ).then((response)=> response.json().then(
        (data)=> resolve(data),
      ).catch(reject)).catch(reject);
    }));
    yield put(usersFetched(users));
  } catch (error) {
    yield put({type: USERS_FETCH_FAILED});
  }
}

export function* fetchUser() {
  yield takeLatest(USER_FETCH, fetchUserDetails);
}

export function* fetchUsers() {
  yield takeLatest(USERS_FETCH, fetchUsersList);
}

export default function* rootSaga() {
  yield all([
    fetchUser(),
    fetchUsers(),
  ]);
}
