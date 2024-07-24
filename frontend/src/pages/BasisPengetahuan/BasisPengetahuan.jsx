import React from "react";
import { useState, useEffect } from "react";
import BasisPengetahuanService from "../../services/basisPengetahuan";

const basisPengetahuanService = new BasisPengetahuanService();

const BasisPengetahuan = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    basisPengetahuanService
      .getAll()
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="flex justify-between mb-5">
        <h1 className="text-3xl font-bold">Data Basis Pengetahuan</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
          type="button"
        >
          + Basis Pengetahuan
        </button>
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
                      className="px-2 py-3 text-start text-xs font-bold text-dark  uppercase"
                    >
                      No
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 text-start text-xs font-bold text-dark  uppercase"
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
                            <>
                              <td
                                rowSpan={item.gejala.length}
                                className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-800"
                              >
                                {itemIndex + 1}
                              </td>
                              <td
                                rowSpan={item.gejala.length}
                                className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-800"
                              >
                                {item.kode_basis_pengetahuan}
                              </td>
                            </>
                          )}
                          <td className="px-6 py-4 whitespace-wrap text-sm text-gray-800">
                            {gejala.gejala}
                          </td>
                          {gejalaIndex === 0 && (
                            <td
                              rowSpan={item.gejala.length}
                              className="px-6 py-4 whitespace-nowrap text-md text-center text-gray-800 font-bold "
                            >
                              <button
                                type="button"
                                className="nline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-yellow-600 hover:text-yellow-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none mr-2"
                              >
                                EDIT
                              </button>{" "}
                              <button
                                type="button"
                                className="nline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                              >
                                HAPUS
                              </button>
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
