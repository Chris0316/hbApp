/**
 * Created by kim on 2017/6/6.
 */

import * as types from "../action/actionType";

const initialState = {
  loading: true,
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
      let isEmpty = action.todos.length === 0;
      return Object.assign({}, state, {
        todos: action.todos,
        loading: false,
        isEmpty
      });
    case types.TODO_REMOVE:
      return Object.assign({}, state, {
        loading: true
      });
    case types.TODO_REMOVE_RES:
      return Object.assign({}, state, {
        loading: false
      });
    case types.TODO_EDIT:
      return Object.assign({}, state, {
        loading: true
      });
    case types.TODO_EDIT_RES:
      return Object.assign({}, state, {
        loading: false
      });
    case types.TODO_FETCH_MORE:
      return Object.assign({}, state, {
        loadingMore: action.pageNo > 1,
        loading: action.pageNo === 1,
        noMore: false,
        type: types.TODO_FETCH_MORE
      });
    case types.TODO_FETCH_MORE_RES:
      return Object.assign({}, state, {
        batch: action.batch,
        count: action.count,
        loadingMore: false,
        loading: false,
        noMore: action.batch.length < action.pageSize,
        type: types.TODO_FETCH_MORE_RES
      });
    default:
      return state;
  }
}