import { describe, it } from "vitest";
import { configureStore } from "@reduxjs/toolkit";

import { render, screen } from "../utils/test-utils";
import SearchResults from "../components/SearchResults";
import usersSlice from "../features/usersSlice";
import searchResultsReducer, {
  searchUsersSuccess,
} from "../features/searchResultsSlice";

describe("SearchResults", () => {
  it("should map through all github users search results", () => {
    const store = configureStore({
      reducer: {
        searchResults: searchResultsReducer,
        users: usersSlice,
      },
    });
    const params = {
      q: "albert",
      sort: "",
      order: "asc",
      per_page: 10,
      page: 1,
    };
    const users = [
      {
        id: "1",
        login: "albert",
        avatar_url: "http://avatar.com/albert.png",
      },
      {
        id: "2",
        login: "alberto",
        avatar_url: "http://avatar.com/alberto.png",
      },
    ];
    const payload = {
      users,
      params,
      total: 2,
    };
    store.dispatch(searchUsersSuccess(payload));
    render(<SearchResults />, { store });

    const usersDisclosure = screen.getAllByRole("githubUserDisclosure");

    expect(usersDisclosure.length).toBe(2);
  });
});
