import { createSlice } from "@reduxjs/toolkit";

// LocalStorage'dan token'ı al
const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
const user = token ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = {
  user: user,
  token: token,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
