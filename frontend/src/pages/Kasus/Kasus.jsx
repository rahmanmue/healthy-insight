import { useState, useEffect } from "react";
import CaseService from "../../services/case";
import { Link } from "react-router-dom";
import { swalDelete, swalFail, swalError } from "../../utils/Swal";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuBookKey } from "react-icons/lu";
import Search from "../../components/Search/Search";
import Pagination from "../../components/Pagination/Pagination";

const caseService = new CaseService();

const Kasus = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchData, setSearchData] = useState("");
  const pageSize = 1;

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    if (searchData !== "") {
      const results = await caseService.searchCase(searchData, page, pageSize);
      if (results.data.length === 0) {
        swalFail();
        setSearchData("");
        return;
      }
      setData(results.data);
      setCurrentPage(results.currentPage);
    } else {
      const response = await caseService.getAll(page, pageSize);
      setData(response.data);
      setCurrentPage(response.currentPage);
    }
  };

  const getAll = async () => {
    try {
      const response = await caseService.getAll(1, pageSize);
      setData(response.data);
      setCurrentPage(response.currentPage);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = (kode_case) => {
    swalDelete(async () => {
      await caseService.deleteCaseByKodeCase(kode_case);
      getAll();
    });
  };

  const handleSearch = async (name) => {
    try {
      setSearchData(name);
      const results = await caseService.searchCase(name);
      if (results.data.length === 0) {
        swalFail();
        setSearchData("");
        return;
      }
      setData(results.data);
      setCurrentPage(results.currentPage);
      setTotalPages(results.totalPages);
    } catch (error) {
      console.log(error);
      swalError();
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <div className="flex justify-between mb-5">
        <h1 className="text-3xl font-bold">Data Diagnosis Kasus</h1>
      </div>

      <Search
        handleSearch={handleSearch}
        handleRefresh={getAll}
        placeholder="Nama"
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
                      className="px-6 py-3 text-center text-xs font-bold text-dark  uppercase"
                    >
                      No
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-bold text-dark  uppercase"
                    >
                      Nama
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 text-center text-xs font-bold text-dark  uppercase"
                    >
                      Umur
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-bold text-dark  uppercase"
                    >
                      Jenis Kelamin
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-bold text-dark  uppercase"
                    >
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data?.map((item, itemIndex) => (
                    <tr key={itemIndex}>
                      <td className="px-6 py-4 font-bold whitespace-nowrap text-md text-center text-gray-800 dark:text-white">
                        {(currentPage - 1) * pageSize + itemIndex + 1}
                      </td>
                      <td className="px-6 py-4 font-medium whitespace-nowrap text-md text-center text-gray-800 dark:text-white">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 font-medium whitespace-nowrap text-md text-center text-gray-800 dark:text-white">
                        {item.umur} Tahun
                      </td>
                      <td className="px-6 py-4 font-medium whitespace-nowrap text-md text-center text-gray-800 dark:text-white">
                        {item.jenis_kelamin}
                      </td>

                      <td className="px-6 py-4  whitespace-wrap text-sm text-gray-800 dark:text-white text-end">
                        <div className="flex justify-end gap-2">
                          <Link
                            to={`/kasus/hasil/${item.kode_case}`}
                            className="inline-flex items-center justify-center gap-x-2 text-md font-bold rounded-lg border border-transparent bg-green-500 text-white px-2 py-2 hover:bg-green-600 focus:outline-none"
                          >
                            <LuBookKey className="text-lg" />
                            DETAIL PERHITUNGAN
                          </Link>
                          <button
                            onClick={() => deleteData(item.kode_case)}
                            className="inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-500 text-white px-2 py-2 hover:bg-red-600 focus:outline-none"
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
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Kasus;
