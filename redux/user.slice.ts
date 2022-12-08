import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    user: {},
    
  },
  reducers: {
    logout: (state, action) => {
      return {
        ...state,
        isAuthenticated: false,
        user: action.payload
      };
    },
    login: (state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    },
  },
});

export const UserReducer = userSlice.reducer;

export const {
 login,
 logout
} = userSlice.actions;