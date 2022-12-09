import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin } from "./userAction";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    user: null,
    token: "",
    loading: false,
    error: null,
  success: false,
    
  },
  reducers: {
    logout: (state) => {
      state.loading = false
      state.user = null
      state.token = ""
      state.error = null
      state.isAuthenticated = false
    },
  },
  extraReducers: {
    // register user
    [registerUser.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true // registration successful
      // state.isAuthenticated = true
    },
    [registerUser.rejected]: (state, { payload }) => {
      
      state.loading = false
      state.error = payload
    },

    // login user
    [userLogin.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      localStorage.setItem("isAuthenticated", "true")
      state.loading = false
      state.success = payload
      state.isAuthenticated = true
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
});

export const UserReducer = userSlice.reducer;

export const {
 logout
} = userSlice.actions;