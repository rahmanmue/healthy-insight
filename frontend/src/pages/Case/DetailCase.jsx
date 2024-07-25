import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CaseService from "../../services/case";

const caseService = new CaseService();

const DetailCase = () => {
  const { kode_case } = useParams();
  const [data, setData] = useState([]);
  const [cases, setCase] = useState([]);

  const getPerhitunganKnn = async (code) => {
    try {
      const data = await caseService.getKnnByKodeCase(code);
      setCase(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCase = async (code) => {
    try {
      const data = await caseService.getCaseByKodeCase(code);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data);
  console.log(cases);

  useEffect(() => {
    getPerhitunganKnn(kode_case);
    getCase(kode_case);
  }, []);

  return (
    <>
      <div className="mb-5">
        <h1 className="text-3xl font-bold mb-3">Hasil Perhitungan</h1>
        <hr />
      </div>

      <div>
        <table>
          <tr>
            <td className="w-40 text-md font-semibold">Nama</td>
            <td className="font-medium text-md pr-1">:</td>
            <td className="font-medium text-md capitalize">{data?.name}</td>
          </tr>
          <tr>
            <td className="w-40 text-md font-semibold">Umur</td>
            <td className="font-medium text-md pr-1">:</td>
            <td className="font-medium text-md">{data?.umur} Tahun</td>
          </tr>
          <tr>
            <td className="w-40 text-md font-semibold">Jenis Kelamin</td>
            <td className="font-medium text-md pr-1">:</td>
            <td className="font-medium text-md">
              {data?.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"}
            </td>
          </tr>
          {data?.gejala?.map((x, index) =>
            index == 0 ? (
              <>
                <tr key={index}>
                  <td className="w-40 text-md font-semibold">Gejala</td>
                  <td className="font-medium text-md pr-1">:</td>
                  <td className="font-medium text-md">{x.gejala}</td>
                </tr>
              </>
            ) : (
              <>
                <tr key={index}>
                  <td></td>
                  <td></td>
                  <td className="font-medium text-md">{x.gejala}</td>
                </tr>
              </>
            )
          )}
        </table>
      </div>

      <div className="my-3 font-medium text-md">
        Hasil Perhitungan dengan Semua Basis Pengetahuan{" "}
      </div>
      <div className="flex flex-col mt-4">
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
                      Penyakit
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-bold text-dark  uppercase"
                    >
                      Kode BP
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-bold text-dark  uppercase"
                    >
                      Total Gejala
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-bold text-dark  uppercase"
                    >
                      Total Gejala Cocok
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-bold text-dark  uppercase"
                    >
                      Perhitungan
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-bold text-dark  uppercase"
                    >
                      Hasil Diagnosis
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 ">
                  {cases?.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 capitalize font-bold whitespace-wrap text-sm text-gray-800 ">
                        {item.penyakit.penyakit}
                      </td>
                      <td className="px-6 py-4 whitespace-wrap text-sm font-medium text-gray-800 ">
                        {item.kode_basis_pengetahuan}
                      </td>
                      <td className="px-6 py-4 whitespace-wrap text-center text-sm text-gray-800 ">
                        {item.total_gejala}
                      </td>
                      <td className="px-6 py-4 whitespace-wrap text-center text-sm text-gray-800 ">
                        {item.match_count}
                      </td>
                      <td className="px-6 py-4 whitespace-wrap text-center text-sm text-gray-800 ">
                        {`${item.total_similarity_gejala} / ${item.total_bobot}`}
                      </td>
                      <td className="px-6 py-4 whitespace-wrap text-center text-sm text-gray-800 ">
                        {`${parseInt(item.nilai_diagnosis * 100)} %`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <p>
          {`Berdasarkan perhitungan tersebut hasil diagnosis tertinggi adalah
          penyakit ${cases[0]?.penyakit?.penyakit} dengan nilai diagnosis
          ${parseInt(cases[0]?.nilai_diagnosis * 100)}%.`}
        </p>
        <p>Dengan solusi sebagai berikut :</p>
        <div className="my-4 ps-4 pe-5 bg-slate-200 py-3 rounded-sm font-medium text-justify">
          {cases[0]?.solusi?.solusi}
        </div>
      </div>
    </>
  );
};

export default DetailCase;