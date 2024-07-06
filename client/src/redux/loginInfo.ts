import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface UserConfig {
  pages: { name: string; path: string }[];
}

interface LoginInfo {
  account: string;
  token: string;
  userType: string;
  userConfig?: UserConfig;
  settings?: string[];
}

const initialState: LoginInfo = {
  account: "",
  token: "",
  userType: "",
  userConfig: { pages: [] },
  settings: [],
};

const loginInfoSlice = createSlice({
  name: "loginInfo",
  initialState,
  reducers: {
    setLoginInfo: (state, action: PayloadAction<LoginInfo>) => {
      state.account = action.payload.account;
      state.token = action.payload.token;
      state.userType = action.payload.userType;
      state.userConfig = action.payload.userConfig;
      state.settings = action.payload.settings;
    },
    clearLoginInfo: (state) => {
      state.account = "";
      state.token = "";
      state.userType = "";
      state.userConfig = { pages: [] };
      state.settings = [];
    },
  },
});

export const { setLoginInfo, clearLoginInfo } = loginInfoSlice.actions;
export default loginInfoSlice.reducer;
