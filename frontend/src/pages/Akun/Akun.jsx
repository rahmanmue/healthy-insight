import { useState, useContext, useEffect } from "react";
import { AuthContenxt } from "../../contexts/AuthContext";
import Input from "../../components/Input/Input";
import { ToastContainer } from "react-toastify";
import notify from "../../utils/notify";
import "react-toastify/dist/ReactToastify.css";
import UserService from "../../services/user";
import { swalUpdate } from "../../utils/Swal";

const userService = new UserService();

const Akun = () => {
  const { userId } = useContext(AuthContenxt);
  const [data, setData] = useState({
    id: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const getUserById = async (id) => {
    const response = await userService.getUserById(id);
    console.log(response);
    setData({
      ...data,
      id: response.id,
      username: response.username,
      email: response.email,
    });
  };

  const handleOnChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (data.password !== data.confirmPassword) {
        notify("error", "Password dan Konfirmasi Password harus Sama");
        return;
      }

      const payload = {
        id: data.id,
        username: data.username,
        email: data.email,
      };

      if (data.password !== "" && data.confirmPassword !== "") {
        payload.password = data.password;
      }

      await userService.updateUser(payload);
      swalUpdate();

      // reset form
      setData({
        ...data,
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.log(err);
      notify("error", err.response.data.message);
    }
  };

  useEffect(() => {
    getUserById(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-full flex flex-col justify-center">
      <h1 className="text-3xl font-bold my-2">Update Akun</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <Input
          label="Username"
          name="username"
          type="text"
          placeholder="Username"
          value={data.username}
          onChange={handleOnChange}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={handleOnChange}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={handleOnChange}
        />
        <Input
          label="Konfirmasi Password"
          name="confirmPassword"
          type="password"
          placeholder="Konfirmasi Password"
          value={data.confirmPassword}
          onChange={handleOnChange}
        />
        <button
          className="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 bg-blue-500 hover:bg-blue-700 text-white w-full"
          type="submit"
        >
          SIMPAN
        </button>
      </form>
    </div>
  );
};

export default Akun;
