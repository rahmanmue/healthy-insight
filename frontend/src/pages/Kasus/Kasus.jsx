import { useState, useEffect } from "react";
import CaseService from "../../services/case";
import { Link } from "react-router-dom";
import { swalDelete, swalFail, swalError } from "../../utils/Swal";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuBookKey } from "react-icons/lu";
import Search from "../../components/Search/Search";

const caseService = new CaseService();

const Kasus = () => {
  const [data, setData] = useState([]);

  const getAll = async () => {
    try {
      const data = await caseService.getAll();
      setData(data);
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
      const results = await caseService.searchCase(name);
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
                      <td className="px-6 py-4 font-bold whitespace-nowrap text-md text-center text-gray-800">
                        {itemIndex + 1}
                      </td>
                      <td className="px-6 py-4 font-medium whitespace-nowrap text-md text-center text-gray-800">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 font-medium whitespace-nowrap text-md text-center text-gray-800">
                        {item.umur} Tahun
                      </td>
                      <td className="px-6 py-4 font-medium whitespace-nowrap text-md text-center text-gray-800">
                        {item.jenis_kelamin}
                      </td>

                      <td className="px-6 py-4  whitespace-wrap text-sm text-gray-800 text-end">
                        <div className="flex justify-end gap-2">
                          <Link
                            to={`/kasus/hasil/${item.kode_case}`}
                            className="inline-flex items-center justify-center gap-x-2 text-md font-bold rounded-lg border border-transparent bg-cyan-500 text-white px-2 py-2 hover:bg-cyan-600 focus:outline-none"
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
    </>
  );
};

export default Kasus;
