import { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Select } from "@headlessui/react";
import PenyakitService from "../../services/penyakit";

const penyakitService = new PenyakitService();

const ModalUpdatePenyakit = ({ open, handleOpen, item, updateData }) => {
  const [data, setData] = useState({
    kode_basis_pengetahuan: item?.kode_basis_pengetahuan || "",
    id_penyakit: "",
  });
  const [penyakit, setPenyakit] = useState([]);

  const handleInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (data.id_penyakit !== "") {
      await updateData({
        kode_basis_pengetahuan: item.kode_basis_pengetahuan,
        id_penyakit: parseInt(data.id_penyakit),
      });
    }
    setData({
      kode_basis_pengetahuan: "",
      id_penyakit: "",
    });

    handleOpen();
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
    getAllPenyakit();
  }, [open]);

  return (
    <Modal open={open} handleOpen={handleOpen}>
      <ToastContainer />
      <div className="bg-white px-8 pb-4 pt-5 sm:p-6 sm:pb-4">
        <h1 className="text-3xl font-bold">Ubah Penyakit</h1>
        <div>
          <Select
            name="id_penyakit"
            className="py-3 ps-4 mt-2 pe-5 block w-full border-2 border-gray-200 bg-white rounded-lg text-md font-medium focus:border-blue-500 focus:border-1 focus:ring-blue-500 focus:outline-none"
            onChange={handleInput}
            required
          >
            <option value="" selected disabled>
              Pilih Penyakit
            </option>
            {penyakit?.map((itemPenyakit, i) => (
              <option
                key={i}
                value={itemPenyakit.id}
                selected={itemPenyakit.penyakit == item?.penyakit}
              >
                {itemPenyakit.penyakit}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          onClick={() => handleSubmit()}
          className="inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto bg-yellow-600 hover:bg-yellow-500"
        >
          Update
        </button>
        <button
          type="button"
          data-autofocus
          onClick={() => handleOpen()}
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ModalUpdatePenyakit;
