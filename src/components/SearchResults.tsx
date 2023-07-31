import { useSelector } from "react-redux";

import Pagination from "./Pagination";
import UserDisclosure from "./UserDisclosure";
import { selectUsers } from "../features/searchResultsSlice";

const SearchResults = () => {
  const users = useSelector(selectUsers);

  return (
    <section className="flex flex-col items-center justify-center w-full gap-2 px-4 2xl:px-0">
      {users &&
        users.map((user) => <UserDisclosure key={user.id} user={user} />)}
      <Pagination />
    </section>
  );
};

export default SearchResults;
