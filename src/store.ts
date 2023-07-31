import usersSlice from "./features/usersSlice";
import { configureStore } from "@reduxjs/toolkit";
import searchResultsReducer from "./features/searchResultsSlice";

export const store = configureStore({
  reducer: {
    searchResults: searchResultsReducer,
    users: usersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
