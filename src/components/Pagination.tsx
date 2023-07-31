import { useDispatch, useSelector } from "react-redux";

import { searchUsersFetch } from "../requests";
import { selectParams, selectTotal } from "../features/searchResultsSlice";

const Pagination = () => {
  const params = useSelector(selectParams);
  const total = useSelector(selectTotal);
  const dispatch = useDispatch();

  const nextPage = () => {
    if (!params) return;
    console.log(params);
    searchUsersFetch({ ...params, page: params.page + 1 }, dispatch);
  };
  const prevPage = () => {
    if (!params) return;
    searchUsersFetch({ ...params, page: params.page - 1 }, dispatch);
  };

  return (
    params && (
      <div className="flex justify-center w-full gap-12">
        <button
          className="transition rounded-l-full cursor-pointer w-9 h-9 hover:-translate-x-1"
          onClick={prevPage}
          disabled={params.page === 1}
        >
          <img
            src="/previous.svg"
            className={`w-full  ${
              params.page === 1 && "opacity-10 cursor-not-allowed"
            }`}
          />
        </button>
        <button
          className="transition rounded-r-full cursor-pointer w-9 h-9 hover:translate-x-1 "
          onClick={nextPage}
          disabled={params.page * params.per_page + 1 > total}
        >
          <img
            src="/next.svg"
            className={`w-full  ${
              params.page * params.per_page + 1 > total &&
              "opacity-10 cursor-not-allowed"
            }`}
          />
        </button>
      </div>
    )
  );
};

export default Pagination;
