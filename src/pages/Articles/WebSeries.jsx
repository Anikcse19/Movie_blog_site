/* eslint-disable react-hooks/rules-of-hooks */

import axios from "axios";

import { useEffect, useState } from "react";
import { TbTriangleSquareCircleFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import images from "../../../config";
import base_url from "../../Utils/Url";
import Layout from "../../components/Layout/Layout";
import ArticleCard from "../../components/Shared/Card/ArticleCard";
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
    img:images.suggestionImage,
    title: "10 Best Jennifer Lawrence Movies of All Time, Ranked by Viewers",
  },
];



const WebSeriesPage = () => {
  const [latestWebSeriesArticles,setLatestWebSeriesArticles]=useState([])
  const [genres,setGenres]=useState([])

  const router=useNavigate()
  
  useEffect(()=>{
   try {
     // get latest web series articles
     axios.get(`${base_url}/articles?category_id=3`).then(res=>{
      if(res?.data){
        setLatestWebSeriesArticles(res.data.articles)
      }
    })

    // get all genres
    axios.get(`${base_url}/genres`).then(res=>{
      if(res?.data){
        setGenres(res?.data?.genres)
      }
    })


   } catch (error) {
    throw error `${error} sdfsf`
   }
  },[])

  const reversedWebSeries=latestWebSeriesArticles.slice().reverse()
  return (
    <Layout>


     {/* advertise */}
      
     <div className="w-[90%] lg:w-full mx-auto my-5">
          <img className="w-full" src={images.addImage} alt="" />
        </div>

        <div className="w-[90%] xl:w-full mx-auto ">
        <span className="text-gray-700 text-[15px] inline-block"><p onClick={()=>{router('/')
       window.scrollTo(0,0)
      }} className="inline hover:text-red-600 hover:underline cursor-pointer">Home</p> {">"} Web Series</span>
      </div>

      {/* Movies tag */}
      <div className="w-[90%] xl:w-full mx-auto">
      <div className="bg-red-600 px-3 py-2 text-white inline-block mt-2 ">
        <span>Web Series</span>
      </div>
      </div>

      {/* page details */}
      <div className=" w-[90%] xl:w-full mx-auto my-4 ">
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
      <div className="w-[90%] xl:w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-3 my-10 ">

        {/* poster 1 start */}
        <div
        style={{
          boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px"
        }}
        id="poster-box" className="cursor-pointer relative mx-2  hover:bg-black">
          {/* poster thumbnail */}
          <div
            onClick={() =>
              {router(`/articles/article-details/${reversedWebSeries[0]?.id}`)
              window.scrollTo(0,0)}
            }
            className="poster-img w-full h-[300px] xl:h-[520px] block opacity-100 transition-all duration-300 ease-in overflow-hidden "
          >
            <img
              className="w-full h-full scale-100 hover:scale-105 transition-scale duration-300 ease-in object-cover"
              src={reversedWebSeries[0]?.thumbnail}
              alt=""
            />
          </div>
          <div
            id="poster-title"
            className="w-[90%] absolute bottom-4 left-6 opacity-0 transition-all duration-300 ease-in"
          >
            <h1 className="text-white bg-black w-[100%] mx-auto px-5 py-5 opacity-90 self-end text-3xl font-extrabold">
              {reversedWebSeries[0]?.title}
            </h1>
          </div>
        </div>
         {/* poster 1 end */}

        <div className="grid grid-cols-2 gap-3 mx-1">
          <div className=" grid grid-rows-2  gap-4">

             {/* poster 2 start */}
            <div
            style={{
              boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px"
            }}
              id="poster-box"
              className="cursor-pointer relative h-[100px] md:h-full hover:bg-black"
            >
              {/* poster thumbnail */}
              <div
                onClick={() =>
                  {router(`/articlesdetails/${reversedWebSeries[1]?.id}`)
                  window.scrollTo(0,0)}
                }
                className="poster-img w-full h-full  block opacity-100 transition-all duration-300 ease-in overflow-hidden "
              >
                <img
                  className="w-full h-full scale-100 hover:scale-105 transition-scale duration-300 ease-in object-cover"
                  src={reversedWebSeries[1]?.thumbnail}
                  alt=""
                />
              </div>
              {/* poster title */}
              <div
                id="poster-title"
                className="w-[90%] absolute bottom-8 left-2 opacity-0 transition-all duration-300 ease-in"
              >
                <h1 className="w-[100%] text-white bg-black opacity-90 px-2 py-1
                 self-end text-lg font-extrabold">
                {reversedWebSeries[1]?.title}
                </h1>
              </div>
            </div>
            {/* poster 2 end */}

            {/* poster 3 start */}
            <div
            style={{
              boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px"
            }}
              id="poster-box"
              className="cursor-pointer relative  hover:bg-black"
            >
              {/* poster thumbnail */}
              <div
                onClick={() =>
                  {router(`/articles/article-details/${reversedWebSeries[2]?.id}`)
                  window.scrollTo(0,0)}
                }
                className="poster-img w-full h-full  block opacity-100 transition-all duration-300 ease-in overflow-hidden "
              >
                <img
                  className="w-full h-full scale-100 hover:scale-105 transition-scale duration-300 ease-in object-cover"
                  src={reversedWebSeries[2]?.thumbnail}
                  alt=""
                />
              </div>
              {/* poster title */}
              <div
                id="poster-title"
                className="w-[90%] absolute bottom-8 left-2 opacity-0 transition-all duration-300 ease-in"
              >
                <h1 className="w-[100%] text-white bg-black opacity-90 px-2 py-1
                 self-end text-lg font-extrabold">
                {reversedWebSeries[2]?.title}
                </h1>
              </div>
            </div>
            {/* poster 3 end */}
          </div>
          <div className=" grid grid-rows-2 gap-3">

            {/* poster 4 start */}
            <div
            style={{
              boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px"
            }}
              id="poster-box"
              className="cursor-pointer relative hover:bg-black"
            >
              {/* poster thumbnail */}
              <div
                onClick={() =>
                 { router(`/articles/article-details/${reversedWebSeries[3]?.id}`)
                  window.scrollTo(0,0)}
                }
                className="poster-img w-full h-full  block opacity-100 transition-all duration-300 ease-in overflow-hidden "
              >
                <img
                  className="w-full h-full scale-100 hover:scale-105 transition-scale duration-300 ease-in object-cover"
                  src={reversedWebSeries[3]?.thumbnail}
                  alt=""
                />
              </div>
              {/* poster title */}
              <div
                id="poster-title"
                className="w-[90%] absolute bottom-8 left-2 opacity-0 transition-all duration-300 ease-in"
              >
                <h1 className="w-[100%] text-white bg-black opacity-90 px-2 py-1
                 self-end text-lg font-extrabold">
                {reversedWebSeries[3]?.title}
                </h1>
              </div>
            </div>
            {/* poster 4 end */}

            {/* poster 5 start */}
            <div
            style={{
              boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px"
            }}
            id="poster-box" className="cursor-pointer relative ">
              {/* poster thumbnail */}
              <div
                onClick={() =>
                  {router(`/articles/article-details/${reversedWebSeries[4]?.id}`)
                  window.scrollTo(0,0)}
                }
                className="poster-img w-full h-full  block opacity-100 transition-all duration-300 ease-in overflow-hidden "
              >
                <img
                  className="w-full h-full scale-100 hover:scale-105 transition-scale duration-300 ease-in object-cover"
                  src={reversedWebSeries[4]?.thumbnail}
                  alt=""
                />
              </div>
              {/* poster title */}
             <div
                id="poster-title"
                className="w-[90%] absolute bottom-8 left-2 opacity-0 transition-all duration-300 ease-in"
              >
                <h1 className="w-[100%] text-white bg-black opacity-90 px-2 py-1
                 self-end text-lg font-extrabold">
                {reversedWebSeries[4]?.title}
                </h1>
              </div>
            </div>
            {/* poster 5 end */}
            
          </div>
        </div>
      </div>

     {/* advertise */}
      
     <div className="w-[90%] lg:w-full mx-auto my-5">
          <img className="w-full" src={images.addImage} alt="" />
        </div>

       {/* articles and adds */}

       <div className="w-[90%] xl:w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5 justify-normal items-center">
        {/* articles */}
        <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-2 gap-3 self-start">
          {reversedWebSeries.map((movieArticle) => (
            <ArticleCard key={movieArticle.id} article={movieArticle} />
          ))}
        </div>

        {/* adds and etc */}
        <div className="flex flex-col ">
          {/* adds */}
          <div className="bg-gray-400 h-[250px]">adds 1</div>

          {/* popular posts */}
          <div className="my-2">
            <div className="border-b border-black mb-3">
              <span className="bg-black px-3 py-1  text-white">
                Popular Posts
              </span>
            </div>
            <div className="flex flex-col gap-3 mx-1">
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
          <div className="my-3 mx-1 lg:mx-0">
            <div className="border-b border-blue-700 mb-3">
              <span className="bg-blue-700 px-3 py-1 text-white font-semibold">
                Genres
              </span>
            </div>
            {/* genre list */}

            <div className="grid grid-cols-2 gap-3">
              {genres.map((genre) => (
                <div
                  onClick={() => {router(`/articles/Genres/${genre?.id}`)
                  window.scrollTo(0,0)
                }}
                  key={genre?.id}
                  className="bg-[#0386FF] hover:bg-[#599ddd] p-1 flex justify-between text-white cursor-pointer"
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
          <div className="bg-red-800 h-[250px] ">adds 2</div>
        </div>
      </div>

      
       {/* advertise */}
      
     <div className="w-[90%] lg:w-full mx-auto my-5">
          <img className="w-full" src={images.addImage} alt="" />
        </div>
    </Layout>
  );
};

export default WebSeriesPage;
