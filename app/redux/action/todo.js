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

export function addRes(res) {
  return {
    type: types.TODO_ADD_RES,
    res
  }
}

export function edit(objectId, text, callback) {
  return {
    type: types.TODO_EDIT,
    objectId,
    text,
    callback
  }
}

export function editRes() {
  return {
    type: types.TODO_EDIT_RES
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


export function fetchMore(pageNo, pageSize) {
  return {
    type: types.TODO_FETCH_MORE,
    pageNo,
    pageSize
  }
}

export function fetchMoreRes(count, batch, pageSize) {
  return {
    type: types.TODO_FETCH_MORE_RES,
    count,
    batch,
    pageSize
  }
}

export function remove(objectId, callback) {
  return {
    type: types.TODO_REMOVE,
    objectId,
    callback
  }
}

export function removeRes() {
  return {
    type: types.TODO_REMOVE_RES
  }
}