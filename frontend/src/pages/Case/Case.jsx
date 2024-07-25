import React from "react";
import { useState, useEffect } from "react";
import CaseService from "../../services/case";
import { Link } from "react-router-dom";

const caseService = new CaseService();

const Case = () => {
  const [data, setData] = useState([]);

  const getAll = async () => {
    try {
      const data = await caseService.getAll();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowDelete = (id) => {
    alert(id);
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <div className="flex justify-between mb-5">
        <h1 className="text-3xl font-bold">Data Kasus</h1>
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
                      Kode Basis Pengetahuan
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-bold text-dark  uppercase"
                    >
                      Hasil Diagnosis
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
                  {data.map((item, itemIndex) => (
                    <React.Fragment key={itemIndex}>
                      {item.diagnosis.map((diagnosa, diagnosaIndex) => (
                        <tr key={diagnosaIndex}>
                          {diagnosaIndex === 0 && (
                            <>
                              <td
                                rowSpan={item.diagnosis.length}
                                className="px-6 py-4 font-bold whitespace-nowrap text-sm text-center text-gray-800"
                              >
                                {itemIndex + 1}
                              </td>
                              <td
                                rowSpan={item.diagnosis.length}
                                className="px-6 py-4 font-semibold whitespace-nowrap text-sm text-center text-gray-800"
                              >
                                {item.name}
                              </td>
                            </>
                          )}
                          <td className="px-6 py-4 font-bold whitespace-wrap text-sm text-gray-800 text-center">
                            {diagnosa.kode_basis_pengetahuan}
                          </td>
                          <td className="px-6 py-4 font-medium whitespace-wrap text-sm text-gray-800 text-center">
                            {`${diagnosa.nilai_diagnosis.toFixed(4)} %`}
                          </td>
                          {diagnosaIndex === 0 && (
                            <td
                              rowSpan={item.diagnosis.length}
                              className="px-6 py-4  whitespace-wrap text-sm text-gray-800 text-end"
                            >
                              <Link
                                to={`/case/hasil/${item.kode_case}`}
                                className="inline-flex items-center gap-x-2 mr-2 text-sm font-semibold rounded-lg border border-transparent bg-cyan-500 text-white px-2 py-2 hover:bg-cyan-600 focus:outline-none"
                              >
                                Detail Perhitungan
                              </Link>
                              <button
                                onClick={() => handleShowDelete(item.kode_case)}
                                className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-500 text-white px-2 py-2 hover:bg-red-600 focus:outline-none"
                              >
                                Hapus
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

export default Case;
