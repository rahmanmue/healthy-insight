import { useState, useEffect } from "react";
import SolusiService from "../../services/solusi";
import { useParams } from "react-router-dom";
import PenyakitService from "../../services/penyakit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../../components/Input/Input";
import notify from "../../utils/notify";
import { useNavigate } from "react-router-dom";
import { Select } from "@headlessui/react";
import { swalUpdate } from "../../utils/Swal";

const solusiService = new SolusiService();
const penyakitService = new PenyakitService();

const EditSolusi = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [penyakit, setPenyakit] = useState([]);
  const [data, setData] = useState({});

  const getSolusiById = async (id) => {
    try {
      const data = await solusiService.getSolusiById(id);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPenyakit = async () => {
    try {
      const { data } = await penyakitService.getAll();
      setPenyakit(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (data.persentase_awal > data.persentase_akhir) {
        notify(
          "error",
          "Persentase awal tidak boleh lebih besar dari persentase akhir",
          1500
        );
        return;
      }

      if (data.solusi === "") {
        notify("error", "Data solusi tidak boleh kosong", 1500);
        return;
      }
      await solusiService.updateSolusi(data);
      swalUpdate();
      navigate("/admin/solusi");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSolusiById(id);
    getAllPenyakit();
  }, [id]);

  return (
    <>
      <ToastContainer />
      <div className="h-full flex flex-col justify-center">
        <h1 className="text-3xl font-bold my-2">Edit Solusi</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-md font-semibold leading-6 text-gray-900 my-2 dark:text-white "
              htmlFor="penyakit"
            >
              Penyakit
            </label>
            <Select
              name="id_penyakit"
              className="capitalize py-3 ps-4 pe-5 block w-full border-2 dark:bg-slate-700 border-gray-200 bg-white rounded-lg text-md font-medium focus:border-green-500 focus:border-1 focus:ring-green-500 focus:outline-none"
              value={data.id_penyakit}
              onChange={handleInput}
              required
            >
              <option value="" selected disabled>
                Pilih Penyakit
              </option>
              {penyakit?.map((item, i) => (
                <option
                  key={i}
                  value={item.id}
                  selected={item.id === data.id_penyakit}
                >
                  {item.penyakit}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex gap-3 mt-3 items-center">
            <div className="w-1/2">
              <Input
                type="number"
                name="persentase_awal"
                label="Persentase Awal %"
                placeholder="Persentase Awal"
                value={data.persentase_awal}
                onChange={handleInput}
                min="0"
                max="100"
              />
            </div>
            <div className="w-1/2">
              <Input
                type="number"
                name="persentase_akhir"
                label="Persentase Akhir %"
                placeholder="Persentase AKhir"
                value={data.persentase_akhir}
                onChange={handleInput}
                min="0"
                max="100"
              />
            </div>
          </div>

          <div className="">
            <label className="block text-md font-semibold leading-6 text-gray-900 my-2 dark:text-white ">
              Solusi
            </label>

            <textarea
              name="solusi"
              id="solusi"
              placeholder="Solusi"
              value={data.solusi}
              onChange={handleInput}
              className=" h-48 py-3 ps-4 pe-10 block w-full border-2 dark:bg-slate-700 border-gray-200 bg-white rounded-lg text-md font-medium focus:border-green-500 focus:outline-none"
              required
            />
          </div>
          <button
            className="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5 bg-green-500 hover:bg-green-600 text-white w-full"
            type="submit"
          >
            Simpan
          </button>
        </form>
      </div>
    </>
  );
};

export default EditSolusi;
