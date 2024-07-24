import Modal from "./Modal";
import { BsTrash3 } from "react-icons/bs";

const ModalDelete = ({ open, handleOpen }) => {
  return (
    <Modal open={open} handleOpen={handleOpen}>
      <div className="bg-white px-8 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="flex items-center gap-5">
          <div className="p-5 rounded-full bg-red-200 ">
            <BsTrash3 className="text-2xl text-red-500" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">Hapus Data</h1>
            <p className="text-lg">Apakah anda yakin menghapus data ini?</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          type="button"
          onClick={() => handleOpen(false)}
        >
          Tidak
        </button>
        <button
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:mr-2 sm:w-auto"
          type="button"
        >
          Ya
        </button>
      </div>
    </Modal>
  );
};

export default ModalDelete;
