import { useState, useEffect } from "react";
import Input from "../../components/Input/Input";
import notify from "../../utils/notify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Select } from "@headlessui/react";
import GejalaService from "../../services/gejala";
import PenyakitService from "../../services/penyakit";
import BasisPengetahuanService from "../../services/basisPengetahuan";
import { useNavigate } from "react-router-dom";
import { swalAdd } from "../../utils/Swal";

const gejalaService = new GejalaService();
const penyakitService = new PenyakitService();
const basisPengetahuanService = new BasisPengetahuanService();

const AddBasisPengetahuan = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    kode_basis_pengetahuan: "",
    id_penyakit: "",
  });

  const [gejala, setGejala] = useState([]);
  const [penyakit, setPenyakit] = useState([]);

  const getAllGejala = async () => {
    try {
      const data = await gejalaService.getAll();
      setGejala(data);
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

  useEffect(() => {
    getAllGejala();
    getAllPenyakit();
  }, []);

  const [selectedGejala, setSelectedGejala] = useState([]);

  const handleCheckboxChange = (event) => {
    const id = event.target.value;
    setSelectedGejala((prevSelected) => {
      if (prevSelected.includes(id)) {
        // Jika ID sudah ada di array, hapus ID tersebut
        return prevSelected.filter((item) => item !== id);
      } else {
        // Jika ID belum ada di array, tambahkan ID tersebut
        return [...prevSelected, id];
      }
    });
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
      if (data.kode_basis_pengetahuan === "" || data.id_penyakit === "") {
        notify("error", "Data basis pengetahuan tidak boleh kosong", 1500);
        return;
      }

      const postData = selectedGejala.map((id) => ({
        kode_basis_pengetahuan: data.kode_basis_pengetahuan,
        id_penyakit: parseInt(data.id_penyakit),
        id_gejala: parseInt(id),
      }));

      await basisPengetahuanService.createBasisPengetahuan(postData);
      swalAdd();
      navigate("/admin/basis-pengetahuan");
    } catch (error) {
      console.log(error);
      notify("error", `Maaf, ${error.response.data.message}`, 3000);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="h-full flex flex-col justify-center">
        <h1 className="text-3xl font-bold my-2">Tambah Basis Pengetahuan</h1>

        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="kode_basis_pengetahuan"
            label="Kode Basis Pengetahuan"
            placeholder="Masukkan Kode Basis Pengetahuan Cth. P12"
            value={data.kode_basis_pengetahuan}
            onChange={handleInput}
          />

          <div>
            <label
              className="block text-md font-semibold leading-6 text-gray-900 my-2"
              htmlFor="penyakit"
            >
              Penyakit
            </label>
            <Select
              name="id_penyakit"
              className="py-3 ps-4 pe-5 block w-full border-2 border-gray-200 bg-white rounded-lg text-md font-medium focus:border-blue-500 focus:border-1 focus:ring-blue-500 focus:outline-none"
              value={data.id_penyakit}
              onChange={handleInput}
              required
            >
              <option value="" selected disabled>
                Pilih Penyakit
              </option>
              {penyakit?.map((item, i) => (
                <option key={i} value={item.id}>
                  {item.penyakit}
                </option>
              ))}
            </Select>
          </div>

          <div className="mt-4">
            <label className="block text-md font-semibold leading-6 text-gray-900 my-2  ">
              Pilih Gejala
            </label>
            <hr className="mt-2 mb-3" />
            {gejala?.map((item, i) => (
              <div className="flex items-center gap-3" key={i}>
                <Input
                  type="checkbox"
                  name="gejala"
                  value={item.id}
                  id={item.id}
                  onChange={handleCheckboxChange}
                />
                <label
                  className="block text-md font-semibold leading-6 text-gray-900 my-2"
                  htmlFor={item.id}
                >
                  {item.gejala}
                </label>
              </div>
            ))}
          </div>
          <button
            className="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 bg-blue-500 hover:bg-blue-700 text-white w-full"
            type="submit"
          >
            Tambah
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBasisPengetahuan;
