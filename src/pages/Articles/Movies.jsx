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
    img: images.suggestionImage,
    title: "10 Best Jennifer Lawrence Movies of All Time, Ranked by Viewers",
  },
];

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  const router = useNavigate();

  useEffect(() => {
    // get movies articles
    axios
      .get(`${base_url}/articles?category_id=1`)
      .then((res) => setMovies(res.data.articles));

    // get all genres
    axios.get(`${base_url}/genres`).then((res) => setGenres(res?.data?.genres));
  }, []);

  const reversedMovies = movies.slice().reverse();

  return (
    <Layout>
      {/* advertise */}

      <div className="my-2 mx-3 md:mx-0">
        <img src="/image/homePageAds.png" alt="" />
      </div>

      {/* route */}
      <div className="px-3 md:px-0">
        <span className="text-gray-700 text-[15px]">Home {">"} Movies</span>
      </div>

      {/* Movies tag */}
      <div className="bg-red-600 px-3 py-2 text-white inline-block mt-2 mx-3 md:mx-0">
        <span>Movies</span>
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
        <div id="poster-box" className="cursor-pointer relative mx-2 hover:bg-black">
          {/* poster thumbnail */}
          <div
            onClick={() =>
              router(`/articles/article-details/${reversedMovies[0]?.id}`)
            }
            className="poster-img w-full h-[520px] block opacity-100 transition-all duration-300 ease-in overflow-hidden "
          >
            <img
              className="w-full h-full scale-100 hover:scale-105 transition-scale duration-300 ease-in"
              src={reversedMovies[0]?.thumbnail}
              alt=""
            />
          </div>
          {/* poster title */}
          <div
            id="poster-title"
            className=" absolute top-96 left-12 opacity-0 transition-all duration-300 ease-in"
          >
            <h1 className="text-white self-end text-2xl font-extrabold">
              {reversedMovies[0]?.title}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mx-1">
          <div className=" grid grid-rows-2  gap-4">
            <div
              id="poster-box"
              className="cursor-pointer relative  hover:bg-black"
            >
              {/* poster thumbnail */}
              <div
                onClick={() =>
                  router(`/articlesdetails/${reversedMovies[1]?.id}`)
                }
                className="poster-img w-full h-[250px]  block opacity-100 transition-all duration-300 ease-in overflow-hidden "
              >
                <img
                  className="w-full h-full scale-100 hover:scale-105 transition-scale duration-300 ease-in"
                  src={reversedMovies[1]?.thumbnail}
                  alt=""
                />
              </div>
              {/* poster title */}
              <div
                id="poster-title"
                className=" absolute bottom-8 left-2 opacity-0 transition-all duration-300 ease-in"
              >
                <h1 className="text-white self-end text-[14px] font-extrabold">
                  {reversedMovies[1]?.title}
                </h1>
              </div>
            </div>
            <div
              id="poster-box"
              className="cursor-pointer relative  hover:bg-black"
            >
              {/* poster thumbnail */}
              <div
                onClick={() =>
                  router(`/articles/article-details/${reversedMovies[2]?.id}`)
                }
                className="poster-img w-full h-[250px]  block opacity-100 transition-all duration-300 ease-in overflow-hidden "
              >
                <img
                  className="w-full h-full scale-100 hover:scale-105 transition-scale duration-300 ease-in"
                  src={reversedMovies[2]?.thumbnail}
                  alt=""
                />
              </div>
              {/* poster title */}
              <div
                id="poster-title"
                className=" absolute bottom-8 left-2 opacity-0 transition-all duration-300 ease-in"
              >
                <h1 className="text-white self-end text-[14px] font-extrabold">
                  {reversedMovies[2]?.title}
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
                onClick={() =>
                  router(`/articles/article-details/${reversedMovies[3]?.id}`)
                }
                className="poster-img w-full h-[250px]  block opacity-100 transition-all duration-300 ease-in overflow-hidden "
              >
                <img
                  className="w-full h-full scale-100 hover:scale-105 transition-scale duration-300 ease-in"
                  src={reversedMovies[3]?.thumbnail}
                  alt=""
                />
              </div>
              {/* poster title */}
              <div
                id="poster-title"
                className=" absolute bottom-8 left-2 opacity-0 transition-all duration-300 ease-in"
              >
                <h1 className="text-white self-end text-[14px] font-extrabold">
                  {reversedMovies[3]?.title}
                </h1>
              </div>
            </div>
            <div id="poster-box" className="cursor-pointer relative ">
              {/* poster thumbnail */}
              <div
                onClick={() =>
                  router(`/articles/article-details/${reversedMovies[4]?.id}`)
                }
                className="poster-img w-full h-[250px]  block opacity-100 transition-all duration-300 ease-in overflow-hidden "
              >
                <img
                  className="w-full h-full scale-100 hover:scale-105 transition-scale duration-300 ease-in"
                  src={reversedMovies[4]?.thumbnail}
                  alt=""
                />
              </div>
              {/* poster title */}
              <div
                id="poster-title"
                className=" absolute bottom-8 left-2 opacity-0 transition-all duration-300 ease-in"
              >
                <h1 className="text-white self-end text-[14px] font-extrabold">
                  {reversedMovies[4]?.title}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* advertise */}
      <div className="my-2 mx-3 md:mx-0">
        <img src="/image/homePageAds.png" alt="" />
      </div>

      {/* articles and adds */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 justify-normal items-center">
        {/* articles */}
        <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-2 gap-3 mx-2 self-start">
          {reversedMovies.map((movieArticle) => (
            <ArticleCard key={movieArticle.id} article={movieArticle} />
          ))}
        </div>

        {/* adds and etc */}
        <div className="w-[95%] mx-auto md:w-full flex flex-col ">
          {/* adds */}
          <div className="bg-red-800 h-[250px] mx-1">adds 1</div>

          {/* popular posts */}
          <div className="my-2">
            <div className="border-b border-black mx-1 mb-3">
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
          <div className="bg-red-800 h-[250px]">adds 2</div>

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
                  onClick={() => router(`/articles/Genres/${genre?.id}`)}
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
          <div className="bg-red-800 h-[250px] mx-1">adds 2</div>

          {/* newsletter */}
          <div
            style={{
              background: "linear-gradient(to right , #FF2E00,#F56F36)",
            }}
            className="my-3 mx-1"
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
          <div className="bg-red-800 h-[250px] mx-1">adds 2</div>
        </div>
      </div>
      {/* advertise */}
      <div className="my-2 mx-3 lg:mx-0">
        <img src="/image/homePageAds.png" alt="" />
      </div>
    </Layout>
  );
};

export default MoviesPage;
