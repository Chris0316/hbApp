/**
 * Created by kim on 2017/6/2.
 */
import {call, fork, put, take} from "redux-saga/effects";
import {request} from "../common/request";
import {loginRes, logoutRes} from "../action/user";
import * as types from "../constant/actionType";

export function* login(loginId, password) {
  try {
    const res = yield call(request, 'http://10.0.31.109:8080/react/auth', 'post', {
      loginId, password
    });
    yield put(loginRes(res))
  } catch (err) {
    yield put(loginRes(err))
  }
}

export function* logout() {
  try {
    yield call(request, 'http://10.0.31.109:8080/react/logout', 'post');
    yield put(logoutRes(res))
  } catch (err) {
    yield put(logoutRes(err))
  }
}

export function* doLogin() {
  while (true) {
    const {loginId, password} = yield take(types.LOGIN);
    yield fork(login, loginId, password);
  }
}

export function* doLogout() {
  while (true) {
    yield take(types.LOGOUT);
    yield fork(logout);
  }
}


export default function* watch() {
  yield fork(doLogout)
  yield fork(doLogin)
}


