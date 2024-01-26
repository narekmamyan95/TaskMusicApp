import { combineReducers } from "@reduxjs/toolkit";
import commonSlice from "./common/slice";

const rootReducer = combineReducers({
  common: commonSlice,
});

export default rootReducer;
