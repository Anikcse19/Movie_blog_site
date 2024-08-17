import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import images from "../../../../config";
import Center from "../Center/Center";

const Header = () => {
  const [openProfileDropDown, setOpenProfileDropDown] = useState(false);
  const [token, setToken] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);
  const router = useNavigate();
  return (
    <div className="bg-white py-2">
      <Center>
        <div className="flex justify-between items-center  mx-3 md:mx-0">
          {/* logo */}
          <div
            // style={{
            //   boxShadow:
            //     "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
            // }}
            onClick={() => router("/")}
            className=" rounded px-2 py-2 cursor-pointer"
          >
            <span className="tracking-widest text-xl font-bold text-yellow-700">
              IMDB
            </span>
            <span className="tracking-widest text-xl font-bold text-red-600">
              {" "}
              MOVIES
            </span>
            {/* <h1>IMBD MOVIES</h1> */}
          </div>
          {/* search bar */}
          {/* <div className="w-[40%] md:flex items-center border border-black rounded-md overflow-hidden hidden">
            <input
              className="px-3 outline-none w-full"
              type="text"
              placeholder="Search here"
            />
            <span className="bg-red-600 px-4 py-2 text-white">
              <FaSearch className="text-xl" />
            </span>
          </div> */}
          {/* {/*profile button  */}
          {token ? (
            <div>
              <span
                onClick={() => {
                  localStorage.removeItem("token");
                }}
                className="bg-red-600 hover:bg-red-400 px-3 py-1 md:px-5 md:py-2 text-white font-bold rounded-md cursor-pointer"
              >
                Sign Out
              </span>
            </div>
          ) : (
            <div>
              <span
                onClick={() => {
                  router("/auth/login");
                }}
                className="bg-red-600 hover:bg-red-400 px-5 py-2 text-white font-bold rounded-md cursor-pointer"
              >
                Sign in
              </span>
            </div>
          )}
        </div>
      </Center>
    </div>
  );
};

export default Header;

{
  /* <div className="relative">
<span
  onClick={() => setOpenProfileDropDown(!openProfileDropDown)}
  className="text-2xl md:text-4xl cursor-pointer"
>
  <CgProfile />
</span>


<div
  className={`${
    openProfileDropDown
      ? "bg-black text-white   px-12 py-5  w-[200px] z-50"
      : "opacity-0 px-0 py-0"
  } absolute right-0 top-12 transition-all duration-300 `}
>
  <div className="flex flex-col gap-8">
    <div onClick={()=>router('/dashboard/all-blogs')} className="flex items-center gap-4 cursor-pointer hover:text-purple-500 border-b-2 pb-2 hover:border-purple-500">
      <span>
        <MdDashboard />
      </span>
      <span>Dashboard</span>
    </div>
    {
      token ?( 
      <div onClick={()=>{
        localStorage.removeItem("token")
        router("/auth/login")
      }} className="flex  items-center gap-4 cursor-pointer hover:text-purple-500 border-b-2 pb-2 hover:border-purple-500">
      <span>
        <FaSignInAlt />
      </span>
      <span>LogOut</span>
    </div>
    ):(
    <div onClick={()=>router('/auth/login')} className="flex  items-center gap-4 cursor-pointer hover:text-purple-500 border-b-2 pb-2 hover:border-purple-500">
      <span>
        <FaSignInAlt />
      </span>
      <span>Sign in</span>
    </div>
    )
    }            
  </div>
</div>
</div> */
}
