/**
 * Created by kim on 2017/6/6.
 */

import * as types from "./actionType";

export function add(text) {
  return {
    type: types.TODO_ADD,
    text
  }
}

export function addRes() {
  return {
    type: types.TODO_ADD_RES
  }
}

export function fetch() {
  return {
    type: types.TODO_FETCH
  }
}

export function fetchRes(todos) {
  return {
    type: types.TODO_FETCH_RES,
    todos
  }
}