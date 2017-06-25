/**
 * Created by kim on 2017/6/6.
 */

import * as types from "../action/actionType";

const initialState = {
  loading: false,
  saving: false
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case types.TODO_ADD:
      let ret = Object.assign({}, state, {
        saving: true
      });
      return ret;
    case types.TODO_ADD_RES:
      return Object.assign({}, state, {
        saving: false
      });
    case types.TODO_FETCH:
      return Object.assign({}, state, {
        loading: true
      });
    case types.TODO_FETCH_RES:
      return Object.assign({}, state, {
        todos: action.todos,
        loading: false
      });
    default:
      return state;
  }
}