/**
 * Created by kim on 2017/6/2.
 */

import * as types from "../constant/actionType";

const initialState = {
  loading: false
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case types.REQ_LOGIN:
      console.log(0, state)
      return Object.assign({}, state, {
        loading: true
      });
    case types.DO_LOGIN:
      console.log(1, state)
      return {
        ...state
      };
    case types.RES_LOGIN:
      console.log(2, state, action)
      return Object.assign({}, state, {
        hahah: 1234,
        loading: false
      });
    default:
      return state;
  }
}