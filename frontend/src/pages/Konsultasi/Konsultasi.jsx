import { useState, useEffect } from "react";
import Input from "../../components/Input/Input";
import GejalaService from "../../services/gejala";
import CaseService from "../../services/case";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const gejalaService = new GejalaService();
const caseService = new CaseService();

const Konsultasi = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    umur: "",
    jenis_kelamin: "",
  });
  const [gejala, setGejala] = useState([]);
  const [gejalaSelected, setGejalaSelected] = useState([]);

  const getAll = async () => {
    try {
      const data = await gejalaService.getAll();
      setGejala(data);
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

  const handleCheckboxChange = (event) => {
    const id = event.target.value;
    setGejalaSelected((prevSelected) => {
      if (prevSelected.includes(id)) {
        // Jika ID sudah ada di array, hapus ID tersebut
        return prevSelected.filter((item) => item !== id);
      } else {
        // Jika ID belum ada di array, tambahkan ID tersebut
        return [...prevSelected, id];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (data.name === "" || data.umur === "" || data.jenis_kelamin === "") {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Data harus diisi semua!",
        });
        return;
      }

      let umur = parseInt(data.umur);

      if (umur < 0 && umur > 5) {
        console.log(umur);
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Umur harus diantara 0 - 5 tahun!",
        });
        return;
      }

      const gejala = gejalaSelected.map((item) => {
        return {
          id_gejala: parseInt(item),
        };
      });
      data.umur = parseFloat(data.umur);
      data.gejala = gejala;
      const kode_case = await caseService.createCase(data);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Konsultasi berhasil dilakukan!",
      });
      setData({
        name: "",
        umur: "",
        jenis_kelamin: "",
      });
      setGejalaSelected([]);

      const timeOut = setTimeout(() => {
        navigate(`/kasus/hasil/${kode_case}`);
      }, 1500);

      return () => clearTimeout(timeOut);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold mb-3">Konsultasi</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nama"
          name="name"
          type="text"
          placeholder="Masukan Nama"
          value={data.name}
          onChange={handleInput}
        />

        {/* start */}

        <div className="flex items-center gap-10">
          <div className="w-1/2">
            <Input
              label="Umur (0-5 Tahun)"
              name="umur"
              type="number"
              placeholder="Masukan Umur"
              value={data.umur}
              onChange={handleInput}
            />
          </div>
          <div>
            <label className="block text-md font-semibold leading-6 text-gray-900 mb-2  ">
              Jenis Kelamin
            </label>
            <div className="flex items-start gap-4">
              <div className="flex items-center gap-3">
                <Input
                  name="jenis_kelamin"
                  type="radio"
                  placeholder="Masukan Jenis Kelamin"
                  id="laki"
                  value="Laki-laki"
                  onChange={handleInput}
                />
                <label
                  className="block text-md font-semibold leading-6 text-gray-900 mb-2"
                  htmlFor="laki"
                >
                  Laki-Laki
                </label>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  name="jenis_kelamin"
                  type="radio"
                  placeholder="Masukan Jenis Kelamin"
                  value="Perempuan"
                  id="perempuan"
                  onChange={handleInput}
                />
                <label
                  className="block text-md font-semibold leading-6 text-gray-900 mb-2"
                  htmlFor="perempuan"
                >
                  Perempuan
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* end */}

        <div className="mt-3">
          <label className="block text-md font-semibold leading-6 text-gray-900 mb-2  ">
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
          className="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 bg-cyan-500 hover:bg-cyan-700 text-white w-full"
          type="submit"
        >
          Proses
        </button>
      </form>
    </>
  );
};

export default Konsultasi;
