import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { TResultsState, TSearchParams, TUser } from "../types";
import { RootState } from "../store";

interface TSearchUsersSuccessPayload {
  users: TUser[];
  params: TSearchParams;
  total: number;
}

const initialState: TResultsState = {
  users: [],
  loading: false,
  params: null,
  total: 0,
  error: null,
};

export const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState,
  reducers: {
    searchUsers: (state) => {
      state.loading = true;
    },
    searchUsersSuccess: (
      state,
      action: PayloadAction<TSearchUsersSuccessPayload>
    ) => {
      state.loading = false;
      state.users = action.payload.users;
      state.params = action.payload.params;
      state.total = action.payload.total;
    },
    searchUsersFailed: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const selectUsers = (state: RootState) => state.searchResults.users;
export const selectParams = (state: RootState) => state.searchResults.params;
export const selectTotal = (state: RootState) => state.searchResults.total;
export const selectSearchLoading = (state: RootState) =>
  state.searchResults.loading;

export const { searchUsers, searchUsersSuccess, searchUsersFailed } =
  searchResultsSlice.actions;

export default searchResultsSlice.reducer;
