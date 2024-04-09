
import axios from 'axios';
import { useEffect, useState } from 'react';
import { TbTriangleSquareCircleFilled } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import images from '../../../config';
import base_url from '../../Utils/Url';
import Layout from '../../components/Layout/Layout';
import ArticleCard from '../../components/Shared/Card/ArticleCard';
import SuggestionCard from '../../components/Shared/Card/SuggestionCard';

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


const Top50ArticlesPage = () => {
  const [latestWebSeriesArticles,setLatestWebSeriesArticles]=useState([])
  const [genres,setGenres]=useState([])

  const router=useNavigate()

  useEffect(()=>{
    try {
      // get latest web series articles
      axios.get(`${base_url}/articles/top-10-articles`).then(res=>{
       if(res?.data){
        
         setLatestWebSeriesArticles(res.data.top10articles)
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
 

  return (
    <Layout>
      {/* advertise */}
      
     <div className="w-[90%] lg:w-full mx-auto my-5">
          <img className="w-full" src={images.addImage} alt="" />
        </div>

      {/* articles and adds */}

      <div className="w-[90%] xl:w-full mx-auto grid grid-cols-1 lg:grid-cols-3 items-center gap-5">
        {/* articles */}
        <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-2 self-start gap-3">
          {latestWebSeriesArticles.map((webSeriesArticle) => (
            <ArticleCard key={webSeriesArticle.id} article={webSeriesArticle} />
          ))}
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
                onClick={()=>router(`/articles/Genres/${genre?.id}`)}
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
  )
}

export default Top50ArticlesPage
