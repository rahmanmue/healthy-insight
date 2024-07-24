import React from "react";
import { useState, useEffect } from "react";
import CaseService from "../../services/case";

const caseService = new CaseService();

const Case = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    caseService
      .getAll()
      .then((data) => setData(data))
      .catch((error) => console.log(error));
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
                                className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-800"
                              >
                                {itemIndex + 1}
                              </td>
                              <td
                                rowSpan={item.diagnosis.length}
                                className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-800"
                              >
                                {item.name}
                              </td>
                            </>
                          )}
                          <td className="px-6 py-4 whitespace-wrap text-sm text-gray-800 text-center">
                            {diagnosa.kode_basis_pengetahuan}
                          </td>
                          <td className="px-6 py-4 whitespace-wrap text-sm text-gray-800 text-center">
                            {`${diagnosa.nilai_diagnosis.toFixed(2)} %`}
                          </td>
                          {diagnosaIndex === 0 && (
                            <td
                              rowSpan={item.diagnosis.length}
                              className="px-6 py-4 whitespace-wrap text-sm text-gray-800 text-end"
                            >
                              {/* <button
                                name="Detail"
                                type="button"
                                restClass="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded mr-2"
                              />
                              <button
                                name="Hapus "
                                type="button"
                                restClass="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                              /> */}
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
