import { useContext } from "react";
import { AuthContenxt } from "../../contexts/AuthContext";
import { SidebarContext } from "../../contexts/SidebarContext";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdOutlineInsights } from "react-icons/md";
import { MdLightMode, MdNightlight } from "react-icons/md";
const Navbar = () => {
  const { isOpen, toggleSidebar, changeTheme, theme } =
    useContext(SidebarContext);
  const { role } = useContext(AuthContenxt);

  return (
    <div className="h-16 bg-white dark:bg-slate-800 flex items-center sticky-top">
      <div className="container mx-auto flex justify-between items-center">
        <button
          className="text-slate-700 w-full dark:text-white"
          onClick={toggleSidebar}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
        <div
          className={`${
            isOpen ? "hidden" : "block"
          } w-full flex justify-center items-center gap-3`}
        >
          <MdOutlineInsights className="text-green-500 text-3xl" />
          <h1 className="text-slate-700 text-xs lg:text-xl font-bold dark:text-white">
            Healthy Insight
          </h1>
        </div>

        <div className="w-full flex justify-end text-slate-700 dark:text-white text-md font-bold gap-3">
          <button
            className="text-slate-700 dark:text-white"
            onClick={changeTheme}
          >
            {theme === "light" ? <MdNightlight /> : <MdLightMode />}
          </button>

          <p> {role === "admin" ? "Hello, Admin!" : ""}</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
