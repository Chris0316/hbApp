/**
 *
 * Copyright 2016-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import {applyMiddleware, createStore} from "redux";
import createSagaMiddleware, {END} from "redux-saga";
const { logger } = require('redux-logger');
import rootReducer from "../reducer/index";

const middlewares = [];

// configuring saga middleware
const sagaMiddleware = createSagaMiddleware();

middlewares.push(sagaMiddleware);
if (__DEV__) {
  middlewares.push(logger);
}
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);
  // install saga run
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return store;
}
