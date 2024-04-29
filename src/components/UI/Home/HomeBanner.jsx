import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import base_url from "../../../Utils/Url";
import BannerSlider from "../../Shared/Slider/BannerSlider";

// import { Carousel } from "react-responsive-carousel";


const HomeBanner = () => {
  const router = useNavigate();
  const [isHover, setIshover] = useState({
    value: null,
    state: false,
  });
  const [articles, setArticles] = useState([]);
  const [suggestionMovies, setSuggetionMovies] = useState([]);

  useEffect(() => {

    //get bannerSlider articles
    axios
      .get(`${base_url}/articles`)
      .then((res) => setArticles(res.data.articles));

    // get suggestions articles
    axios
      .get(`${base_url}/articles/suggestions`)
      .then((res) => {
        if(res?.data){
          console.log(res?.data,'suggestion');
          setSuggetionMovies(res?.data?.articles)
        }
      });
    // try {
    //   const res=fetch(`${baseUrl}/articles/suggestions`,{
    //     method:"GET",
    //     headers:{
    //       'Accept':"application/json",
    //       'content-type':"application/json"
    //     }
    //   })
    //   console.log((res));
    //   const data= res.json()
    //   if(data){
    //     console.log(data,'anik');
    //     setSuggetionMovies(res.data.articles)
    //   }
      
    // } catch (error) {
    //   console.log(error,'error');
    // }
  }, []);

  const reverseSuggestionMovies = suggestionMovies.slice().reverse();

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
    <div className="flex flex-col lg:flex-row w-full gap-y-5  lg:gap-x-2 my-3">

      {/* slider */}
      <div
       style={{
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"}}
      className="w-[90%] lg:w-[65%] h-[350px]  text-white mx-auto bg-gray-200">
        
        {!articles.length > 0 && (
          <div className="w-full lg:w-full h-full animate-pulse bg-gray-700 p-3 flex gap-2">
            <div className="w-[200px] h-[100px] bg-gray-400 animate-pulse">

            </div>
            <div className="flex flex-col gap-4">
              <span className="w-full h-[10px] rounded-md bg-gray-500 animate-pulse"></span>
              <span className="w-full h-[10px] rounded-md bg-gray-500 animate-pulse"></span>
              <span className="w-full h-[10px] rounded-md bg-gray-500 animate-pulse"></span>
              <span className="w-full h-[10px] rounded-md bg-gray-500 animate-pulse"></span>
            </div>

          </div>
          // skeleton end
        )}
        <BannerSlider slides={articles} />
      </div>

      {/* suggestion */}
      <div className="w-[90%]  lg:w-[35%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">

        {/* skeleton */}
      {
          !suggestionMovies.length>0 && 
          <div className="w-[300px] h-[300px] animate-pulse ">
            <div className="w-full bg-gray-400 h-full">
             
            </div>
          </div>
        }
       
        {reverseSuggestionMovies?.length > 0 &&
          reverseSuggestionMovies.slice(0,3).map((suggestionMovie) => (
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
                window.scrollTo(0,0)
              }}

              className="w-full h-[100px] flex  gap-2  cursor-pointer rounded-sm overflow-hidden"
            >
              <div className="w-[30%] h-full ">
                <img
                
                  className="w-[100px] h-full object-cover"
                  src={suggestionMovie?.thumbnail}
                  alt=""
                />
              </div>
              <div className="w-[65%] flex flex-col justify-between gap-1 pt-3">
                {/* ttile */}
                <span
                  className={`text-[12px] xl:text-[14px] font-[700] ${
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
    </div>
    // </Center>
  );
};

export default HomeBanner;


