import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  userInfo: string | null;
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
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
