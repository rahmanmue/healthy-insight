import React from "react";
import { useState, useEffect } from "react";
import BasisPengetahuanService from "../../services/basisPengetahuan";
import { Link } from "react-router-dom";
import { swalDelete, swalUpdate, swalError, swalFail } from "../../utils/Swal";
import { IoMdAdd } from "react-icons/io";
import { CiSquareInfo } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import ModalUpdatePenyakit from "./ModalUpdatePenyakit";
import Search from "../../components/Search/Search";

const basisPengetahuanService = new BasisPengetahuanService();

const BasisPengetahuan = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemData, setItemData] = useState({});

  const handleOpen = (item) => {
    setOpen(!open);
    setItemData(item);
  };

  const getAll = async () => {
    try {
      const data = await basisPengetahuanService.getAll();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async (data) => {
    try {
      await basisPengetahuanService.updatePenyakitBp(data);
      swalUpdate();
      getAll();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (kode_bp) => {
    swalDelete(async () => {
      await basisPengetahuanService.deleteBpByKodeBp(kode_bp);
      await getAll();
    });
  };

  const handleSearch = async (data) => {
    try {
      const results = await basisPengetahuanService.searchBasisPengetahuan(
        data
      );
      if (results.length === 0) {
        swalFail();
        return;
      }
      setData(results);
    } catch (error) {
      console.log(error);
      swalError();
    }
  };

  useEffect(() => {
    getAll();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="flex justify-between mb-5">
        <h1 className="text-3xl font-bold">Basis Pengetahuan</h1>
        <Link
          className="bg-blue-500 flex items-center gap-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg uppercase focus:outline-none focus:shadow-outline"
          to="/admin/basis-pengetahuan/add"
        >
          <IoMdAdd className="text-xl" /> Pengetahuan
        </Link>
      </div>

      <Search
        handleRefresh={getAll}
        handleSearch={handleSearch}
        placeholder="Basis Pengetahuan"
      />

      <ModalUpdatePenyakit
        open={open}
        handleOpen={handleOpen}
        item={itemData}
        updateData={updateData}
      />

      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-2 py-3 text-start text-xs font-bold text-dark  uppercase "
                    >
                      Kode BP
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-bold text-dark  uppercase"
                    >
                      Gejala
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-bold text-dark  uppercase"
                    >
                      AKSI
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((item, itemIndex) => (
                    <React.Fragment key={itemIndex}>
                      {item.gejala.map((gejala, gejalaIndex) => (
                        <tr key={gejalaIndex}>
                          {gejalaIndex === 0 && (
                            <td
                              rowSpan={item.gejala.length}
                              className="px-6 py-4 whitespace-nowrap font-semibold text-md text-center text-gray-800"
                            >
                              {item.kode_basis_pengetahuan}
                              <span className="block text-sm font-medium">
                                [{item.penyakit}]
                              </span>
                            </td>
                          )}
                          <td className="px-6 py-4 whitespace-wrap text-md text-gray-800">
                            {gejala.gejala}
                          </td>
                          {gejalaIndex === 0 && (
                            <td
                              rowSpan={item.gejala.length}
                              className="px-6 py-4 whitespace-nowrap text-md text-center text-gray-800 font-bold "
                            >
                              <div className="flex flex-col gap-2 flex-wrap justify-center">
                                <button
                                  onClick={() => handleOpen(item)}
                                  className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-yellow-500 text-white px-2 py-2 hover:bg-yellow-600 focus:outline-none"
                                >
                                  <MdEdit className="text-xl" />
                                  UBAH PENYAKIT
                                </button>

                                <button
                                  onClick={() =>
                                    deleteData(item.kode_basis_pengetahuan)
                                  }
                                  className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-500 text-white px-2 py-2 hover:bg-red-600 focus:outline-none  "
                                >
                                  <FaRegTrashAlt className="text-xl" />
                                  HAPUS
                                </button>
                                <Link
                                  to={`/admin/basis-pengetahuan/detail/${item.kode_basis_pengetahuan}`}
                                  className="flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-cyan-500 text-white px-2 py-2 hover:bg-cyan-600 focus:outline-none"
                                >
                                  <CiSquareInfo className="text-2xl" />
                                  DETAIL
                                </Link>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BasisPengetahuan;
