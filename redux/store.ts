import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "./user.slice";

const reducer = {
  user: UserReducer,
};


const store = configureStore({
  reducer,
});


export default store;