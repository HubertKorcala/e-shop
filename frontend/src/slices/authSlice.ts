import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../utils/userType";

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
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
