import { useContext, useState } from "react";
import { SidebarContext } from "../../contexts/SidebarContext";
import { FaHome, FaUserFriends } from "react-icons/fa";
import {
  MdLogin,
  MdAppRegistration,
  MdOutlineLogout,
  MdOutlineHealthAndSafety,
  MdOutlineCases,
} from "react-icons/md";
import { RiHealthBookLine } from "react-icons/ri";
import { SiKnowledgebase } from "react-icons/si";
import { TbHealthRecognition } from "react-icons/tb";
import { Link } from "react-router-dom";
import { AuthContenxt } from "../../contexts/AuthContext";
import ModalLogout from "../Modal/ModalLogout";

const menuUser = [
  {
    icon: <FaHome />,
    menu: "Home",
    toLink: "/home",
  },
  {
    icon: <MdOutlineHealthAndSafety />,
    menu: "Cek Stunting",
    toLink: "/stunting-diagnosis",
  },
  {
    icon: <MdLogin />,
    menu: "Login",
    toLink: "/login",
  },
  {
    icon: <MdAppRegistration />,
    menu: "Register",
    toLink: "/register",
  },
];
const menuAdmin = [
  {
    icon: <MdOutlineHealthAndSafety />,
    menu: "Penyakit",
    toLink: "/admin/penyakit",
  },
  {
    icon: <RiHealthBookLine />,
    menu: "Gejala",
    toLink: "/admin/gejala",
  },
  {
    icon: <SiKnowledgebase />,
    menu: "Basis Pengetahuan",
    toLink: "/admin/basis-pengetahuan",
  },
  {
    icon: <MdOutlineCases />,
    menu: "Data Kasus",
    toLink: "/kasus",
  },
  {
    icon: <FaUserFriends />,
    menu: "Data User",
    toLink: "/admin/user",
  },
  // {
  //   icon: <MdOutlineLogout />,
  //   menu: "Logout",
  //   toLink: "/login",
  // },
];

const Sidebar = () => {
  const { isOpen } = useContext(SidebarContext);
  const { role } = useContext(AuthContenxt);
  const [showLogout, setShowLogout] = useState(false);
  const handleShowLogout = () => {
    setShowLogout(!showLogout);
  };

  return (
    <div
      className={`${
        isOpen ? "w-1/5" : "w-0"
      } min-h-screen max-h-max  bg-gray-800 text-white transition-all duration-300 overflow-hidden`}
    >
      <div className="flex items-center justify-center py-4 px-2">
        <TbHealthRecognition className="text-white text-7xl mx-4" />
        <h1 className="text-white text-3xl font-semibold">
          Stunting Diagnosis
        </h1>
      </div>
      <ul className="flex flex-col p-4">
        {role === "admin"
          ? menuAdmin.map((item, index) => (
              <Link
                className="font-semibold px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2 text-lg hover:scale-110 "
                key={index}
                to={item.toLink}
              >
                {item.icon} {item.menu}
              </Link>
            ))
          : menuUser.map((item, index) => (
              <Link
                className="font-semibold px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2 text-lg hover:scale-110 duration-300"
                key={index}
                to={item.toLink}
              >
                {item.icon} {item.menu}
              </Link>
            ))}

        {role === "admin" || role === "user" ? (
          <div
            className="font-semibold px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2 text-lg hover:scale-110 duration-300"
            onClick={handleShowLogout}
          >
            <MdOutlineLogout /> Logout
          </div>
        ) : (
          " "
        )}
      </ul>
      <ModalLogout open={showLogout} handleOpen={handleShowLogout} />
    </div>
  );
};

export default Sidebar;
