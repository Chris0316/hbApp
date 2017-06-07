/**
 * Created by kim on 2017/6/2.
 */

import {combineReducers} from "redux";
import user from "./user";
import todo from "./todo";

const rootReducer = combineReducers({
  user,
  todo
});

export default rootReducer;