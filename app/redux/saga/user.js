/**
 * Created by kim on 2017/6/2.
 */
import {call, fork, put, take} from "redux-saga/effects";
import {request, storage} from "../../service";
import {loginRes, logoutRes} from "../action/user";
import * as types from "../action/actionType";
import dataApi from "../../config/api";

export function* login(loginId, password) {
  try {
    const res = yield call(request, dataApi.user.auth, 'post', {
      loginId, password
    });
    if (res.isSuc) {
      yield call(storage.setItem, 'token', loginId);
    }
    yield put(loginRes(res));
  } catch (err) {
    yield put(loginRes(err))
  }
}

export function* logout() {
  try {
    yield call(request, dataApi.user.logout, 'post');
    yield call(storage.removeItem, 'token');
    yield put(logoutRes(res))
  } catch (err) {
    yield put(logoutRes(err))
  }
}

export function* refreshToken() {
  try {
    const token = yield call(storage.getItem, 'token');
    if (token) {
      yield login(token, '111111')
    }
  } catch (err) {
    console.log(err)
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

export function* doRefresh() {
  while (true) {
    yield take(types.REFRESH_TOKEN);
    yield fork(refreshToken);
  }
}


export default function* watch() {
  yield fork(doLogout)
  yield fork(doLogin)
  yield fork(doRefresh)
}


