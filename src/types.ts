export interface TResultsState {
  users: TUser[];
  params: TSearchParams | null;
  total: number;
  loading: boolean;
  error: string | null;
}

interface usersObject {
  [key: string]: TUser;
}

export interface TUsersState {
  usersInfo: usersObject;
  loading: boolean;
  error: string | null;
}

export interface TUser {
  id: string;
  login: string;
  avatar_url: string;

  name?: string;
  github_url?: string;
  location?: string;
  email?: string;
  bio?: string;
  public_repos?: number;
  followers?: number;
  following?: number;
  created_at?: string;
}

export interface TSearchParams {
  q: string;
  sort: string;
  order: string;
  per_page: number;
  page: number;
}
