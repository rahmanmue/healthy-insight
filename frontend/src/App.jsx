import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Penyakit from "./pages/Penyakit/Penyakit";
import Case from "./pages/Case/Case";
import Gejala from "./pages/Gejala/Gejala";
import User from "./pages/User/User";
import BasisPengetahuan from "./pages/BasisPengetahuan/BasisPengetahuan";
import AddBasisPengetahuan from "./pages/BasisPengetahuan/AddBasisPengetahuan";
import DetailBasisPengetahuan from "./pages/BasisPengetahuan/DetailBasisPengetahuan";
import DetailCase from "./pages/Case/DetailCase";
// import PrivateRoute from "./routes/PrivateRoute";
import MainLayout from "./components/MainLayout/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          {/* <Route path="/" element={<PrivateRoute roles={["admin", "user"]} />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route> */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/kasus" element={<Case />} />
          <Route path="/admin/penyakit" element={<Penyakit />} />
          <Route path="/admin/gejala" element={<Gejala />} />
          <Route path="/admin/user" element={<User />} />
          <Route
            path="/admin/basis-pengetahuan"
            element={<BasisPengetahuan />}
          />
          <Route
            path="/admin/basis-pengetahuan/add"
            element={<AddBasisPengetahuan />}
          />
          <Route
            path="/admin/basis-pengetahuan/detail/:kode_bp"
            element={<DetailBasisPengetahuan />}
          />

          <Route path="/case/hasil/:kode_case" element={<DetailCase />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
