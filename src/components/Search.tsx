import { useState } from "react";
import { useDispatch } from "react-redux";

import { searchUsersFetch } from "../requests";
const Search = () => {
  const [sort, setSort] = useState<string>("repositories");
  const [order, setOrder] = useState<string>("desc");
  const [input, setInput] = useState<string>("");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim().length) return;

    const params = {
      q: input,
      sort: sort,
      order: order,
      per_page: 10,
      page: 1,
    };
    searchUsersFetch(params, dispatch);
  };

  return (
    <div className="w-full py-2 px-4">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col items-center w-full gap-3 py-1 text-base font-medium xl:gap-0 justify-evenly lg:flex-row"
      >
        <input
          type="text"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
          placeholder="Enter a name..."
          className="max-w-[500px] w-full p-3 text-xl placeholder-gray-300 bg-gradient-to-br from-amber-800 to-buff rounded-md outline-none"
        />
        <div className="flex flex-col items-center w-full gap-4 md:flex-row md:w-auto justify-evenly md:justify-start">
          <div className="flex justify-center gap-4">
            <div className="flex items-center gap-1">
              <label className="text-base font-medium text-black">
                Sort by
              </label>
              <select
                className="w-full min-w-[130px] text-black rounded-md outline-none cursor-pointer bg-gradient-to-br from-buff to-amber-800 h-11 md:h-12"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setSort(e.target.value)
                }
              >
                <option value="repositories">Repositories</option>
                <option value="followers">Followers</option>
                <option value="joined">Joined GH</option>
              </select>
            </div>
            <div className="flex items-center gap-1">
              <label className="text-base font-medium text-black">Order</label>
              <select
                className="w-full text-black rounded-md outline-none cursor-pointer min-w-[70px] bg-gradient-to-br from-buff to-amber-800 h-11 md:h-12"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setOrder(e.target.value)
                }
              >
                <option value="desc" className="">
                  DESC
                </option>
                <option value="asc" className="">
                  ASC
                </option>
              </select>
            </div>
          </div>
          <input
            type="submit"
            className="h-12 px-4 text-white transition bg-black rounded-md cursor-pointer hover:translate-y-1"
            value="Search"
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
