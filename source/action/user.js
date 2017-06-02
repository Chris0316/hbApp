/**
 * Created by kim on 2017/6/2.
 */
import * as types from "../constant/actionType";

export function reqLogin(loginId, password) {
  console.log('reqLogin')
  return {
    type: types.REQ_LOGIN,
    loginId,
    password
  }
}

export function doLogin() {
  console.log('doLogin')
  return {
    type: types.DO_LOGIN
  }
}

export function resLogin(...res) {
  console.log('resLogin', res)
  return {
    type: types.RES_LOGIN,
    res
  }
}