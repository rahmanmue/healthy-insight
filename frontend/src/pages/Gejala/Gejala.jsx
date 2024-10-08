import { useState, useEffect } from "react";
import GejalaService from "../../services/gejala";
import ModalGejala from "./ModalGejala";
import { IoMdAdd } from "react-icons/io";
import {
  swalAdd,
  swalUpdate,
  swalDelete,
  swalError,
  swalFail,
} from "../../utils/Swal";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Search from "../../components/Search/Search";
import Pagination from "../../components/Pagination/Pagination";

const gejalaService = new GejalaService();

const Gejala = () => {
  // get all gejala
  const [gejala, setGejala] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchData, setSearchData] = useState("");
  const pageSize = 10;

  // show modal
  const [open, setOpen] = useState(false);
  const [itemData, setItemData] = useState({});

  const handleOpen = (itemData) => {
    setItemData(itemData || {});
    setOpen(!open);
  };

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    if (searchData !== "") {
      const results = await gejalaService.searchGejala(
        searchData,
        page,
        pageSize
      );
      if (results.data.length === 0) {
        swalFail();
        setSearchData("");
        return;
      }
      setGejala(results.data);
      setCurrentPage(results.currentPage);
    } else {
      const response = await gejalaService.getAll(page, pageSize);
      setGejala(response.data);
      setCurrentPage(response.currentPage);
    }
  };

  const getAll = async () => {
    try {
      const response = await gejalaService.getAll(1, pageSize);
      setGejala(response.data);
      setCurrentPage(response.currentPage);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const addData = async (data) => {
    try {
      await gejalaService.createGejala([data]);
      swalAdd();
      getAll();
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async (data) => {
    try {
      await gejalaService.updateGejala(data);
      swalUpdate();
      getAll();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (id) => {
    swalDelete(async () => {
      await await gejalaService.deleteGejala(id);
      await getAll();
    });
  };

  const handleSearch = async (data) => {
    try {
      const results = await gejalaService.searchGejala(
        data,
        currentPage,
        pageSize
      );
      if (results.data.length === 0) {
        swalFail();
        setSearchData("");
        return;
      }
      setSearchData(data);
      setGejala(results.data);
      setCurrentPage(results.currentPage);
      setTotalPages(results.totalPages);
    } catch (error) {
      setSearchData("");
      console.log(error);
      swalError();
    }
  };

  useEffect(() => {
    getAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex justify-between mb-5">
        <h1 className="text-3xl font-bold">Gejala</h1>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg uppercase flex items-center gap-1 focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() => handleOpen()}
        >
          <IoMdAdd className="inline text-xl" /> Gejala
        </button>
      </div>

      <Search
        handleSearch={handleSearch}
        handleRefresh={getAll}
        placeholder="Gejala / Bobot"
      />

      <ModalGejala
        open={open}
        handleOpen={handleOpen}
        item={itemData}
        addData={addData}
        updateData={updateData}
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
                      Gejala
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-bold text-dark  uppercase"
                    >
                      Bobot
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-bold text-dark  uppercase"
                    >
                      AKSI
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 ">
                  {gejala.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-wrap text-sm font-bold text-gray-800 dark:text-white">
                        {(currentPage - 1) * pageSize + index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-wrap text-md text-gray-800 dark:text-white">
                        {item.gejala}
                      </td>
                      <td className="px-6 py-4 whitespace-wrap text-center text-md text-gray-800 dark:text-white">
                        {item.nilai_bobot}
                      </td>
                      <td className="px-6 py-4 whitespace-wrap  text-sm font-bold flex justify-center gap-2">
                        <button
                          onClick={() => handleOpen(item)}
                          type="button"
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-yellow-500 text-white px-2 py-2 hover:bg-yellow-600 focus:outline-none"
                        >
                          <MdEdit className="text-lg" />
                        </button>
                        <button
                          onClick={() => deleteData(item.id)}
                          type="button"
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-500 text-white px-2 py-2 hover:bg-red-600 focus:outline-none"
                        >
                          <FaRegTrashAlt className="text-lg" />
                        </button>
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

export default Gejala;
