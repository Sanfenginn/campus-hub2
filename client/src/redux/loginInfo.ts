import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginInfo {
  account: string;
  token: string;
  userType: string;
}

const initialState: LoginInfo = {
  account: "",
  token: "",
  userType: "",
};

const loginInfoSlice = createSlice({
  name: "loginInfo",
  initialState,
  reducers: {
    setLoginInfo: (state, action: PayloadAction<LoginInfo>) => {
      state.account = action.payload.account;
      state.token = action.payload.token;
      state.userType = action.payload.userType;
    },
    clearLoginInfo: (state) => {
      state.account = "";
      state.token = "";
      state.userType = "";
    },
  },
});

export const { setLoginInfo, clearLoginInfo } = loginInfoSlice.actions;
export default loginInfoSlice.reducer;
