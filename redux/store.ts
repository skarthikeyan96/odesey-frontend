import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "./user.slice";
import { persistReducer, persistStore } from 'redux-persist';

export const saveState = (state:any) => {
  try {
    const serialState = JSON.stringify(state);
    localStorage.setItem('app', serialState);
  } catch(err) {
      console.log(err);
  }
};

export const loadState = (state: string) => {
  try {
    const serialState = localStorage.getItem("app");
    if (serialState === null) {
      return undefined;
    }
    return JSON.parse(serialState);
  } catch (err) {
    return undefined;
  }
};

const persistedState:any = loadState('user');


const reducer = {
  user: UserReducer,
};


const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
  // preloadedState: persistedState
});

// store.subscribe(() => saveState({
//   user: store.getState().user

// }))

export default store;