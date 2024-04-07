
import axios from "axios";

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BlogContext } from "../../../ContextApi/BlogContext";
import base_url from "../../../Utils/Url";
import SectionSlider from "../../Shared/Slider/SectionSlider";




const MoviesIntroSection = () => {
  const [isHover, setIshover] = useState({
    value: null,
    state: false,
  });

  const [movies, setMovies] = useState([]);
  const [suggestionMovies, setSuggetionMovies] = useState([]);

  const { selectedGenreForMovie } = useContext(BlogContext);

  const router = useNavigate();

  useEffect(() => {
    //get bannerSlider articles
    axios
      .get(
        `${base_url}/articles?category_id=1&genre_id=${selectedGenreForMovie.value}`
      )
      .then((res) => setMovies(res.data.articles));

    // get suggestions articles
    axios
      .get(
        `${base_url}/articles/suggestions?category_id=1`
      )
      .then((res) => setSuggetionMovies(res.data.articles));
  }, [selectedGenreForMovie.value]);

  const reverseSuggestionMovies = suggestionMovies.slice().reverse();

  return (
    // <Center>
    <div className="my-2 flex flex-col lg:flex-row items-center justify-between gap-3 px-3 lg:p-0 relative">
      {/* slider */}
      <div className="w-[100%] lg:w-[60%] bg-white  rounded">
        {/* <SectionCarousel slides={slides}/> */}
        {!movies.length > 0 && (
          <div className="h-[550px] w-full bg-gray-400 animate-pulse" />
        )}
        <SectionSlider slides={movies} />
      </div>

      {/* suggestion */}
      <div className="scrollableDiv  w-[100%] h-[600px] overflow-y-auto lg:w-[40%] lg:p-0 flex flex-col gap-2 z-0">
        {!suggestionMovies.length > 0 && (
          <div className="w-full h-[550px] animate-pulse ">
            <div className="w-full bg-gray-400 h-full"></div>
          </div>
        )}
        {reverseSuggestionMovies.map((suggestionMovie) => (
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
            className="flex items-center gap-2 cursor-pointer rounded-sm p-1 mx-1 border-2 border-orange-900 z-0"
          >
            <div className=" w-[40%]">
              <img
                className="w-full h-[100px]"
                src={suggestionMovie?.thumbnail}
                alt=""
              />
            </div>
            <div className="w-[60%]">
              <span
                className={`text-[16px] font-[500] ${
                  isHover.value === suggestionMovie.id && "text-red-600"
                }`}
              >{`${suggestionMovie?.title}`}</span>
            </div>
          </div>
        ))}
        

      </div>
        {/* <div className="fixed right-48 bottom-24 z-[1000] overflow-hidden">
                <FaArrowAltCircleDown className="text-[40px]"/>
        </div> */}
    </div>
    // </Center>
  );
};

export default MoviesIntroSection;
