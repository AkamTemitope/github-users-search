import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { TUser, TUsersState } from "../types";
import { RootState } from "../store";

const initialState: TUsersState = {
  usersInfo: {},
  loading: false,
  error: "",
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state) => {
      state.loading = true;
    },
    getUserSuccess: (state, action: PayloadAction<TUser>) => {
      state.loading = false;
      const login = action.payload.login;
      state.usersInfo[login] = action.payload;
    },
    getUserFailed: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const selectUsersInfo = (state: RootState) => state.users.usersInfo;
export const selectUserInfoLoading = (state: RootState) => state.users.loading;

export const { getUser, getUserSuccess, getUserFailed } = usersSlice.actions;

export default usersSlice.reducer;
