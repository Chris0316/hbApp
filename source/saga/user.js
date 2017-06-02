/**
 * Created by kim on 2017/6/2.
 */
import {call, fork, put, take} from "redux-saga/effects";
import {request} from "../common/request";
import {doLogin, resLogin} from "../action/user";
import * as types from "../constant/actionType";

export function* login(loginId, password) {
  try {
    yield put(doLogin());
    const res = yield call(request, 'http://10.0.31.109:8080/react/auth', 'post', {
      loginId, password
    });
    const res2 = yield call(request, 'http://10.0.31.109:8080/react/common', 'get');
    console.log('res', res, res2)
    yield put(resLogin(res, res2))
  } catch (err) {
    yield put(resLogin(err))
  }
}


export function* watchUserReq() {
  while (true) {
    const {loginId, password} = yield take(types.REQ_LOGIN);
    yield fork(
      login,
      loginId,
      password
    );
  }
}


