import axios from "axios";

import { TSearchParams } from "../types";
import { AppDispatch } from "../store";
import {
  searchUsers,
  searchUsersFailed,
  searchUsersSuccess,
} from "../features/searchResultsSlice";
import { getUser, getUserFailed, getUserSuccess } from "../features/usersSlice";

const config = {
  baseURL: "https://api.github.com/",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  },
};
const Axios = axios.create(config);

export const searchUsersFetch = async (
  params: TSearchParams,
  dispatch: AppDispatch
) => {
  try {
    dispatch(searchUsers);
    const response = await Axios.get("search/users", { params: params });
    const items = response.data.items;
    const total = response.data.total_count;
    const users = items.map((user: (typeof items)[0]) => {
      return {
        id: user.id,
        login: user.login,
        avatar_url: user.avatar_url,
      };
    });

    dispatch(searchUsersSuccess({ users, params, total }));
  } catch (error) {
    const e = error as Error;

    dispatch(searchUsersFailed(e.message));
    console.log(e.message);
  }
};

export const fetchUser = async (username: string, dispatch: AppDispatch) => {
  try {
    dispatch(getUser);
    const response = await Axios.get(`users/${username}`);

    const data = response.data;
    const user = {
      id: data.id,
      login: data.login,
      avatar_url: data.avatar_url,
      name: data.name,
      github_url: data.html_url,
      location: data.location,
      email: data.email,
      bio: data.bio,
      public_repos: data.public_repos,
      followers: data.followers,
      following: data.following,
      created_at: data.created_at,
    };
    dispatch(getUserSuccess(user));
  } catch (error) {
    const e = error as Error;

    dispatch(getUserFailed(e.message));
    console.log(e.message);
  }
};
