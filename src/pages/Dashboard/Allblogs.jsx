/* eslint-disable react-hooks/rules-of-hooks */

import axios from "axios";

import { useContext, useEffect, useState } from "react";
import { IoTrashBin } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { BlogContext } from "../../ContextApi/BlogContext";
import base_url from "../../Utils/Url";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import BlogDeleteModal from "../../components/Shared/Modal/BlogDeleteModal";

const token=localStorage.getItem('token')
const AllBlogsPage = () => {
  const router = useNavigate();

  const [articles,setArticles]=useState([])
  const [categories,setCategories]=useState([])
  const [selectedCategory,setSelectedCategory]=useState('')
  const [currentSelectedArticle,setCurrentSelectedArticle]=useState({})
  const {isDeleteModalOpen,setIsDeleteModalOpen,allBlogDelete,setAllBlogDelete}=useContext(BlogContext)



  const fetchArticles=()=>{
    axios
      .get(`${base_url}/articles${selectedCategory=="" ? "":`?category_id=${selectedCategory}`}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setArticles(res.data.articles));
  }

  useEffect(() => {
    fetchArticles()
    axios.get(`${base_url}/categories`).then(res=>setCategories(res?.data?.categories))
  }, [isDeleteModalOpen.value,selectedCategory,allBlogDelete]);


  
 const allDates=articles?.map(article=>article?.created_at)
 
 console.log("🚀 ~ index ~ allDates:", allDates)


//  const allYears=[]

// allDates?.map(date=>{
//   const newDate=new Date(deactivated() {
    
//   },
  
// })

  const manageDateFormate=(date)=>{
    const newDate=new Date(date)
    const dateString=newDate.toDateString()
    const dateArray=dateString.split(" ")
    const day=dateArray[0]
    const currentDate=dateArray[2]
    const month=dateArray[1]
    const year=dateArray[3]
    

    return `${day},${currentDate}th ${month},${year}`
  }


  return (
    <DashboardLayout>
      <div className="flex gap-3 px-2 items-center">
        <span className="text-orange-700 text-[28px]">All Blogs</span>
        <span
          onClick={() => router("/dashboard/add-new-blog")}
          className="border-2 border-orange-700 px-5 py-1 rounded-md cursor-pointer"
        >
          Add New
        </span>
      </div>


      {/* main body start */}
      <div className="flex flex-col mt-10 relative ">
        {/* search and filer option start*/}
        <div className=" flex justify-between w-[95%] mx-auto">
          <div className="flex flex-col md:flex-row gap-3 md:items-center justify-around w-full">
            {/* bulk actions start */}
            <div className="flex items-center gap-3">
              <select className="px-10 py-2 rounded" name="" id="">
                <option className="bg-white text-black" value="">Bulk Actions</option>
              </select>
              {/* <span className="border border-orange-700 px-3 rounded text-orange-700 cursor-pointer">
                Apply
              </span> */}
            </div>
            {/* bulk actions ends */}
            <div className="flex flex-row gap-2 items-center justify-between">
              <div>
              <select className="px-10 py-2 rounded" name="" id="">
                <option value="">All Dates</option>
                {/* {
                  allYear?.map((year,i)=>(
                    <option key={i} value={year}>{year}</option>
                  ))
                } */}
              </select>
              </div>
              <div className="flex items-center gap-4">
                <select onChange={(e)=>setSelectedCategory(e.target.value)} className="px-10 py-2 rounded" name="" id="">
                  <option value="">All Category</option>
                  {
                    categories?.map(cat=>(
                      <option key={cat?.id} value={cat?.id}>{cat?.title}</option>
                    ))
                  }
                </select>
                {/* <span className="border border-orange-700  px-3 rounded text-orange-700 cursor-pointer">
                  Apply
                </span> */}
              </div>
            </div>
              <div onClick={()=>{

               setAllBlogDelete(true)
                // fetch(`${baseUrl}/articles/destroy/all`,{
                //   method:'POST',
                //   headers:{
                //     'Accept':'appication/json',
                //     'Content-type':'application/json',
                //     Authorization:`Bearer ${token}`
                //   }
                // }).then(res=>res.json()).then(data=>{
                //   if(data?.msg=='success'){
                //     fetchArticles()
                //   }
                // })
              }} className=" cursor-pointer">
                <div className="bg-red-600 flex items-center gap-2 w-[50%] lg:w-full  px-3 py-1 rounded-md text-white">
                <IoTrashBin/>
                <span>Clear All</span>
                </div>
              </div>
          </div>
        </div>
        {/* search and filer option end*/}

        {/* show table with available blogs start */}
        <div className="w-[95%] mx-auto relative overflow-x-auto overflow-y-auto lg:max-w-screen  max-h-screen mt-5 border-2 border-orange-700 ">
          <table className="w-full">
            <thead className="sticky top-0 text-base bg-gray-400 w-full">
              <tr className="border-b border-orange-700 ">
                <th scope="col" className="px-10 py-3">
                  Title
                </th>
                <th scope="col" className="px-10 py-3">
                  Thumbnail
                </th>
                <th scope="col" className="px-10 py-3">
                  Category
                </th>
                <th scope="col" className="px-10 py-3">
                  Genres
                </th>
                <th scope="col" className="px-10 py-3">
                  Tag
                </th>
                <th scope="col" className="px-10 py-3">
                  Created
                </th>
                <th scope="col" className="px-10 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {
                articles.map(article=>{
                  
                  return (
                    (
                      <tr key={article.id} className="border-b border-black text-[14px]">
                        <td className="px-3 py-3 text-center">{`${article?.title.slice(0,10)}...`}</td>
                        <td className="px-3 py-3 text-center">
                          <span className="w-full flex justify-center"><img className="w-16 h-12 object-cover" src={article?.thumbnail} alt="" /></span>
                        </td>
                        <td className="px-3 py-3 text-center">
                          {article?.category_id==1?"Movie":article?.category_id==2?"Tv Shows":article?.category_id==3?"Web Series":""}
                        </td>
                        <td className="px-3 py-3 text-center">
                          {article?.genres.map((genre,i)=>(
                            <div className="inline p-1" key={i}>{!genre?"N/A":genre?.title}</div>
                          ))}
                        </td>
                        <td className="px-3 py-3 text-center">
                          {`${article?.tags? `${article?.tags?.slice(0,10)}..`:"N/A"}`}
                        </td>
                        <td className="px-3 py-3 text-center">
                          {manageDateFormate(article?.created_at)}
                        </td>
                        <td className="px-3 py-3 text-center flex gap-2 items-center justify-center h-full">
                          <span onClick={()=>{
                          
                            setIsDeleteModalOpen({
                              value:article?.id,status:true,from:"all"
                            })
                            setCurrentSelectedArticle(article)
                          }}
                          
                          className="bg-red-500 px-3 py-1 text-white font-bold rounded cursor-pointer">Delete</span>
                          <span onClick={()=>router(`/dashboard/edit-blog/${article?.id}`)} className="bg-red-500 px-3 py-1 text-white font-bold rounded cursor-pointer">Edit</span>
                          
                          </td>
                      </tr>
                    )
                  )
                })
              }
            </tbody>
          </table>

        </div>
        
          {/* deleteModal */}
          {
           ( isDeleteModalOpen.status || allBlogDelete) && <div className="absolute top-[25%] left-[15%] lg:left-[25%]"><BlogDeleteModal article={currentSelectedArticle}/></div>
          }

        {/* show table with available blogs end */}
      </div>
      {/* main body end */}
    </DashboardLayout>
  );
};

export default AllBlogsPage;
