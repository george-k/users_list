/* global fetch */
import {all, call, put, select, takeLatest} from 'redux-saga/effects';

import {
  userFetched,
  usersFetched,
  USER_FETCH,
  USERS_FETCH,
  USERS_FETCH_FAILED,
} from '../actions/main';

import {usersFetchStateSelector} from '../selectors/main';


export function* fetchUserDetails(action) {
  try {
    const {isFetched, isFetching} = select(usersFetchStateSelector);
    if (isFetching || isFetched) {
      return;
    }
    const {payload: {userId}} = action;
    const data = yield call(()=> new Promise((resolve, reject)=> {
      fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`,
      ).then((response)=> response.json().then(
        (responseData)=> resolve(responseData),
      ).catch(reject)).catch(reject);
    }));
    yield put(userFetched(data));
  } catch (error) {
    yield put({type: USERS_FETCH_FAILED});
  }
}

export function* fetchUsersList() {
  try {
    const {isFetched, isFetching} = select(usersFetchStateSelector);
    if (isFetching || isFetched) {
      return;
    }
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