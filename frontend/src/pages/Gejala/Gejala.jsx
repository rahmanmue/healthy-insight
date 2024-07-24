import { useState, useEffect } from "react";
import GejalaService from "../../services/gejala";
import ModalGejala from "./ModalGejala";
// import ModalDelete from "../../components/Modal/ModalDelete";
// import ModalLogout from "../../components/Modal/ModalLogout";

const gejalaService = new GejalaService();

const Gejala = () => {
  // get all gejala
  const [gejala, setGejala] = useState([]);
  useEffect(() => {
    gejalaService
      .getAll()
      .then((data) => setGejala(data))
      .catch((error) => console.log(error));
  }, []);

  // show modal
  const [open, setOpen] = useState(false);
  const [itemData, setItemData] = useState({});
  const [showDelete, setShowDelete] = useState(false);

  const handleShowDelete = () => {
    setShowDelete(!showDelete);
  };

  const handleOpen = (bool, itemData) => {
    setItemData(itemData || {});
    setOpen(bool);
  };

  return (
    <>
      <div className="flex justify-between mb-5">
        <h1 className="text-3xl font-bold">Gejala</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() => handleOpen(true)}
        >
          + Gejala
        </button>
      </div>

      <ModalGejala open={open} handleOpen={handleOpen} item={itemData} />
      {/* <ModalDelete open={showDelete} handleOpen={handleShowDelete} /> */}
      {/* <ModalLogout open={showDelete} handleOpen={handleShowDelete} /> */}

      <div className="flex flex-col">
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
                      No
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-bold text-dark  uppercase"
                    >
                      Gejala
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-bold text-dark  uppercase"
                    >
                      Bobot
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-bold text-dark  uppercase"
                    >
                      AKSI
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 ">
                  {gejala.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-wrap text-sm text-gray-800 ">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-wrap text-sm text-gray-800 ">
                        {item.gejala}
                      </td>
                      <td className="px-6 py-4 whitespace-wrap text-center text-sm text-gray-800 ">
                        {item.nilai_bobot}
                      </td>
                      <td className="px-6 py-4 whitespace-wrap  text-sm font-bold flex justify-center gap-5">
                        <button
                          onClick={() => handleOpen(true, item)}
                          type="button"
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-yellow-600 hover:text-yellow-800 focus:outline-none focus:text-yellow-800 disabled:opacity-50 disabled:pointer-events-none "
                        >
                          EDIT
                        </button>
                        <button
                          onClick={() => handleShowDelete(true)}
                          type="button"
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 focus:outline-none focus:text-red-800 disabled:opacity-50 disabled:pointer-events-none "
                        >
                          HAPUS
                        </button>
                      </td>
                    </tr>
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

export default Gejala;
