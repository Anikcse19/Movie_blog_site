
import axios from "axios";

import { useEffect, useState } from "react";
import { TbTriangleSquareCircleFilled } from "react-icons/tb";
import { VscAccount } from "react-icons/vsc";
import { useNavigate, useParams } from "react-router-dom";
import images from "../../../config";
import base_url from "../../Utils/Url";
import Layout from "../../components/Layout/Layout";
import SuggestionCard from "../../components/Shared/Card/SuggestionCard";


const suggestionMovies = [
  {
    id: 1,
    img:images.suggestionImage,
    title: "10 Best Jennifer Lawrence Movies of All Time, Ranked by Viewers",
  },
  {
    id: 2,
    img:images.suggestionImage,
    title: "10 Best Jennifer Lawrence Movies of All Time, Ranked by Viewers",
  },
  {
    id: 3,
    img:images.suggestionImage,
    title: "10 Best Jennifer Lawrence Movies of All Time, Ranked by Viewers",
  },
  {
    id: 4,
    img:images.suggestionImage,
    title: "10 Best Jennifer Lawrence Movies of All Time, Ranked by Viewers",
  },
];


const ArticleDetailsPage = () => {


  const [article,setArticle]=useState({})
  const [genres,setGenres]=useState([])
  const router = useNavigate();
  const { id } =useParams()
  
  useEffect(()=>{
  
    axios.get(`${base_url}/articles/${id}`).then(res=>setArticle(res.data.article))

     // get all genres
     axios.get(`${base_url}/genres`).then(res=>{
      if(res?.data){
        setGenres(res?.data?.genres)
      }
    })
  },[])


  const manageTags=(tags)=>{
      const tagsArray=tags?.split(",")
      return tagsArray
  }

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
      <div className="my-2 mx-3 lg:mx-0">
        <img src="/image/homePageAds.png" alt="" />
      </div>

      {/* main body */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-5">
        <div className="cols-span-1 lg:col-span-2 px-3 lg:px-0">
          {/* pathname */}
          <div className="my-2">
            <span className="text-gray-700 text-[15px]">
              Home {">"} {article?.category_id==1?"Movies":"Web Series"} {">"}{article?.title}
            </span>
          </div>

          {/* Genre tag */}
          <div className="bg-red-600 px-3 py-2 text-white inline-block mt-2">
            <span>{article?.category_id==1?"Movies":"Web Series"}</span>
          </div>

          {/* Content Title */}
          <div className="my-2">
            <h1 className="text-3xl font-bold ">
             {article?.title}
            </h1>
            {/* blog write and date */}
            <div className="w-[100%] lg:w-[50%] flex justify-between items-center">
              <span className="text-gray-700 text-[15px] flex items-center gap-3">
                {" "}
                <VscAccount /> <p>{article?.user?.name}</p>
              </span>
              <span className="text-gray-700 text-[15px]">
                {manageDateFormate(article?.created_at)}
              </span>
            </div>
          </div>

          {/* content details */}
          <div dangerouslySetInnerHTML={{ __html: article?.body }}/>
            
         
         
          {/* advertise */}
          <div className="my-2">
            <img src="/image/homePageAds.png" alt="" />
          </div>

          {/* tags */}
          <div>
            <span>Tags:</span>
            <div className="flex items-center flex-wrap gap-3">
              {manageTags(article?.tags)?.map((tag,i)=>(
                <span key={i} className="bg-blue-400 px-3 py-1 text-white">{tag}</span>
              ))}
            </div>
          </div>

          {/* Leave Comments */}

          <div className="my-5">
            <h1 className="text-2xl text-[#504F4F] font-bold mb-5">
              Leave A Comment
            </h1>

            <p className="text-[#504F4F] text-sm">
              Your email address will not be published. Required fields are
              marked *
            </p>
            {/* form */}
            <div className="my-5">
              <div className="mb-3 w-[100%]">
                <input
                  className="w-[100%] outline-none px-6 py-6 rounded-lg"
                  type="text"
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-3 w-[100%]">
                <input
                  className="w-[100%] outline-none px-6 py-6 rounded-lg"
                  type="text"
                  placeholder="Your Email"
                />
              </div>
              <div className="mb-3 w-[100%]">
                <input
                  className="w-[100%] outline-none px-6 py-6 rounded-lg"
                  type="text"
                  placeholder="Drop your comment"
                />
              </div>
            </div>
            <button className="bg-black text-white px-5 py-2 rounded-md shadow-md">
              Post
            </button>
          </div>
        </div>

        {/* right side */}
        <div className="px-3 lg:px-0">
          <div className="flex flex-col">
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
                    className="bg-[#0386FF] p-1 flex justify-between cursor-pointer text-white"
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
              <div className="w-[80%] mx-auto p-4">
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
      </div>
      <div className="my-2 mx-3 lg:mx-0">
        <img src="/image/homePageAds.png" alt="" />
      </div>
    </Layout>
  );
};

export default ArticleDetailsPage;
