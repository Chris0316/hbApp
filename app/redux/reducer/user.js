/**
 * Created by kim on 2017/6/2.
 */

import * as types from "../action/actionType";

const initialState = {
  loading: false
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN:
      return Object.assign({}, state, {
        loading: true,
        login: false,
        res: {}
      });
    case types.LOGIN_RES:
      let res = action.res;
      let login = false;
      if (res.code === 0 && res.isSuc === true) {
        login = true
      }
      return Object.assign({}, state, {
        res: action.res,
        loading: false,
        login: login
      });
    case types.LOGOUT:
      return Object.assign({}, state, {
        loading: true,
        login: true
      });
    case types.LOGOUT_RES:
      return Object.assign({}, state, {
        loading: false,
        login: false
      });
    case types.REFRESH_TOKEN:
      return Object.assign({}, state);
    default:
      return state;
  }
}