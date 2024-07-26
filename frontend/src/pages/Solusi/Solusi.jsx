import { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { swalDelete } from "../../utils/Swal";
import { Link } from "react-router-dom";
import SolusiService from "../../services/solusi";
import PenyakitService from "../../services/penyakit";

const solusiService = new SolusiService();
const penyakitService = new PenyakitService();

const Solusi = () => {
  const [solusi, setSolusi] = useState([]);
  const [penyakit, setPenyakit] = useState([]);

  const getAllSolusi = async () => {
    try {
      const data = await solusiService.getAll();
      setSolusi(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPenyakit = async () => {
    try {
      const data = await penyakitService.getAll();
      setPenyakit(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPenyakit = (id) => {
    const penyakitFiltered = penyakit?.filter((item) => item.id === id);
    return penyakitFiltered[0]?.penyakit;
  };

  const deleteData = async (id) => {
    try {
      await solusiService.deleteSolusi(id);
      getAllSolusi();
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowDelete = (id) => {
    swalDelete(id, deleteData);
  };

  useEffect(() => {
    getAllSolusi();
    getAllPenyakit();
  }, []);

  return (
    <>
      <div className="flex justify-between mb-5">
        <h1 className="text-3xl font-bold">Solusi</h1>
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 flex items-center gap-1 rounded focus:outline-none focus:shadow-outline"
          to={`/admin/solusi/add`}
        >
          <IoMdAdd className="inline text-xl" /> Solusi
        </Link>
      </div>

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
                      <td className="px-6 py-4 whitespace-wrap text-sm font-bold text-gray-800 ">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-wrap capitalize text-gray-800 ">
                        <div className="text-md font-semibold">
                          {getPenyakit(item.id_penyakit)}
                        </div>
                        <span className="text-xs">
                          {`(${item.persentase_awal}-${item.persentase_akhir})%`}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-wrap text-md capitalize text-gray-800 ">
                        {item.solusi}
                      </td>
                      <td className="px-6 py-4 whitespace-wrap  text-sm font-bold flex justify-end gap-2">
                        <Link
                          to={`/admin/solusi/edit/${item.id}`}
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-yellow-500 text-white px-2 py-2 hover:bg-yellow-600 focus:outline-none"
                        >
                          EDIT
                        </Link>
                        <button
                          onClick={() => handleShowDelete(item.id)}
                          className="nline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-500 text-white px-2 py-2 hover:bg-red-600 focus:outline-none"
                        >
                          HAPUS
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
    </>
  );
};

export default Solusi;
