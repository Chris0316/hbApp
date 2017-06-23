/**
 * Created by kim on 2017/6/2.
 */
import * as types from "./actionType";

export function login(loginId, password, callback) {
  return {
    type: types.LOGIN,
    loginId,
    password,
    callback: callback
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

export function refreshToken() {
  return {
    type: types.REFRESH_TOKEN
  }
}