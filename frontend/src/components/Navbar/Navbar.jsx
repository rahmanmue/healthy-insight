import { useContext } from "react";
import { AuthContenxt } from "../../contexts/AuthContext";
import { SidebarContext } from "../../contexts/SidebarContext";
import { FaBars, FaTimes } from "react-icons/fa";
import { TbHealthRecognition } from "react-icons/tb";

const Navbar = () => {
  const { isOpen, toggleSidebar } = useContext(SidebarContext);
  const { role } = useContext(AuthContenxt);

  return (
    <div className="h-16 bg-gray-800 flex items-center shadow-md sticky-top">
      <div className="container mx-auto flex justify-between items-center">
        <button className="text-white w-full" onClick={toggleSidebar}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
        <div
          className={`${
            isOpen ? "hidden" : "block"
          } w-full flex justify-center items-center gap-3`}
        >
          <TbHealthRecognition className="text-white text-3xl" />
          <h1 className="text-white text-xl">Stunting Diagnosis</h1>
        </div>

        <div className="w-full flex justify-end text-white text-md font-bold">
          {role === "admin" ? "Hello, Admin!" : ""}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
