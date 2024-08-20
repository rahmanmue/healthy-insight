import { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { swalDelete, swalError, swalFail } from "../../utils/Swal";
import { Link } from "react-router-dom";
import SolusiService from "../../services/solusi";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Search from "../../components/Search/Search";
import Pagination from "../../components/Pagination/Pagination";

const solusiService = new SolusiService();

const Solusi = () => {
  const [solusi, setSolusi] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchData, setSearchData] = useState("");
  const pageSize = 5;

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    if (searchData !== "") {
      const results = await solusiService.searchSolusi(
        searchData,
        page,
        pageSize
      );
      if (results.data.length === 0) {
        swalFail();
        setSearchData("");
        return;
      }
      setSolusi(results.data);
      setCurrentPage(results.currentPage);
    } else {
      const response = await solusiService.getAll(page, pageSize);
      setSolusi(response.data);
      setCurrentPage(response.currentPage);
    }
  };

  const getAllSolusi = async () => {
    try {
      const response = await solusiService.getAll(1, pageSize);
      setSolusi(response.data);
      setCurrentPage(response.currentPage);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (id) => {
    swalDelete(async () => {
      await solusiService.deleteSolusi(id);
      await getAllSolusi();
    });
  };

  const handleSearch = async (data) => {
    try {
      setSearchData(data);
      const results = await solusiService.searchSolusi(data);
      if (results.data.length === 0) {
        swalFail();
        setSearchData("");
        return;
      }
      setSolusi(results.data);
      setCurrentPage(results.currentPage);
      setTotalPages(results.totalPages);
    } catch (error) {
      console.log(error);
      swalError();
    }
  };

  useEffect(() => {
    getAllSolusi();
  }, []);

  return (
    <>
      <div className="flex justify-between mb-5">
        <h1 className="text-3xl font-bold">Solusi</h1>
        <Link
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 flex items-center gap-1 rounded-lg uppercase focus:outline-none focus:shadow-outline"
          to={`/admin/solusi/add`}
        >
          <IoMdAdd className="inline text-xl" /> Solusi
        </Link>
      </div>

      <Search
        handleRefresh={getAllSolusi}
        handleSearch={handleSearch}
        placeholder="Solusi"
      />

      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 ">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-bold text-dark  uppercase"
                    >
                      No
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-bold text-dark  uppercase"
                    >
                      Penyakit
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-bold text-dark  uppercase"
                    >
                      Solusi
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-bold text-dark  uppercase"
                    >
                      AKSI
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 ">
                  {solusi?.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-wrap text-sm font-bold text-gray-800 dark:text-white">
                        {(currentPage - 1) * pageSize + index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-wrap text-gray-800 dark:text-white">
                        <div className="text-md font-semibold">
                          {item.penyakit}
                        </div>
                        <span className="text-xs">
                          {`(${item.persentase_awal}-${item.persentase_akhir})%`}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-wrap text-md capitalize text-gray-800 dark:text-white">
                        {item.solusi}
                      </td>
                      <td className="px-6 py-4 whitespace-wrap  text-sm font-bold">
                        <div className="flex justify-end items-center gap-2">
                          <Link
                            to={`/admin/solusi/edit/${item.id}`}
                            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-yellow-500 text-white px-2 py-2 hover:bg-yellow-600 focus:outline-none"
                          >
                            <MdEdit className="text-lg" />
                          </Link>
                          <button
                            onClick={() => deleteData(item.id)}
                            className="nline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-500 text-white px-2 py-2 hover:bg-red-600 focus:outline-none"
                          >
                            <FaRegTrashAlt className="text-lg" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Solusi;
