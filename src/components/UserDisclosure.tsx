import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "./Loading";
import { TUser } from "../types";
import { fetchUser } from "../requests";
import { selectUserInfoLoading, selectUsersInfo } from "../features/usersSlice";

const UserDisclosure = ({ user }: { user: TUser }) => {
  const userInfo = useSelector(selectUsersInfo)[user.login];
  const loading = useSelector(selectUserInfoLoading);
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!userInfo?.login) {
      fetchUser(user.login, dispatch);
    }
    setToggle(!toggle);
  };

  return (
    <div
      role="githubUserDisclosure"
      className="relative rounded-md bg-gradient-to-br from-amber-800 to-buff text-gray-300 min-w-[300px] max-w-[1000px] w-full shadow-xl"
    >
      <div className="flex items-center justify-between w-full px-4 py-2 lg:px-16">
        <div className="flex items-center gap-4 w-[90%]">
          <img
            src={user.avatar_url}
            className="w-10 rounded-full md:w-16 lg:w-20"
          />
          <h2 className="text-sm font-normal text-white truncate md:font-semibold md:text-xl">
            {user.login}
          </h2>
        </div>
        <button
          onClick={handleClick}
          className="flex items-center justify-center transition rounded-full shadow-lg w-7 h-7 md:w-10 md:h-10 hover:scale-90"
        >
          {!toggle ? (
            <img src="/plus.svg" alt="plus" className="w-full" />
          ) : (
            <img src="/minus.svg" alt="plus" className="w-full" />
          )}
        </button>
      </div>
      {toggle && (
        <>
          {loading ? (
            <Loading />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 p-4 md:px-16 ">
              <div className="flex items-center justify-center w-full gap-4">
                <h4 className="text-base text-white md:text-lg">
                  {userInfo?.name}
                </h4>
                <a
                  href={userInfo?.github_url}
                  target="_blank"
                  className="relative transition bg-white rounded-full w-9 h-9 md:w-14 md:h-14 hover:scale-110"
                >
                  <img
                    src="/github.svg"
                    alt="github"
                    className="absolute inset-0 m-auto bg-white rounded-full w-[90%]"
                  />
                </a>
              </div>
              <span className="text-white">{userInfo?.email}</span>
              {userInfo?.bio && (
                <p className="text-sm text-center md:text-base lg:w-[70%]">
                  Bio: {userInfo?.bio}
                </p>
              )}
              {userInfo?.location && (
                <p className="text-sm">
                  Location:{" "}
                  <span className="text-white">{userInfo?.location}</span>
                </p>
              )}

              <div className="flex items-center justify-center gap-4 text-xs md:text-lg">
                <p>
                  Public repos:{" "}
                  <span className="font-semibold text-white">
                    {userInfo?.public_repos}
                  </span>
                </p>
                <p>
                  Followers:{" "}
                  <span className="font-semibold text-white">
                    {userInfo?.followers}
                  </span>
                </p>
                <p>
                  Following:{" "}
                  <span className="font-semibold text-white">
                    {userInfo?.following}
                  </span>
                </p>
              </div>
              <div className="self-end text-sm">
                Joined on:
                <span className="text-white">
                  {" "}
                  {userInfo?.created_at?.split("T")[0]}{" "}
                  {userInfo?.created_at?.split("T")[1]}
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserDisclosure;
