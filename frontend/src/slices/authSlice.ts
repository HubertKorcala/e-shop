import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../types/userType";

type InitialState = {
  userInfo: UserType | null;
};

const initialState: InitialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(String(localStorage.getItem("userInfo")))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));

      const expirationTime = new Date().getTime() + 1000 * 60 * 60 * 24;
      localStorage.setItem("expirationTime", String(expirationTime));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
