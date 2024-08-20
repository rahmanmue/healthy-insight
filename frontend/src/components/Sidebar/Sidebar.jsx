import { useContext } from "react";
import { SidebarContext } from "../../contexts/SidebarContext";
import { FaRegUser } from "react-icons/fa";
import {
  MdLogin,
  // MdAppRegistration,
  MdOutlineLogout,
  MdOutlineInsights,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import { AuthContenxt } from "../../contexts/AuthContext";
import { AiOutlineSolution } from "react-icons/ai";
import Swal from "sweetalert2";
import { SiConsul } from "react-icons/si";
import { SiPowerpages } from "react-icons/si";
import { TbHealthRecognition } from "react-icons/tb";
import { GoGitMergeQueue } from "react-icons/go";
import { CiMedicalCross } from "react-icons/ci";
import { CiMedicalMask } from "react-icons/ci";

const menuUser = [
  {
    icon: <SiPowerpages />,
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
    menu: "Login Admin",
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
    icon: <CiMedicalCross />,
    menu: "Penyakit",
    toLink: "/admin/penyakit",
  },
  {
    icon: <CiMedicalMask />,
    menu: "Gejala",
    toLink: "/admin/gejala",
  },
  {
    icon: <AiOutlineSolution />,
    menu: "Solusi",
    toLink: "/admin/solusi",
  },
  {
    icon: <GoGitMergeQueue />,
    menu: "Data Kasus",
    toLink: "/admin/kasus",
  },
  {
    icon: <TbHealthRecognition />,
    menu: "Basis Pengetahuan",
    toLink: "/admin/basis-pengetahuan",
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
        isOpen ? "lg:w-1/5 inset-0 w-full h-full z-50 " : "w-0"
      } min-h-screen max-h-max  dark:bg-slate-800 bg-white transition-all duration-300 overflow-hidden `}
    >
      <div className="flex items-center justify-start py-4 mx-4">
        <MdOutlineInsights className="text-green-500 text-7xl me-4" />
        <div className="text-green-700 dark:text-white text-xl font-semibold md:text-md sm:text-lg">
          Healthy <span className="font-bold text-2xl">Insight</span>
        </div>
      </div>
      <ul className="flex flex-col justify-start p-4">
        {role === "admin"
          ? menuAdmin.map((item, index) => (
              <NavLink
                className={({ isActive }) =>
                  `font-light px-4 py-2 md:text-md sm:text-lg hover:bg-green-200 hover:text-green-800 dark:text-white dark:hover:bg-slate-700  cursor-pointer flex items-center gap-2 text-lg hover:scale-110 duration-300 ${
                    isActive &&
                    "dark:text-white dark:bg-slate-700 bg-green-200 text-green-800"
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
                  `font-light px-4 py-2 md:text-md sm:text-lg hover:bg-green-200 hover:text-green-800 dark:text-white dark:hover:bg-slate-700  cursor-pointer flex items-center gap-2 text-lg hover:scale-110 duration-300 ${
                    isActive &&
                    "dark:text-white dark:bg-slate-700 bg-green-200 text-green-800"
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
            className="font-light px-4 py-2 md:text-md sm:text-lg hover:bg-green-200 hover:text-green-800 dark:hover:bg-slate-700 dark:text-white cursor-pointer flex items-center gap-2 text-lg hover:scale-110 duration-300"
            onClick={handleShowLogout}
          >
            <MdOutlineLogout /> Logout
          </div>
        ) : (
          " "
        )}
      </ul>
      {/* 
      <div
        className="absolute top-0 right-0 p-4 cursor-pointer"
        onClick={toggleSidebar}
      >
        Klik
      </div> */}
    </div>
  );
};

export default Sidebar;
