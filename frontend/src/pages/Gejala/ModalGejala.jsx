import { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import Input from "../../components/Input/Input";

const ModalGejala = ({ open, handleOpen, item }) => {
  const [data, setData] = useState(item);
  const [title, setTitle] = useState("Add Gejala");

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

    console.log(data);
  };

  useEffect(() => {
    if (open && item.id) {
      setTitle("Edit Gejala");
    } else {
      const timeout = setTimeout(() => {
        setTitle("Add Gejala");
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [open, item.id]);

  return (
    <Modal open={open} handleOpen={handleOpen}>
      <div className="bg-white px-8 pb-4 pt-5 sm:p-6 sm:pb-4">
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="flex flex-col">
          <Input
            label="Gejala"
            name="gejala"
            type="text"
            placeholder="Gejala"
            defaultValue={item?.gejala || ""}
            onChange={handleChange}
          />
          <Input
            label="Bobot"
            name="nilai_bobot"
            type="number"
            placeholder="Bobot"
            defaultValue={item?.nilai_bobot || ""}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          onClick={() => handleOpen(false)}
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
        >
          Deactivate
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

export default ModalGejala;
