/**
 * Created by kim on 2017/6/6.
 */

import * as types from "../action/actionType";

const initialState = {
  loading: true,
  saving: false,
  loadMore: false,
  noMore: false
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
        type: types.TODO_FETCH_MORE,
        loading: true,
        pageNo: action.pageNo,
        loadMore: action.pageNo > 1,
        noMore: false
      });
    case types.TODO_FETCH_MORE_RES:
      return Object.assign({}, state, {
        type: types.TODO_FETCH_MORE_RES,
        loading: false,
        pageNo: action.pageNo,
        batch: action.batch,
        count: action.count,
        loadMore: action.pageNo > 1,
        noMore: action.pageNo > 1 && action.batch.length < action.pageSize,
      });
    default:
      return state;
  }
}