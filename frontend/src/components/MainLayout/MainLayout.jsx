import { AuthContextProvider } from "../../contexts/AuthContext";
import { SidebarContextProvider } from "../../contexts/SidebarContext";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
const MainLayout = ({ children }) => {
  return (
    <AuthContextProvider>
      <SidebarContextProvider>
        <div className="flex min-h-screen font-sans">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Navbar />
            <div className="flex-1 p-5 bg-slate-50 overflow-auto">
              <div className="w-full bg-white shadow-sm p-10 rounded-md min-h-screen max-h-max">
                {children}
              </div>
            </div>
          </div>
        </div>
      </SidebarContextProvider>
    </AuthContextProvider>
  );
};

export default MainLayout;
