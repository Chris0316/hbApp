/**
 * Created by kim on 2017/6/6.
 */

import {call, fork, put, take} from "redux-saga/effects";
import Toast from "@remobile/react-native-toast";
import {addRes, fetchRes, removeRes} from "../action/todo";
import * as types from "../action/actionType";
import {leanCloud} from "../../service";

export function* add(text) {
  try {
    yield call(leanCloud.saveObject, 'Todo', {text});
    yield put(addRes());
    yield fetch();
  } catch (err) {
    yield put(addRes())
  }
}

export function* fetch() {
  try {
    let res = yield call(leanCloud.fetchObject, 'Todo');
    yield put(fetchRes(res));
  } catch (err) {
    yield put(fetchRes(err))
  }
}

export function* remove(objectId) {
  try {
    yield call(leanCloud.removeObj, 'Todo', objectId);
    yield put(removeRes());
    yield fetch();
  } catch (err) {
    yield put(removeRes());
    Toast.show(err.message);
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

export function* doRemove() {
  while (true) {
    const {objectId, callback} = yield take(types.TODO_REMOVE);
    yield fork(remove, objectId, callback);
  }
}

export default function* watch() {
  yield fork(doAdd);
  yield fork(doFetch);
  yield fork(doRemove);
}