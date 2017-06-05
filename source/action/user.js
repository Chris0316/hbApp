/**
 * Created by kim on 2017/6/2.
 */
import * as types from "../constant/actionType";

export function login(loginId, password) {
  return {
    type: types.LOGIN,
    loginId,
    password
  }
}

export function loginRes(res) {
  return {
    type: types.LOGIN_RES,
    res
  }
}

export function logout() {
  return {
    type: types.LOGOUT
  }
}

export function logoutRes() {
  return {
    type: types.LOGOUT_RES
  }
}