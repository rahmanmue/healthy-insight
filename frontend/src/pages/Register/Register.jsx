import { useContext, useState } from "react";
import { AuthContenxt } from "../../contexts/AuthContext";
import Input from "../../components/Input/Input";
import { ToastContainer } from "react-toastify";
import notify from "../../utils/notify";
import "react-toastify/dist/ReactToastify.css";
// import { Navigate, Link, useNavigate } from "react-router-dom";

const Register = () => {
  // const navigate = useNavigate();
  const { register } = useContext(AuthContenxt);

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const reset = () => {
    setData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      data.username === "" ||
      data.email === "" ||
      data.password === "" ||
      data.confirmPassword === ""
    ) {
      notify("error", "Data tidak boleh kosong");
      return;
    }

    if (data.password !== data.confirmPassword) {
      notify("error", "Password dan Konfirmasi Password harus Sama");
      return;
    }

    try {
      const payload = {
        username: data.username,
        email: data.email,
        password: data.password,
      };
      const res = await register(payload);
      notify("success", res.message, 2000, true);
      reset();
      // setTimeout(() => {
      //   navigate("/login");
      // }, 2000);
    } catch (err) {
      console.log(err);
      notify("error", err.response.data.message);
    }
  };

  return (
    <div className="h-full flex flex-col justify-center">
      <h1 className="text-3xl font-bold my-2">Register</h1>
      <ToastContainer />
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input
          label="Username"
          name="username"
          type="text"
          placeholder="Username"
          value={data.username}
          onChange={(e) => handleOnChange(e)}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => handleOnChange(e)}
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => handleOnChange(e)}
        />
        <Input
          label="Konfirmasi Password"
          name="confirmPassword"
          type="password"
          placeholder="Konfirmasi Password"
          value={data.confirmPassword}
          onChange={(e) => handleOnChange(e)}
        />
        <button
          className="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 bg-blue-500 hover:bg-blue-700 text-white w-full"
          type="submit"
        >
          REGISTER
        </button>
      </form>
    </div>
  );
};

export default Register;
