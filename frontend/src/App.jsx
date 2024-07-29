import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Penyakit from "./pages/Penyakit/Penyakit";
import Kasus from "./pages/Kasus/Kasus";
import Gejala from "./pages/Gejala/Gejala";
import Akun from "./pages/Akun/Akun";
import BasisPengetahuan from "./pages/BasisPengetahuan/BasisPengetahuan";
import AddBasisPengetahuan from "./pages/BasisPengetahuan/AddBasisPengetahuan";
import DetailBasisPengetahuan from "./pages/BasisPengetahuan/DetailBasisPengetahuan";
import DetailKasus from "./pages/Kasus/DetailKasus";
import Solusi from "./pages/Solusi/Solusi";
import EditSolusi from "./pages/Solusi/EditSolusi";
import Konsultasi from "./pages/Konsultasi/Konsultasi";
import MainLayout from "./components/MainLayout/MainLayout";
import AddSolusi from "./pages/Solusi/AddSolusi";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/konsultasi" element={<Konsultasi />} />
          <Route path="/login" element={<Login />} />
          <Route path="/kasus/hasil/:kode_case" element={<DetailKasus />} />

          <Route element={<PrivateRoute roles={["admin"]} />}>
            <Route path="/register" element={<Register />} />
            <Route path="/admin/kasus" element={<Kasus />} />
            <Route path="/admin/penyakit" element={<Penyakit />} />
            <Route path="/admin/gejala" element={<Gejala />} />
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
            <Route path="/admin/solusi" element={<Solusi />} />
            <Route path="/admin/solusi/edit/:id" element={<EditSolusi />} />
            <Route path="/admin/solusi/add" element={<AddSolusi />} />
            <Route path="/admin/akun" element={<Akun />} />
          </Route>
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
