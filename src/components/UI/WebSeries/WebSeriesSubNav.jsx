
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { BlogContext } from "../../../ContextApi/BlogContext";
import base_url from "../../../Utils/Url";



const WebSeriesSubNav = () => {
  const [openMoviesSubNav, setOpenMoviesSubNav] = useState(false);
  const [genres, setGenres] = useState([]);
  const { selectedGenreForWebSeries, setSelectedGenreForWebSeries } =
    useContext(BlogContext);

  useEffect(() => {
    //get genres
    axios.get(`${base_url}/genres`).then((res) => setGenres(res.data.genres));
  }, []);

  return (
    // <Center>
    <div className="w-[90%] xl:w-full mx-auto flex items-center justify-between my-2 border-b-2 border-[#2a3fe3] lg:mx-0">
      <div className="bg-[#2a3fe3] px-3 py-2 text-white font-bold">
        Web Series
      </div>
      {/* for mobile version  */}
      <div className="block lg:hidden relative">
        <div
          onClick={() => setOpenMoviesSubNav(!openMoviesSubNav)}
          className="flex gap-2 items-center"
        >
          {openMoviesSubNav ? (
            <IoIosArrowBack className="text-[#2a3fe3] font-semibold text-lg" />
          ) : (
            <IoIosArrowDown className="text-[#2a3fe3] font-semibold text-lg" />
          )}
          <span className="font-semibold text-[#2a3fe3] cursor-pointer">See Options</span>
        </div>
        {/* dropdown */}
        <div
          className={`${
            openMoviesSubNav
              ? "bg-[#2a3fe3]  py-5 px-8 rounded-md "
              : "px-0 py-0 opacity-0"
          } transition-all duration-500 ease-in-out absolute top-8 right-0 z-[1000]`}
        >
          {/* all navs */}
          <div className="flex flex-col justify-start items-start gap-2 ">
            {genres.map((genre, i) => (
              <div className="border-b-2 border-white " key={i}>
                <span
                  onClick={() =>
                    setSelectedGenreForWebSeries({
                      value: genre.id,
                      status: true,
                    })
                  }
                  className={`font-[500] cursor-pointer ${
                    selectedGenreForWebSeries.value === genre.id
                      ? "text-black font-bold"
                      : "text-white"
                  }`}
                >
                  {genre?.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* big screen nav */}
      <div className="hidden flex-grow px-12 py-2 lg:flex justify-evenly items-center">
        {genres.slice(0,7).map((genre) => (
          <span
            key={genre?.id}
            onClick={() =>
              setSelectedGenreForWebSeries({
                value: genre.id,
                status: true,
              })
            }
            className={`font-[500] cursor-pointer ${
              selectedGenreForWebSeries.value === genre.id ? "text-[#2a3fe3] font-bold" : ""
            }`}
          >
            {genre?.title}
          </span>
        ))}
      </div>
    </div>
    // </Center>
  );
};

export default WebSeriesSubNav;
