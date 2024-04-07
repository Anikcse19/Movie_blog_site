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
      .then((res) => setSuggetionMovies(res.data.articles));
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
    <div className="flex flex-col lg:flex-row items-center gap-4 my-3">
      {/* slider */}
      <div className="w-[100%] lg:w-[70%] px-3 lg:p-0  text-white text-[20px]  max-w-[1360px] mx-auto">
        {/* <Carousel slides={slides} /> */}
        {!articles.length > 0 && (

          // skeleton start
          <div
            role="status"
            className="space-y-8 animate-pulse lg:space-y-0 lg:space-x-8 rtl:space-x-reverse lg:flex lg:items-center w-[700px]"
          >
            <div className="flex items-center justify-center w-full h-48 bg-blue-700 rounded sm:w-96 dark:bg-gray-700">
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
            <div className="w-full">
              <div className="h-2.5 bg-blue-700 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div className="h-2 bg-blue-700 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
              <div className="h-2 bg-blue-700 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div className="h-2 bg-blue-700 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
              <div className="h-2 bg-blue-700 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
              <div className="h-2 bg-blue-700 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
          // skeleton end
        )}
        <BannerSlider slides={articles} />
      </div>

      {/* suggestion */}
     
      <div className="w-[100%] lg:w-[30%] h-full px-2 lg:px-0 flex flex-col gap-4">
      {
          !suggestionMovies.length>0 && <div className="w-[300px] h-[300px] animate-pulse ">
            <div className="w-full bg-gray-400 h-full">
             
            </div>
          </div>
        }
       
        {reverseSuggestionMovies?.length > 0 &&
          reverseSuggestionMovies.slice(0, 3).map((suggestionMovie) => (
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
              className="flex items-center gap-2 border md:border-2 border-orange-900 cursor-pointer rounded-sm p-1"
            >
              <div className="w-[20%] md:w-[40%] h-[50px] md:h-[100px]">
                <img
                  className="w-full h-full"
                  src={suggestionMovie?.thumbnail}
                  alt=""
                />
              </div>
              <div className="flex-grow flex flex-col gap-1">
                <span
                  className={`text-[12px] md:text-[16px] font-[500] ${
                    isHover.value === suggestionMovie.id && "text-red-600"
                  }`}
                >{`${suggestionMovie?.title.slice(0, 25)}..`}</span>
                <span className="text-gray-600 text-[14px]">
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


