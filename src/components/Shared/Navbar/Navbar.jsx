
import { FaCalendarAlt, FaHome } from "react-icons/fa";
import { GiPin } from "react-icons/gi";
import { ImFilm } from "react-icons/im";
import { MdOndemandVideo } from "react-icons/md";

import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Center from "../Center/Center";



const baseUrl='https://blogtest.emdb.online/api'
const Navbar = () => {
  const [movieButtonClicked, setMovieButtonClicked] = useState(1);
  const [isHoverOnMovies,setIsHoverOnMovies]=useState(false)
  const [isHoverOnWebSeries,setIsHoverOnWebSeries]=useState(false)
  const [genres,setGenres]=useState([])

  const navigate = useNavigate();
  const router=useLocation()
  const { pathname } = router;

 useEffect(()=>{
  axios.get(`${baseUrl}/genres`).then(res=>setGenres(res?.data?.genres))
 },[])


  return (
    <Center>
      <div className="hidden md:flex justify-evenly bg-white my-2 p-1 ">
        <div
          onClick={() => navigate("/")}
          className={`flex items-center justify-center gap-4 cursor-pointer ${
            pathname === "/" ? "text-red-500" : "hover:text-red-300"
          }  px-5 py-2 rounded-lg`}
        >
          <FaHome />
          <span className="text-[18px] font-semibold">Home</span>
        </div>
        <div
          onClick={() => {
            // setMovieButtonClicked(movieButtonClicked+1)
            // if(movieButtonClicked>1){
            //   router.push('/Movies');
            // }else{
            //   window.open('/Auth/Registration', '_blank');
            // }
            // setTimeout(()=>{setMovieButtonClicked(1)},5000)
            navigate("/articles/movies");
          }}
          onMouseEnter={()=>setIsHoverOnMovies(true)}
          onMouseLeave={()=>setIsHoverOnMovies(false)}
          className={`flex items-center justify-center gap-4 cursor-pointer ${
            pathname.includes("/movies") ? "text-red-500" : "hover:text-red-300"
          }  px-5 py-2 rounded-lg relative`}
        >
          <ImFilm />
          <span className="text-[18px] font-semibold">Movies</span>


          {/* Movies Button Dropbutton */}
          
            {/* <div
            style={{
              boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
            }}
            className={`${!isHoverOnMovies ? "h-0 w-0 hidden":"bg-stone-900 flex flex-col  items-center gap-3 absolute top-[25px] z-[2000]  border-4 border-red-600 transition-all duration-300 ease-in-out"} py-5 px-8 mt-3 `}>
              
            {
             genres?.length>0 && genres.map(genre=>(
            <div onClick={()=>{
              router.push(`/Genres/${genre?.id}`)
              console.log('11');
            }
              } className="hover:border-b border-red-600 text-white flex justify-between gap-3  px-4" key={genre?.id}>
              <span>{genre?.title}</span>
              <span>{`(${genre?.articles?.length})`}</span>
            </div>
             ))
            }
        </div> */}
        
          

        </div>

        <div
          onClick={() => {
            navigate("/articles/web-series");
          }}
          onMouseEnter={()=>setIsHoverOnWebSeries(true)}
          onMouseLeave={()=>setIsHoverOnWebSeries(false)}
          className={`flex items-center justify-center gap-4 cursor-pointer ${
            pathname.includes("/web-series")
              ? "text-red-500"
              : "hover:text-red-300"
          }  px-5 py-2 rounded-lg relative `}
        >
          <MdOndemandVideo />
          <span className="text-[18px] font-semibold">Web Series</span>

          {/* web series Button Dropbutton */}  
          {/* <div
          style={{
            boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
          }}
          className={`${!isHoverOnWebSeries ? "h-0 w-0 hidden":"bg-stone-900 flex flex-col  items-center gap-3 absolute top-[25px] z-[2000] py-5 px-8 mt-3 border-4 border-red-600 transition-all duration-300 ease-in-out"} `}>
            {
             genres?.length>0 && genres.map(genre=>(
            <div onClick={()=>router.push(`/Genres/${genre?.id}`)} className="hover:border border-red-600 text-white flex justify-between gap-3  px-4" key={genre?.id}>
              <span>{genre?.title}</span>
              <span>{`(${genre?.articles?.length})`}</span>
            </div>
             ))
            }
        </div> */}



        </div>

        <div
          onClick={() => {
            navigate("/articles/upcoming-articles");
          }}
          className={`flex items-center justify-center gap-4 cursor-pointer ${
            pathname.includes("/upcoming-articles")
              ? "text-red-500"
              : "hover:text-red-300"
          }  px-5 py-2 rounded-lg relative`}
        >
          <FaCalendarAlt />
          <span className="text-[18px] font-semibold">Upcoming</span>

            
        </div>

        <div onClick={() => {
            navigate("/articles/top-10-articles");
          }}
          className={`flex items-center justify-center gap-4 cursor-pointer ${
            pathname.includes("/top-10-articles")
              ? "text-red-500"
              : "hover:text-red-300"
          }  px-5 py-2 rounded-lg relative`}>
          <GiPin />
          <span className="text-[18px] font-semibold">Top 50 Articles</span>
        </div>
      </div>
    </Center>
  );
};

export default Navbar;
