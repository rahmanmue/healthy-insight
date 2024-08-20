import { useState, useEffect } from "react";
import PenyakitService from "../../services/penyakit";
import ModalPenyakit from "./ModalPenyakit";
import { IoMdAdd } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import {
  swalAdd,
  swalUpdate,
  swalDelete,
  swalError,
  swalFail,
} from "../../utils/Swal";
import Search from "../../components/Search/Search";
import Pagination from "../../components/Pagination/Pagination";

const penyakitService = new PenyakitService();

const Penyakit = () => {
  const [penyakit, setPenyakit] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchData, setSearchData] = useState("");
  const pageSize = 3;

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
      const results = await penyakitService.searchPenyakit(
        searchData,
        page,
        pageSize
      );
      if (results.data.length === 0) {
        swalFail();
        setSearchData("");
        return;
      }
      setPenyakit(results.data);
      setCurrentPage(results.currentPage);
    } else {
      const response = await penyakitService.getAll(page, pageSize);
      setPenyakit(response.data);
      setCurrentPage(response.currentPage);
    }
  };

  const getAllPenyakit = async () => {
    try {
      const response = await penyakitService.getAll(1, pageSize);
      setPenyakit(response.data);
      setCurrentPage(response.currentPage);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const addData = async (data) => {
    try {
      await penyakitService.createPenyakit(data);
      swalAdd();
      getAllPenyakit();
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async (data) => {
    try {
      await penyakitService.updatePenyakit(data);
      swalUpdate();
      getAllPenyakit();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = (id) => {
    swalDelete(async () => {
      await penyakitService.deletePenyakit(id);
      await getAllPenyakit();
    }, "Data yang dihapus termasuk data solusi dan basis pengetahuan yang terkait");
  };

  const handleSearch = async (data) => {
    try {
      setSearchData(data);
      const results = await penyakitService.searchPenyakit(data);
      if (results.data.length === 0) {
        swalFail();
        setSearchData("");
        return;
      }
      setPenyakit(results.data);
      setCurrentPage(results.currentPage);
      setTotalPages(results.totalPages);
    } catch (error) {
      console.log(error);
      swalError();
    }
  };

  useEffect(() => {
    getAllPenyakit();
  }, []);

  return (
    <>
      <div className="flex justify-between mb-5">
        <h1 className="text-3xl font-bold">Penyakit</h1>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 flex items-center gap-1 rounded-lg uppercase focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() => handleOpen()}
        >
          <IoMdAdd className="inline text-xl" /> Penyakit
        </button>
      </div>

      <Search
        handleRefresh={getAllPenyakit}
        handleSearch={handleSearch}
        placeholder="Penyakit"
      />

      <ModalPenyakit
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
                      Penyakit
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-bold text-dark  uppercase"
                    >
                      AKSI
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {penyakit?.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-wrap text-md font-bold text-gray-800 dark:text-white ">
                        {(currentPage - 1) * pageSize + index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-wrap text-md text-gray-800 dark:text-white">
                        {item.penyakit}
                      </td>
                      <td className="px-6 py-4 whitespace-wrap  text-sm font-bold flex justify-end gap-2">
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
                          className="nline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-500 text-white px-2 py-2 hover:bg-red-600 focus:outline-none"
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

export default Penyakit;
