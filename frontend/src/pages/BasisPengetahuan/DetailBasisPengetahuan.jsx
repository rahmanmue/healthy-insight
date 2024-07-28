import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BasisPengetahuanService from "../../services/basisPengetahuan";
import GejalaService from "../../services/gejala";
import ModalBasisPengetahuan from "./ModalBasisPengetahuan";
import { swalAdd, swalUpdate, swalDelete, swalError } from "../../utils/Swal";
import { IoMdAdd } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const gejalaService = new GejalaService();
const basisPengetahuanService = new BasisPengetahuanService();

const DetailBasisPengetahuan = () => {
  const { kode_bp } = useParams();
  const [data, setData] = useState({});
  const [gejala, setGejala] = useState([]);

  // show modal
  const [open, setOpen] = useState(false);
  const [itemData, setItemData] = useState({});

  const handleOpen = (itemData) => {
    setItemData(itemData || {});
    setOpen(!open);
  };

  const getDetail = async () => {
    try {
      const data = await basisPengetahuanService.getDetailBasisPengetahuan(
        kode_bp
      );
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllGejala = async () => {
    try {
      const data = await gejalaService.getAll();
      setGejala(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addData = async (id_gejala) => {
    try {
      const newData = {
        kode_basis_pengetahuan: kode_bp,
        id_penyakit: data.id_penyakit,
        id_gejala: id_gejala,
      };

      await basisPengetahuanService.createBasisPengetahuan([newData], false);
      swalAdd();
      getDetail();
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async (data) => {
    try {
      await basisPengetahuanService.updateGejalaBp(data);
      swalUpdate();
      getDetail();
    } catch (error) {
      swalError();
      console.log(error);
    }
  };

  const deleteData = async (id) => {
    swalDelete(async () => {
      await basisPengetahuanService.deleteGejalaBp(id);
      await getDetail();
    });
  };

  useEffect(() => {
    getDetail();
    getAllGejala();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex justify-between mb-7">
        <h1 className="text-3xl font-bold capitalize">
          {`Detail Basis Pengetahuan ${kode_bp} (${data?.penyakit})`}
        </h1>

        <button
          className="inline-flex w-full justify-center items-center rounded-lg uppercase bg-blue-600 px-5 py-2 text-md font-bold text-white shadow-sm hover:bg-blue-500 sm:mr-2 sm:w-auto"
          onClick={() => handleOpen()}
        >
          <IoMdAdd className="mr-2" /> Gejala
        </button>
      </div>

      <ModalBasisPengetahuan
        open={open}
        handleOpen={handleOpen}
        item={itemData}
        gejala={gejala}
        addData={addData}
        updateData={updateData}
      />

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
                      className="px-6 py-3 text-center text-xs font-bold text-dark  uppercase"
                    >
                      AKSI
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 ">
                  {data?.gejala?.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-wrap text-md font-bold text-gray-800 ">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-wrap text-md text-gray-800 ">
                        {item.gejala}
                      </td>

                      <td className="px-6 py-4 whitespace-wrap text-sm font-bold flex justify-center gap-2">
                        <button
                          onClick={() => handleOpen(item)}
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-yellow-500 text-white px-2 py-2 hover:bg-yellow-600 focus:outline-none"
                        >
                          <MdEdit className="text-lg" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteData(item.id)}
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-500 text-white px-2 py-2 hover:bg-red-600 focus:outline-none"
                        >
                          <FaRegTrashAlt className="text-lg" />
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

export default DetailBasisPengetahuan;
