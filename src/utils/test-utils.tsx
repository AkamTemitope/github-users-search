import { Provider } from "react-redux";
import { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import type { RenderOptions } from "@testing-library/react";

import type { AppStore } from "../store";
import usersSlice from "../features/usersSlice";
import searchResultsReducer from "../features/searchResultsSlice";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    store = configureStore({
      reducer: {
        searchResults: searchResultsReducer,
        users: usersSlice,
      },
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export * from "@testing-library/react";
export { renderWithProviders as render };
