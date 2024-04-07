import axios from "axios";
import { useEffect, useState } from "react";
import { TbTriangleSquareCircleFilled } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
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
  

const SingleGenreContentPage = () => {

    const router=useNavigate()
    const [isHover, setIshover] = useState({
        value: null,
        state: false,
    });
    const {id}=useParams()

    // const [latestWebSeriesArticles,setLatestWebSeriesArticles]=useState([])
    const [genres,setGenres]=useState([])
    const [content,setContent]=useState({})
    
    useEffect(()=>{

      axios.get(`${base_url}/genres/${id}`).then(res=>setContent(res.data.genre))
      
  
      // get all genres
      axios.get(`${base_url}/genres`).then(res=>setGenres(res?.data?.genres))
    },[id])



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

      <div className="my-2 mx-3 md:mx-0">
        <img src="/image/homePageAds.png" alt="" />
      </div>

      {/* route */}
      <div className="px-3 md:px-0">
        <span className="text-gray-700 text-[15px]">Home {">"} Genres{">"} {content?.title}</span>
      </div>

      {/* Movies tag */}
      <div className="bg-red-600 px-3 py-2 text-white inline-block mt-2 mx-3 md:mx-0">
        <span>{content?.title}</span>
      </div>

      
      {/* articles and adds */}

      <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-10 px-3 lg:px-0 my-3">
        {/* articles */}
        <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-2 self-start gap-3 ">
          {content?.articles?.map((article) => (
            <div
            key={article.id}
            style={{
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
            className="flex flex-col justify-between gap-2   py-3 px-3 cursor-pointer rounded-md border-4 border-white"
          >
            <div
             onMouseEnter={() =>
              setIshover({ value: article.id, state: true })
            }
            onMouseLeave={() => setIshover({ value: null, state: false })}
              onClick={() => {
                router(`/articles/article-details/${article.id}`);
              }}
              className="w-[100%] h-[125px] md:h-[250px] flex items-center justify-center"
            >
              <img className="w-[100%] h-full" src={article?.thumbnail} alt="" />
            </div>
      
            <span className={`px-1 ${
                isHover.value === article.id && "text-red-600"
              } font-semibold`}>{`${article?.title.slice(0, 35)}....`}</span>
            <div className="flex items-center justify-between ">
            <span className="px-1 pb-1 text-gray-600 text-[12px]">
              {manageDateFormate(article?.created_at)}
            </span>
            <div className="flex items-center gap-1 pb-1"> 
                <span 
                onClick={()=>{
                  router(`${article?.category_id==1?"/articles/movies":article?.category_id==2 ? "articles/tv-shows":"/articles/web-series"}`)
                }} 
                className="text-[12px] border border-orange-900 bg-orange-600 hover:bg-orange-900 p-1 rounded-md text-white animate-pulse" >{
                    article?.category_id==1?"Movie":article?.category_id==2?"TV Shows":article?.category_id==3 && "Web Series"
                }</span>      
            </div>
            </div>
          </div>
          ))}
        </div>

        {/* adds and etc */}
        <div className="w-full flex flex-col ">
          {/* adds */}
          <div className="bg-red-800 h-[250px]">adds 1</div>

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
          <div className="bg-red-800 h-[250px]">adds 2</div>

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
                onClick={()=>router(`/articles/genres/${genre?.id}`)}
                  key={genre?.id}
                  className="bg-[#0386FF] p-1 flex justify-between text-white cursor-pointer"
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
          <div className="bg-red-800 h-[250px]">adds 2</div>

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
          <div className="bg-red-800 h-[250px]">adds 2</div>
        </div>
      </div>
      {/* advertise */}
      <div className="my-2 mx-3 lg:mx-0">
        <img src="/image/homePageAds.png" alt="" />
      </div>
    </Layout>
  )
}

export default SingleGenreContentPage
