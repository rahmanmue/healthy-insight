import { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import Input from "../../components/Input/Input";
import notify from "../../utils/notify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalPenyakit = ({ open, handleOpen, item, addData, updateData }) => {
  const [data, setData] = useState(item);
  const [title, setTitle] = useState("Tambah Penyakit");

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (title === "Edit Penyakit") {
      await updateData({
        id: item.id,
        penyakit: data.penyakit ? data.penyakit : item.penyakit,
      });
    }

    if (title === "Tambah Penyakit") {
      if (data.penyakit !== "") {
        await addData({
          penyakit: data.penyakit,
        });
      } else {
        notify("error", "Data tidak boleh kosong", 1500);
        return;
      }
    }

    setData({
      penyakit: "",
    });

    handleOpen();
  };

  useEffect(() => {
    if (open && item.id) {
      setTitle("Edit Penyakit");
    } else {
      const timeout = setTimeout(() => {
        setTitle("Tambah Penyakit");
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [open, item.id]);

  return (
    <Modal open={open} handleOpen={handleOpen}>
      <ToastContainer />
      <div className="bg-white px-8 pb-4 pt-5 sm:p-6 sm:pb-4">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <div className="flex flex-col">
          <Input
            name="penyakit"
            type="text"
            placeholder="Penyakit"
            defaultValue={item?.penyakit || ""}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          onClick={() => handleSubmit()}
          className={`inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto ${
            title === "Tambah Penyakit"
              ? "bg-blue-600 hover:bg-blue-500"
              : "bg-yellow-500 hover:bg-yellow-600"
          }`}
        >
          {title === "Tambah Penyakit" ? "Tambah" : "Edit"}
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

export default ModalPenyakit;
