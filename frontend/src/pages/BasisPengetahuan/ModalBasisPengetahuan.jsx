import { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import { Select } from "@headlessui/react";
import notify from "../../utils/notify";
import { ToastContainer } from "react-toastify";

const ModalBasisPengetahuan = ({
  open,
  handleOpen,
  gejala,
  item,
  addData,
  updateData,
}) => {
  const [data, setData] = useState(item);
  const [title, setTitle] = useState("Tambah Gejala");

  const handleInput = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    if (title === "Edit Gejala") {
      console.log(data);
      if (data.id_gejala !== "") {
        await updateData({
          id: item.id,
          id_gejala: data.id_gejala,
        });
      }
    }

    if (title === "Tambah Gejala") {
      if (data.id_gejala !== "") {
        await addData(data.id_gejala);
      } else {
        notify("error", "Data tidak boleh kosong", 1500);
        return;
      }
    }

    setData({
      id_gejala: "",
    });

    handleOpen();
  };

  useEffect(() => {
    if (open && item.id) {
      setTitle("Edit Gejala");
    } else {
      const timeout = setTimeout(() => {
        setTitle("Tambah Gejala");
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [open, item.id]);

  return (
    <Modal open={open} handleOpen={handleOpen}>
      <ToastContainer />
      <div className="bg-white px-8 pb-4 pt-5 sm:p-6 sm:pb-4">
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="flex flex-col">
          <div>
            <Select
              name="id_gejala"
              className="py-3 ps-4 mt-2 pe-5 block w-full border-2 border-gray-200 bg-white rounded-lg text-md font-medium focus:border-blue-500 focus:border-1 focus:ring-blue-500 focus:outline-none"
              value={data.id}
              onChange={handleInput}
              required
            >
              <option value="" selected disabled>
                Pilih Gejala
              </option>
              {gejala?.map((itemGejala, i) => (
                <option
                  key={i}
                  value={itemGejala.id}
                  selected={item.id_gejala === itemGejala.id}
                >
                  {itemGejala.gejala}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          onClick={() => handleSubmit()}
          className={`inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto ${
            title === "Tambah Gejala"
              ? "bg-blue-600 hover:bg-blue-500"
              : "bg-yellow-600 hover:bg-yellow-500"
          }`}
        >
          {title === "Tambah Gejala" ? "Tambah" : "Edit"}
        </button>
        <button
          type="button"
          data-autofocus
          onClick={() => handleOpen(false)}
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ModalBasisPengetahuan;
