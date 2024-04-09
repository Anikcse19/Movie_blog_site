import axios from "axios";

import { useContext, useEffect, useState } from "react";
import { FaAnglesRight } from "react-icons/fa6";
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
  const { selectedGenreForWebSeries } = useContext(BlogContext);

  const router = useNavigate();

  useEffect(() => {
    //get bannerSlider articles
    axios
      .get(
        `${base_url}/articles?category_id=3&genre_id=${selectedGenreForWebSeries.value}`
      )
      .then((res) => setWebSeries(res.data.articles));

    // get suggestions articles
    axios
      .get(`${base_url}/articles/suggestions?category_id=3`)
      .then((res) => setSuggetionWebSeries(res.data.articles));
  }, [selectedGenreForWebSeries.value]);

  const reverseSuggestionWebSeries = suggestionWebSeries.slice().reverse();

  const manageDateFormate = (date) => {
    const newDate = new Date(date);
    const dateString = newDate.toDateString();
    const dateArray = dateString.split(" ");
    const day = dateArray[0];
    const currentDate = dateArray[2];
    const month = dateArray[1];
    const year = dateArray[3];

    return `${day},${currentDate}th ${month},${year}`;
  };
  return (
    // <Center>
    <div>
      <div className="w-[90%] lg:w-full mx-auto my-2 flex flex-col xl:flex-row items-center justify-between gap-3 ">
        {/* slider */}
        <div
          style={{
            boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
          className="w-full xl:w-[60%] h-[530px] bg-gray-100  rounded"
        >
          {/* <SectionCarousel slides={slides}/> */}
          {!webSeries.length > 0 ? (
            <div className="w-full h-full bg-gray-500 animate-pulse flex items-center justify-center" >
            <p>No content available!!</p>
          </div>
          ):(

          <SectionSlider slides={webSeries} />
          )}
        </div>

        {/* suggestion */}
        <div className="w-[100%] xl:w-[40%] grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-2 z-0">
          {!suggestionWebSeries.length > 0 && (
            <div className="w-full h-[550px] animate-pulse ">
              <div className="w-full bg-gray-400 h-full"></div>
            </div>
          )}
          {reverseSuggestionWebSeries.slice(0, 5).map((suggestionMovie) => (
            <div
              key={suggestionMovie.id}
              style={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
              onMouseEnter={() =>
                setIshover({ value: suggestionMovie.id, state: true })
              }
              onMouseLeave={() => setIshover({ value: null, state: false })}
              onClick={() => {
                router(`/articles/article-details/${suggestionMovie.id}`);
              }}
              className="flex items-center gap-2 w-full h-[100px] cursor-pointer rounded-sm mx-1  z-0"
            >
              <div className="w-[30%] h-full">
                <img
                  className="w-[100px] h-[100px] object-cover"
                  src={suggestionMovie?.thumbnail}
                  alt=""
                />
              </div>
              <div className="w-[70%] flex flex-col gap-2 pr-2">
                <span
                  className={`text-[14px] font-[700] ${
                    isHover.value === suggestionMovie.id && "text-red-600"
                  }`}
                >{`${suggestionMovie?.title}`}</span>
                {/* published */}
                <span className="text-gray-600 text-[12px] pb-1">
                  {manageDateFormate(suggestionMovie.created_at)}
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="fixed right-48 bottom-24 z-[1000] overflow-hidden">
              <FaArrowAltCircleDown className="text-[40px]"/>
      </div> */}
      </div>


<div className="w-[90%] lg:w-full mx-auto">

      <div onClick={()=>{
        router(`/articles/genres/${selectedGenreForWebSeries.value}`)
      }} className=" bg-slate-900 inline-block px-5 py-2 text-white font-bold cursor-pointer">
        <span className="flex gap-2 items-center">
        <p>See All</p>
        <FaAnglesRight/>
        </span>
      </div>
</div>
    </div>
    // </Center>
  );
};

export default WebSeriesIntroSection;
