import { useContext } from "react";
import { SidebarContext } from "../../contexts/SidebarContext";
import { FaHome, FaRegUser } from "react-icons/fa";
import {
  MdLogin,
  // MdAppRegistration,
  MdOutlineLogout,
  MdOutlineHealthAndSafety,
  MdOutlineCases,
} from "react-icons/md";
import { RiHealthBookLine } from "react-icons/ri";
import { GiHealing } from "react-icons/gi";
import { TbHealthRecognition } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { AuthContenxt } from "../../contexts/AuthContext";
import { AiOutlineSolution } from "react-icons/ai";
import Swal from "sweetalert2";
import { SiConsul } from "react-icons/si";

const menuUser = [
  {
    icon: <FaHome />,
    menu: "Home",
    toLink: "/home",
  },
  {
    icon: <SiConsul />,
    menu: "Konsultasi",
    toLink: "/konsultasi",
  },
  {
    icon: <MdLogin />,
    menu: "Login as Admin",
    toLink: "/login",
  },
  // {
  //   icon: <MdAppRegistration />,
  //   menu: "Register",
  //   toLink: "/register",
  // },
];
const menuAdmin = [
  {
    icon: <RiHealthBookLine />,
    menu: "Penyakit",
    toLink: "/admin/penyakit",
  },
  {
    icon: <GiHealing />,
    menu: "Gejala",
    toLink: "/admin/gejala",
  },
  {
    icon: <AiOutlineSolution />,
    menu: "Solusi",
    toLink: "/admin/solusi",
  },
  {
    icon: <MdOutlineHealthAndSafety />,
    menu: "Basis Pengetahuan",
    toLink: "/admin/basis-pengetahuan",
  },
  {
    icon: <MdOutlineCases />,
    menu: "Data Kasus",
    toLink: "/admin/kasus",
  },
  {
    icon: <FaRegUser />,
    menu: "Akun",
    toLink: "/admin/akun",
  },
];

const Sidebar = () => {
  const { isOpen } = useContext(SidebarContext);
  const { role, logout } = useContext(AuthContenxt);
  const handleShowLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  return (
    <div
      className={`${
        isOpen ? "w-1/5" : "w-0"
      } min-h-screen max-h-max  bg-gray-800 text-white transition-all duration-300 overflow-hidden`}
    >
      <div className="flex items-center justify-center py-4 px-2">
        <TbHealthRecognition className="text-white text-7xl mx-4" />
        <h1 className="text-white text-3xl font-semibold md:text-md sm:text-lg">
          Stunting Diagnosis
        </h1>
      </div>
      <ul className="flex flex-col justify-start p-4">
        {role === "admin"
          ? menuAdmin.map((item, index) => (
              <NavLink
                className={({ isActive }) =>
                  `font-semibold px-4 py-2 md:text-md sm:text-lg hover:bg-gray-700 cursor-pointer flex items-center gap-2 text-lg hover:scale-110 duration-300 ${
                    isActive && "bg-gray-700"
                  }`
                }
                key={index}
                to={item.toLink}
              >
                {item.icon} {item.menu}
              </NavLink>
            ))
          : menuUser.map((item, index) => (
              <NavLink
                className={({ isActive }) =>
                  `font-semibold px-4 py-2 md:text-md sm:text-lg hover:bg-gray-700 cursor-pointer flex items-center gap-2 text-lg hover:scale-110 duration-300 ${
                    isActive && "bg-gray-700"
                  }`
                }
                key={index}
                to={item.toLink}
              >
                {item.icon} {item.menu}
              </NavLink>
            ))}

        {role === "admin" || role === "user" ? (
          <div
            className="font-semibold px-4 py-2 md:text-md sm:text-lg hover:bg-gray-700 cursor-pointer flex items-center gap-2 text-lg hover:scale-110 duration-300"
            onClick={handleShowLogout}
          >
            <MdOutlineLogout /> Logout
          </div>
        ) : (
          " "
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
