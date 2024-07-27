import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosRefresh } from "react-icons/io";

const Search = ({ handleSearch, handleRefresh, placeholder = "" }) => {
  const [data, setData] = useState();

  const handleClickSearch = async (e) => {
    e.preventDefault();
    await handleSearch(data);
  };

  const handleClickRefresh = async (e) => {
    e.preventDefault();
    await handleRefresh();
    setData("");
  };

  return (
    <div className="flex space-x-2 mt-3 mb-5">
      <form className="flex w-full items-center justify-between space-x-2">
        <button
          onClick={handleClickRefresh}
          className="bg-cyan-500 text-white py-3 px-4 text-lg font-semibold rounded-md hover:bg-cyan-600"
        >
          <IoIosRefresh />
        </button>
        <div className="flex rounded-md overflow-hidden w-3/5">
          <input
            type="text"
            className="w-full rounded-md border-2 border-gray-200 px-3 py-2 border-r-0 rounded-r-none focus:outline-none focus:border-blue-500"
            placeholder={`Cari ${placeholder}`}
            value={data || ""}
            onChange={(e) => setData(e.target.value)}
          />
          <button
            onClick={handleClickSearch}
            className="bg-indigo-600 text-white px-4 text-lg font-semibold rounded-r-md hover:bg-indigo-700"
          >
            <FaSearch />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
