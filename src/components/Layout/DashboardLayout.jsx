
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BlogContext } from "../../ContextApi/BlogContext";
import DashboardSidebar from "../Sidebar/DashboardSidebar";
import DashboardSidebarMobile from "../Sidebar/DashboardSidebarMobile";


const DashboardLayout = ({ children }) => {
  const router = useNavigate();
  const { isMobileNavOpen, setIsMobileNavOpen } = useContext(BlogContext);

  const ls=typeof window !== 'undefined' ? window.localStorage:null 
  const user=JSON.parse(ls?.getItem("user"))


  return (
    <div className="flex  ">
      {/* sidebar */}
      <DashboardSidebar />

      {isMobileNavOpen && (
        <div className="w-full">
          <DashboardSidebarMobile />
        </div>
      )}
      {/* children */}
      <div className="flex-grow flex flex-col w-[80%]">

        {/* children upper part start */}
        {/* <div className="bg-gray-300  flex justify-between items-center py-6 px-5 w-full">
          <div className="  font-bold flex items-center  gap-3">
            <div className="w-8 h-8 bg-white rounded-full overflow-hidden">
              <img src="https://i.ibb.co/rpQczPG/male.jpg" alt="" />
            </div>
            <div>
              <span>{user?.name}</span>
            </div>
          </div>
         
          <div
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="block lg:hidden"
          >
            <CiMenuFries />
          </div>
        </div> */}
        {/* children upper part end */}
        <div className="lg:px-3 py-5 lg:py-5 min-h-screen flex-grow bg-gray-300  w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
