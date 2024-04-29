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
  

const AuthorBasedArticle = () => {

    const router=useNavigate()
    const [isHover, setIshover] = useState({
        value: null,
        state: false,
    });
    const {id}=useParams()

    // const [latestWebSeriesArticles,setLatestWebSeriesArticles]=useState([])
    const [genres,setGenres]=useState([])
    const [content,setContent]=useState({})
    const [tags,setTags]=useState([])
    
    useEffect(()=>{

      axios.get(`${base_url}/tags`).then(res=>setTags(res?.data?.tags))
 

      axios.get(`${base_url}/articles?user_id=${id}`).then(res=>setContent(res?.data?.articles))
      
  
      // get all genres
      axios.get(`${base_url}/genres`).then(res=>setGenres(res?.data?.genres))
    },[id])

    const currentTag=tags.find(tag=>{
      if(tag?.id==id){
        
        return tag
      }
    })

         
       


    


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
          <img className="w-full object-cover" src={images.addImage} alt="" />
        </div>

      {/* route */}
      {/* <div className=" w-[90%] lg:w-full mx-auto ">
        <span className="text-gray-700 text-[15px]">Home {">"} Genres{">"} {content?.name}</span>
      </div> */}

      {/* page tag */}
      <div className="  w-[90%] lg:w-full mx-auto">

      <div className=" text-white inline-block mt-2 ">
       <span className="text-red-600 text-base lg:text-2xl">Searched By Author:</span> <span className="text-black font-bold text-base lg:text-2xl py-2 px-3">{content[0]?.user?.name}</span>
      </div>
      </div>

      
      {/* articles and adds */}

      <div className="w-[90%] lg:w-full mx-auto grid grid-cols-1 lg:grid-cols-3 items-center gap-5  my-3">
        {/* articles */}
        <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-1 self-start gap-3 ">
          {content?.length>0 && content?.map((article) => {
            const titleLength=article?.title?.length 
            console.log(titleLength)
            return (
              <div
              key={article.id}
              style={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
              className="flex flex-col justify-between gap-2   py-3 px-3 cursor-pointer rounded-md "
            >
              <div
               onMouseEnter={() =>
                setIshover({ value: article.id, state: true })
              }
              onMouseLeave={() => setIshover({ value: null, state: false })}
                onClick={() => {
                  router(`/articles/article-details/${article.id}`);
                  window.scrollTo(0,0)
                }}
                className="w-[100%] h-[125px] md:h-[250px] flex items-center justify-center"
              >
                <img className="w-[100%] h-full object-cover" src={article?.thumbnail} alt="" />
              </div>
        
              <span className={`px-1 ${
                  isHover.value === article.id && "text-red-600"
                } font-semibold hover:text-red-600`}>{article?.title} </span>
  
  
              <div className="flex flex-col lg:flex-row lg:items-center gap-2 justify-between ">
              <span className="px-1 pb-1 text-gray-600 text-[12px]">
                {manageDateFormate(article?.created_at)}
              </span>
              <div className="flex items-center gap-1 pb-1"> 
                  <span 
                  onClick={()=>{
                    router(`${article?.category_id==1?"/articles/movies":article?.category_id==2 ? "articles/tv-shows":"/articles/web-series"}`)
                    window.scrollTo(0,0)
                  }} 
                  className="text-[10px] md:text-[12px] font-bold mx-1 bg-slate-800 hover:bg-slate-700 px-1 py-1 rounded-sm text-white animate-pulse" >{
                      article?.category_id==1?"Movie":article?.category_id==2?"TV Shows":article?.category_id==3 && "Web Series"
                  }</span>      
              </div>
              </div>
            </div>
            )
          }
          )}
        </div>

        {/* adds and etc */}
        <div className="w-full flex flex-col ">
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
                onClick={()=>{router(`/articles/genres/${genre?.id}`)
                window.scrollTo(0,0)
              }}
                  key={genre?.id}
                  className="bg-[#0386FF] hover:bg-[#3b93e5] hover:shadow-xl p-1 flex justify-between text-white cursor-pointer"
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
      <div className="my-2 mx-3 lg:mx-0">
        <img src="/image/homePageAds.png" alt="" />
      </div>
    </Layout>
  )
}

export default AuthorBasedArticle
