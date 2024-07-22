import "./App.css";
import { useState } from "react";
import {
  FaHome,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="flex h-screen font-sans">
        <div
          className={`bg-gray-800 text-white h-full ${
            isOpen ? "w-1/4" : "w-0"
          } transition-all duration-300 overflow-hidden`}
        >
          <ul className="flex flex-col p-4">
            <div className="h-16 flex items-center p-4">
              <h1 className="text-xl">Stunt Diagnosis</h1>
            </div>
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
              <FaHome className="mr-2" /> Dashboard
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
              <FaUser className="mr-2" /> Profile
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
              <FaCog className="mr-2" /> Settings
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
              <FaSignOutAlt className="mr-2" /> Logout
            </li>
          </ul>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="bg-gray-800 text-white h-16 flex items-center p-4">
            <button className="text-white mr-4" onClick={toggleSidebar}>
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
            <h1 className="text-xl">My App</h1>
          </div>
          <div className="flex-1 p-10">
            <h1 className="text-4xl font-bold">Main Content</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
