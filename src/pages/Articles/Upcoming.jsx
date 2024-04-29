/* eslint-disable react-hooks/rules-of-hooks */

import axios from "axios";
import { useEffect, useState } from "react";
import { TbTriangleSquareCircleFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import images from "../../../config";
import base_url from "../../Utils/Url";
import Layout from "../../components/Layout/Layout";
import SuggestionCard from "../../components/Shared/Card/SuggestionCard";



const suggestionMovies = [
  {
    id: 1,
    img: images.suggestionImage,
    title: "10 Best Jennifer Lawrence Movies of All Time, Ranked by Viewers",
  },
  {
    id: 2,
    img: images.suggestionImage,
    title: "10 Best Jennifer Lawrence Movies of All Time, Ranked by Viewers",
  },
  {
    id: 3,
    img: images.suggestionImage,
    title: "10 Best Jennifer Lawrence Movies of All Time, Ranked by Viewers",
  },
  {
    id: 4,
    img: images.suggestionImage,
    title: "10 Best Jennifer Lawrence Movies of All Time, Ranked by Viewers",
  },
];



const UpcomingArticlesPage = () => {
const [isHover, setIshover] = useState({
        value: null,
        state: false,
      });
  const [upcoming,SetUpcoming]=useState([])
  const [genres,setGenres]=useState([])

  const router=useNavigate()
  
  useEffect(()=>{
  
     

    // get latest web series articles
    axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=f398789190003083c23f81d2a33cc72c`,{
        headers:{
            "Accept":"application/json"
        }
    }).then(res=>{
        SetUpcoming(res.data.results)
    })

    // get all genres
    axios.get(`${base_url}/genres`,{
    }).then(res=>setGenres(res?.data?.genres))
  },[])

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
    <Layout>
      {/* advertise */}
      
     <div className="w-[90%] lg:w-full mx-auto my-5">
          <img className="w-full" src={images.addImage} alt="" />
        </div>

        <div className="w-[90%] xl:w-full mx-auto ">
        <span className="text-gray-700 text-[15px] inline-block"><p onClick={()=>{router('/')
       window.scrollTo(0,0)
      }} className="inline hover:text-red-600 hover:underline cursor-pointer">Home</p> {">"} Upcoming</span>
      </div>

      {/* Movies tag */}
      <div className="bg-red-600 px-3 py-2 text-white inline-block mt-2 mx-3 md:mx-0">
        <span>Upcoming</span>
      </div>

      {/* page details */}
      <div className="my-4 mx-3 md:mx-0 ">
        <p className="text-[10px] md:text-[14px] font-medium">
          Download Hindi Movies, Movies Download, Download Movies, Download 480p
          Movies, Download 720p Movies, Download Dual Audio Movies, Download
          1080p Movies, Movies Hindi Dubbed, World4ufree, Filmyzilla,
          Khatrimaza, 9xmovies, Bolly4u Best Bollywood movie download site, best
          website to download English movies, download bengali movies for free,
          best sites to download bengali movies for free, Dual audio movie
          website free download, Best dual audio movie website.
        </p>
      </div>

      {/* photo grid album */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-10 mx-3 md:mx-0">
        <div id="poster-box" className="cursor-pointer relative hover:bg-black">
          {/* poster thumbnail */}
          <div 
        //   onClick={()=>router.push(`/ArticleDetails/${upcoming[0]?.id}`)} 
          className="poster-img w-full h-[520px] block opacity-100 transition-all duration-300 ease-in overflow-hidden ">
            <img
              className="w-full h-full scale-100 hover:scale-105 transition-scale duration-300 ease-in"
              src={`https://image.tmdb.org/t/p/w500${upcoming[0]?.poster_path}`}
              alt=""
            />
          </div>
          {/* poster title */}
          <div
            id="poster-title"
            className="w-[80%] absolute top-96 left-6 opacity-0 transition-all duration-300 ease-in"
          >
            <h1 className="text-white bg-black w-[90%] mx-auto px-5 py-5 opacity-60 self-end text-3xl font-extrabold">
              {upcoming[0]?.title}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className=" grid grid-rows-2  gap-4">
            <div
              id="poster-box"
              className="cursor-pointer relative hover:bg-black"
            >
              {/* poster thumbnail */}
              <div 
            //   onClick={()=>router.push(`/Articlesdetails/${reversedWebSeries[1]?.id}`)} 
              className="poster-img w-full h-[250px]  block opacity-100 transition-all duration-300 ease-in overflow-hidden ">
                <img
                  className="w-full h-full scale-100 hover:scale-105 transition-scale duration-300 ease-in"
                  src={`https://image.tmdb.org/t/p/w500${upcoming[1]?.poster_path}`}
                  alt=""
                />
              </div>
              {/* poster title */}
              <div
                id="poster-title"
                className="w-[90%] absolute bottom-8 left-2 opacity-0 transition-all duration-300 ease-in"
              >
                <h1 className="w-[90%] text-white bg-black opacity-80 px-6 py-6
                 self-end text-[16px] font-extrabold">
                {upcoming[1]?.title}
                </h1>
              </div>
            </div>
            <div
              id="poster-box"
              className="cursor-pointer relative hover:bg-black"
            >
              {/* poster thumbnail */}
              <div 
            //   onClick={()=>router.push(`/ArticleDetails/${reversedWebSeries[2]?.id}`)} 
              className="poster-img w-full h-[250px]  block opacity-100 transition-all duration-300 ease-in overflow-hidden ">
                <img
                  className="w-full h-full scale-100 hover:scale-105 transition-scale duration-300 ease-in"
                  src={`https://image.tmdb.org/t/p/w500${upcoming[2]?.poster_path}`}
                  alt=""
                />
              </div>
              {/* poster title */}
              <div
                id="poster-title"
                className="w-[90%] absolute bottom-8 left-2 opacity-0 transition-all duration-300 ease-in"
              >
                <h1 className="w-[90%] text-white bg-black opacity-80 px-6 py-6
                 self-end text-[16px] font-extrabold">
                {upcoming[2]?.title}
                </h1>
              </div>
            </div>
          </div>
          <div className=" grid grid-rows-2 gap-3">
            <div
              id="poster-box"
              className="cursor-pointer relative hover:bg-black"
            >
              {/* poster thumbnail */}
              <div 
            //   onClick={()=>router.push(`/ArticleDetails/${reversedWebSeries[3]?.id}`)} 
              className="poster-img w-full h-[250px]  block opacity-100 transition-all duration-300 ease-in overflow-hidden ">
                <img
                  className="w-full h-full scale-100 hover:scale-105 transition-scale duration-300 ease-in"
                  src={`https://image.tmdb.org/t/p/w500${upcoming[3]?.poster_path}`}
                  alt=""
                />
              </div>
               {/* poster title */}
               <div
                id="poster-title"
                className="w-[90%] absolute bottom-8 left-2 opacity-0 transition-all duration-300 ease-in"
              >
                <h1 className="w-[90%] text-white bg-black opacity-80 px-6 py-6
                 self-end text-[16px] font-extrabold">
                {upcoming[3]?.title}
                </h1>
              </div>
            </div>
            <div
              id="poster-box"
              className="cursor-pointer relative "
            >
              {/* poster thumbnail */}
              <div 
            //   onClick={()=>router.push(`/ArticleDetails/${reversedWebSeries[4]?.id}`)} 
              className="poster-img w-full h-[250px]  block opacity-100 transition-all duration-300 ease-in overflow-hidden ">
                <img
                  className="w-full h-full scale-100 hover:scale-105 transition-scale duration-300 ease-in"
                  src={`https://image.tmdb.org/t/p/w500${upcoming[4]?.poster_path}`}
                  alt=""
                />
              </div>
              {/* poster title */}
              <div
                id="poster-title"
                className="w-[90%] absolute bottom-8 left-2 opacity-0 transition-all duration-300 ease-in"
              >
                <h1 className="w-[90%] text-white bg-black opacity-90 px-6 py-6
                 self-end text-[16px] font-extrabold">
                {upcoming[4]?.title}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* advertise */}
      
     <div className="w-[90%] lg:w-full mx-auto my-5">
          <img className="w-full" src={images.addImage} alt="" />
        </div>

      {/* articles and adds */}

      <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-5 px-3 lg:px-0">
        {/* articles */}
        <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-2 self-start gap-3 ">
          {upcoming.slice(0,12).map((up) => {
            const titleLength=up?.title?.length

            return (
              <div
              key={up.id}
              onMouseEnter={() =>
                setIshover({ value: up.id, state: true })
              }
              onMouseLeave={() => setIshover({ value: null, state: false })}
              style={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
              className="flex flex-col justify-between gap-2  py-3 px-3 cursor-pointer rounded-md "
            >
              <div
              //   onClick={() => {
              //     router.push(`/ArticleDetails/${article.id}`);
              //   }}
              className="w-[100%] h-[125px] md:h-[250px] flex items-center justify-center"
              >
                <img className="w-[100%] h-full" src={`https://image.tmdb.org/t/p/w500${up?.poster_path}`} alt="" />
              </div>
        
              <span className={`px-1 font-bold ${
                  isHover.value === up.id && "text-red-600"
                } `}>{titleLength>40 ? `${up?.title?.slice(0,40)}...`: up?.title}</span>
              <span className="px-1 pb-1 text-gray-800 text-[12px]">
                {manageDateFormate(up?.release_date)}
              </span>
            </div>
            )
          }
          )}
        </div>

        {/* adds and etc */}
        <div className="w-full flex flex-col self-start">
          {/* adds */}
          <div className="bg-gray-400 h-[250px]">adds 1</div>

          {/* popular posts */}
          <div className="my-2">
            <div className="border-b border-black mb-3">
              <span className="bg-black px-3 py-1 text-white">
                Popular Posts
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {suggestionMovies.map((suggestionMovie) => (
                <SuggestionCard
                  key={suggestionMovie.id}
                  suggestContent={suggestionMovie}
                />
              ))}
            </div>
          </div>

          {/* adds */}
          <div className="bg-gray-400 h-[250px]">adds 2</div>

          {/* genres */}
          <div className="my-3">
            <div className="border-b border-blue-700 mb-3">
              <span className="bg-blue-700 px-3 py-1 text-white font-semibold">
                Genres
              </span>
            </div>
            {/* genre list */}

            <div className="grid grid-cols-2 gap-3">
              {genres.map((genre) => (
                <div
                onClick={()=>{router(`/articles/Genres/${genre?.id}`)
                window.scrollTo(0,0)
              }}
                  key={genre?.id}
                  className="bg-[#0386FF] hover:bg-[#85bdf1f8] p-1 flex justify-between cursor-pointer text-white"
                >
                  <div className="flex gap-2 items-center">
                    <span>
                      {" "}
                      <TbTriangleSquareCircleFilled />
                    </span>
                    <span>{genre?.title} </span>
                  </div>
                  <div>
                    <span>{genre?.articles?.length}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* adds */}
          <div className="bg-gray-400 h-[250px]">adds 2</div>

          {/* newsletter */}
          <div
            style={{
              background: "linear-gradient(to right , #FF2E00,#F56F36)",
            }}
            className="my-3"
          >
            <div className=" mx-auto p-4">
              <h1 className=" text-center font-bold text-white text-2xl">
                Newsletter
              </h1>
              <p className="text-center text-white mt-3">
                Subscribe for your daily updates.
              </p>
              <div className="text-center my-5">
                <input
                  placeholder="Your Full Name"
                  className="mb-3 px-3 py-1 text-center text-gray-700 "
                  type="text"
                />
                <input
                  placeholder="Your Email"
                  className="mb-3 px-3 py-1 text-center text-gray-700"
                  type="text"
                />
              </div>

              <div className="text-center">
                <button className="bg-blue-600 px-12 py-2 text-white rounded-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* adds */}
          <div className="bg-gray-400 h-[250px]">adds 2</div>
        </div>
      </div>
      {/* advertise */}
      
     <div className="w-[90%] lg:w-full mx-auto my-5">
          <img className="w-full" src={images.addImage} alt="" />
        </div>
    </Layout>
  );
};

export default UpcomingArticlesPage;
