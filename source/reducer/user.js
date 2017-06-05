/**
 * Created by kim on 2017/6/2.
 */

import * as types from "../constant/actionType";

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
      return Object.assign({}, state, {
        res: action.res,
        loading: false,
        login: true
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
    default:
      return state;
  }
}