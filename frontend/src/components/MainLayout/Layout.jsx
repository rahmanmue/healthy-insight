import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useContext } from "react";
import { SidebarContext } from "../../contexts/SidebarContext";

const Layout = ({ children }) => {
  const { isOpen } = useContext(SidebarContext);
  return (
    <div className="flex min-h-screen max-h-max font-sans">
      <Sidebar />
      <div
        className={`flex-1 flex flex-col ${isOpen ? "lg:ml-0 ml-0" : "ml-0"}`}
      >
        <Navbar />
        <div className="flex-1 p-5 bg-slate-50 dark:bg-slate-700 overflow-auto">
          <div className="w-full bg-white dark:bg-slate-800 dark:text-white shadow-sm p-10 rounded-md min-h-screen max-h-max">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
