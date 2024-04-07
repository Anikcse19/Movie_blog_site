
import axios from "axios";

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BlogContext } from "../../../ContextApi/BlogContext";
import base_url from "../../../Utils/Url";
import SectionSlider from "../../Shared/Slider/SectionSlider";



const WebSeriesIntroSection = () => {
  const [isHover, setIshover] = useState({
    value: null,
    state: false,
  });

  const [webSeries, setWebSeries] = useState([]);
  const [suggestionWebSeries, setSuggetionWebSeries] = useState([]);
  const {selectedGenreForWebSeries}=useContext(BlogContext)

  const router=useNavigate()

  useEffect(() => {
    
    //get bannerSlider articles
    axios
      .get(`${base_url}/articles?category_id=3&genre_id=${selectedGenreForWebSeries.value}`)
      .then((res) => setWebSeries(res.data.articles));

    // get suggestions articles
    axios
      .get(`${base_url}/articles/suggestions?category_id=3`)
      .then((res) => setSuggetionWebSeries(res.data.articles));
  }, [selectedGenreForWebSeries.value]);

  const reverseSuggestionWebSeries = suggestionWebSeries.slice().reverse();


  
  return (
    // <Center>
      <div className="my-2 flex flex-col lg:flex-row items-center justify-between gap-3 px-3 lg:p-0">
        {/* slider */}
        <div
        // style={{
        //   boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px"
        // }}
        className="w-[100%] lg:w-[60%] bg-white  rounded">
          {/* <SectionCarousel slides={slides}/> */}
          {
            !webSeries.length>0 && 
            <div className="h-[600px] w-full flex justify-center items-center bg-gray-400 animate-pulse">
              <div>
                <p className="text-lg text-red-900">!No Content available</p>
              </div>
            </div>
            
          }
          <SectionSlider slides={webSeries}/>
        </div>



        {/* suggestion */}
        <div className="scrollableDiv h-[600px] overflow-y-auto w-[100%] lg:w-[40%]  lg:p-0 flex flex-col gap-2">
        {
          !suggestionWebSeries.length>0 && <div className="w-full h-[550px] animate-pulse ">
            <div className="w-full bg-gray-400 h-full">
             
            </div>
          </div>
        }
          {reverseSuggestionWebSeries.map((suggestionWebSeries) => (
             <div
             key={suggestionWebSeries.id}
             style={{
               boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
             }}
             onMouseEnter={() =>
               setIshover({ value: suggestionWebSeries.id, state: true })
             }
             onMouseLeave={() => setIshover({ value: null, state: false })}
             onClick={()=>{
              router(`/articles/article-details/${suggestionWebSeries.id}`)
             }}
             className="flex items-center gap-2 cursor-pointer rounded-sm p-1 border-2 border-orange-900 mx-1"
           >
             <div className=" w-[40%]">
               <img className="w-full h-[100px]" src={suggestionWebSeries?.thumbnail} alt="" />
             </div>
             <div className="w-[60%]">
               <span
                 className={`text-[16px] font-[500] ${
                   isHover.value === suggestionWebSeries.id && "text-red-600"
                 }`}
               >{`${suggestionWebSeries?.title}`}</span>
               
             </div>
           </div>
          ))}
        </div>
      </div>
    // </Center>
  );
};

export default WebSeriesIntroSection;
