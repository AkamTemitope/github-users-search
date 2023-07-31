import { useSelector } from "react-redux";

import Search from "./components/Search";
import Loading from "./components/Loading";
import SearchResults from "./components/SearchResults";
import { selectSearchLoading } from "./features/searchResultsSlice";

const App = () => {
  const loading = useSelector(selectSearchLoading);

  return (
    <div className="flex items-start justify-center w-screen h-screen bg-babyPowder">
      <div className="relative w-full px-4 md:px-8 py-4 md:w-[80%] max-w-[1440px] gap-2 h-full flex flex-col items-center text-white text-lg overflow-y-auto">
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-black to-amber-900">
          Github User Search
        </h1>
        <Search />
        {loading ? <Loading /> : <SearchResults />}
      </div>
    </div>
  );
};

export default App;
