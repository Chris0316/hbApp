/**
 * Created by kim on 2017/6/6.
 */

import {call, fork, put, take} from "redux-saga/effects";
import {addRes, fetchRes} from "../action/todo";
import * as types from "../constant/actionType";
import {fetchObject, saveObject} from "../service/leanCloud";

export function* add(text) {
  try {
    yield call(saveObject, 'Todo', {text});
    yield put(addRes());
    yield fetch();
  } catch (err) {
    yield put(addRes())
  }
}

export function* fetch() {
  try {
    let res = yield call(fetchObject, 'Todo');
    yield put(fetchRes(res));
  } catch (err) {
    yield put(fetchRes(err))
  }
}

export function* doAdd() {
  while (true) {
    const {text} = yield take(types.TODO_ADD);
    yield fork(add, text);
  }
}

export function* doFetch() {
  while (true) {
    yield take(types.TODO_FETCH);
    yield fork(fetch);
  }
}

export default function* watch() {
  yield fork(doAdd);
  yield fork(doFetch);
}