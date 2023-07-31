import { describe, it } from "vitest";
import { configureStore } from "@reduxjs/toolkit";

import { fireEvent, render, screen } from "../utils/test-utils";
import usersSlice, { getUserSuccess } from "../features/usersSlice";
import searchResultsReducer from "../features/searchResultsSlice";
import UserDisclosure from "../components/UserDisclosure";

describe("userDisclosure", () => {
  it("should display specific github user details", () => {
    const store = configureStore({
      reducer: {
        searchResults: searchResultsReducer,
        users: usersSlice,
      },
    });
    const user1 = {
      id: "1",
      login: "albert",
      avatar_url: "http://avatar.com/albert.png",
      bio: "Albert's bio",
      name: "Albert Stones",
    };
    store.dispatch(getUserSuccess(user1));

    render(<UserDisclosure user={user1} />, { store });

    const userDisclosure = screen.getByRole("githubUserDisclosure");
    const button = screen.getByRole("button");

    expect(userDisclosure).toHaveTextContent(user1.login);

    fireEvent.click(button);

    expect(userDisclosure).toHaveTextContent(user1.name);
    expect(userDisclosure).toHaveTextContent(user1.bio);
  });
});
