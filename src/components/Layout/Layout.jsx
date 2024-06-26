
import { useState } from "react";
import { FaCalendarAlt, FaHome } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";

import { ImFilm } from "react-icons/im";
import { MdOndemandVideo } from "react-icons/md";
import { TfiWrite } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import Center from "../Shared/Center/Center";
import Footer from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";
import Navbar from "../Shared/Navbar/Navbar";



const Layout = ({ children }) => {
  const [mobileNavOpen,setMobileNavOpen]=useState(false)
  const router=useNavigate()
  return (
    <div>
     
        <Header/> 
        <div className="w-[90%] lg:w-full  block lg:hidden my-5 cursor-pointer mx-auto">
          <span onClick={()=>{
            setMobileNavOpen(!mobileNavOpen)
          }} className="  flex items-center  gap-3 text-black font-bold">
            <TiThMenu className="text-lg"/>
            
            </span>

            {/* dropdown */}
            <div className={`${mobileNavOpen ?"bg-black opacity-90 text-white rounded shadow-lg px-10 py-12 mt-3":"opacity-0 px-0 py-0"} transition-all duration-300 ease-in-out absolute z-50 w-[90%] `}>
              <div className=" text-center font-bold">
                {/* nav */}
                <div onClick={()=>router("/")} className="my-5 border-b-2 border-white ">
                  <div className="flex items-center  gap-3">
                  <FaHome />
                    <span>Home</span>
                  </div>
                </div>
                <div  onClick={()=>router("/articles/movies")} className="my-5 border-b-2 border-white">
                  <div className="flex items-center  gap-3">
                  <ImFilm />
                    <span>Movies</span>
                  </div>
                </div>
                <div  onClick={()=>router("/articles/web-series")} className="my-5 border-b-2 border-white">
                  <div className="flex items-center  gap-3">
                  <MdOndemandVideo />
                    <span>Web Series</span>
                  </div>
                </div>
                <div  onClick={()=>router("/articles/upcoming-articles")} className="my-5 border-b-2 border-white">
                  <div className="flex items-center  gap-3">
                  <FaCalendarAlt />
                    <span>Upcoming</span>
                  </div>
                </div>
                <div  onClick={()=>router("/articles/top-10-articles")} className="my-5 border-b-2 border-white">
                  <div className="flex items-center  gap-3">
                  <TfiWrite />
                    <span>Top 10 Articles</span>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <Navbar />
        <Center>{children}</Center>
        <Footer /> 
      
    </div>
  );
};

export default Layout;
