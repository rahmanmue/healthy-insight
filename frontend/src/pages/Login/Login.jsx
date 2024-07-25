import { useContext, useState } from "react";
import { AuthContenxt } from "../../contexts/AuthContext";
import {
  Navigate,
  // Link
} from "react-router-dom";
import Input from "../../components/Input/Input";
import notify from "../../utils/notify";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const { role, login } = useContext(AuthContenxt);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  if (role === "admin") {
    return <Navigate to="/admin/dashboard" />;
  }

  const handleOnChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.email === "" || data.password === "") {
      notify("error", "Columns cannot be empty");
      return;
    }

    try {
      const payload = {
        email: data.email,
        password: data.password,
      };
      const role = await login(payload);
      if (role === "admin") {
        return navigate("/case");
      }
      return navigate("/penyakit");
    } catch (error) {
      console.log(error.response);
      notify("error", error.response.data.message, 2000, true);
    }
  };

  return (
    <div className="h-full flex flex-col justify-center">
      <h1 className="text-3xl font-bold my-2">Login Administrator</h1>
      {/* <p className="mb-2">
        Belum Punya Akun ?{" "}
        <Link className="text-blue-500 font-semibold" to="/register">
          Daftar Disini
        </Link>
      </p> */}

      <ToastContainer />

      <form onSubmit={(e) => handleSubmit(e)}>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Email"
          defaultValue={data.password}
          onChange={(e) => handleOnChange(e)}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
          defaultValue={data.password}
          onChange={(e) => handleOnChange(e)}
        />
        <button
          className="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 bg-blue-500 hover:bg-blue-700 text-white w-full"
          type="submit"
        >
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default Login;