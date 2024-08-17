/* eslint-disable react-hooks/rules-of-hooks */

import axios from "axios";

import { useContext, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { BlogContext } from "../../ContextApi/BlogContext";
import base_url from "../../Utils/Url";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import BlogDeleteModal from "../../components/Shared/Modal/BlogDeleteModal";

const token = localStorage.getItem("token");
const AllBlogsPage = () => {
  const router = useNavigate();

  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentSelectedArticle, setCurrentSelectedArticle] = useState({});
  const {
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    allBlogDelete,
    setAllBlogDelete,
  } = useContext(BlogContext);

  const fetchArticles = () => {
    axios
      .get(
        `${base_url}/articles${
          selectedCategory == "" ? "" : `?category_id=${selectedCategory}`
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => setArticles(res.data.articles));
  };

  useEffect(() => {
    fetchArticles();
    axios
      .get(`${base_url}/categories`)
      .then((res) => setCategories(res?.data?.categories));
  }, [isDeleteModalOpen.value, selectedCategory, allBlogDelete]);

  const allDates = articles?.map((article) => article?.created_at);

   const allYears=[]

  allDates?.map(date=>{
    const newDate=new Date(date) 
    allYears.push(newDate.getFullYear()) 
  })

  let uniqueDates = [...new Set(allYears)];
 

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
    <DashboardLayout>
      <div className="flex gap-3 px-2 items-center border-b-4 border-t-4 border-slate-900">
        <span className="text-slate-900 text-[28px]">All Blogs</span>
      </div>
        <div className="my-5 flex justify-end ">
        <span style={{
            boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
          }}
          onClick={() => router("/dashboard/add-new-blog")}
          className="w-fit flex justify-between items-center gap-x-2  border-2 border-slate-900 px-3 py-1 rounded-md cursor-pointer hover:bg-slate-900 hover:text-white hover:font-bold "
        >
          <p className="font-bold text-xl">+</p>
          <p>Add New</p>
        </span>
        </div>

      {/* main body start */}
      <div className="flex flex-col mt-10 relative ">
        {/* search and filer option start*/}
        <div className=" flex justify-between w-[95%] mx-auto">
          <div className="flex flex-col md:flex-row gap-3 md:items-center justify-around w-full">
            {/* bulk actions start */}
            <div className="flex items-center gap-3">
              <select className="px-10 py-2 rounded bg-gray-300 border border-slate-700 outline-none" name="" id="">
                <option className="bg-white text-black" value="">
                  Bulk Actions
                </option>
              </select>
              {/* <span className="border border-orange-700 px-3 rounded text-orange-700 cursor-pointer">
                Apply
              </span> */}
            </div>
            {/* bulk actions ends */}
            <div className="flex flex-row gap-2 items-center justify-between">
              <div>
                <select className="px-10 py-2 rounded bg-gray-300 border border-slate-700 outline-none" name="" id="">
                  <option value="">All Dates</option>
                  {
                  uniqueDates?.map((year,i)=>(
                    <option key={i} value={year}>{year}</option>
                  ))
                }
                </select>
              </div>
              <div className="flex items-center gap-4">
                <select
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-10 py-2 rounded bg-gray-300 border border-slate-700 outline-none"
                  name=""
                  id=""
                >
                  <option value="">All Category</option>
                  {categories?.map((cat) => (
                    <option key={cat?.id} value={cat?.id}>
                      {cat?.title}
                    </option>
                  ))}
                </select>
                {/* <span className="border border-orange-700  px-3 rounded text-orange-700 cursor-pointer">
                  Apply
                </span> */}
              </div>
            </div>
            <div
              onClick={() => {
                setAllBlogDelete(true);
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
              }}
              className=" cursor-pointer"
            >
              <div className="group bg-slate-900 flex items-center gap-2 w-[50%] lg:w-full  px-3 py-1 rounded-md text-white">
                <IoTrashBin className="group-hover:text-red-600 text-red-200"/>
                <span className="group-hover:text-red-600 text-red-200">Clear All</span>
              </div>
            </div>
          </div>
        </div>
        {/* search and filer option end*/}

        {/* show table with available blogs start */}
        <div className="w-[95%] lg:w-full mx-auto relative overflow-x-auto overflow-y-auto lg:max-w-screen  max-h-screen mt-5 border-2 border-slate-700 ">
          <table className="w-full">
            <thead className="sticky top-0 text-base bg-slate-900 text-white w-full">
              <tr className="border-b border-slate-700 ">
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
              {articles.slice().reverse().map((article) => {
                return (
                  <tr
                    key={article.id}
                    className="border-b border-black text-[14px] "
                  >
                    <td style={{ display: 'table-cell', verticalAlign: 'middle' }} className="px-3 py-3 text-center">{`${article?.title.slice(
                      0,
                      10
                    )}...`}</td>
                    <td style={{ display: 'table-cell', verticalAlign: 'middle' }} className="px-3 py-3 text-center">
                      <span className="w-full flex justify-center">
                        <img
                          className="w-16 h-12 object-cover"
                          src={article?.thumbnail}
                          alt=""
                        />
                      </span>
                    </td>
                    <td style={{ display: 'table-cell', verticalAlign: 'middle' }} className="px-3 py-3 text-center">
                      {article?.category_id == 1
                        ? "Movie"
                        : article?.category_id == 2
                        ? "Tv Shows"
                        : article?.category_id == 3
                        ? "Web Series"
                        : ""}
                    </td>
                    <td style={{ display: 'table-cell', verticalAlign: 'middle' }} className="px-3 py-3 text-center">
                      {article?.genres.map((genre, i) => (
                        <div className="inline p-1" key={i}>
                          {!genre ? "N/A" : genre?.title}
                        </div>
                      ))}
                    </td>
                    <td style={{ display: 'table-cell', verticalAlign: 'middle' }} className="px-3 py-3 text-center">
                    {article?.tags.map((tag, i) => (
                        <div className="inline p-1" key={i}>
                          {!tag ? "N/A" : tag?.name}
                        </div>
                      ))}
                    </td>
                    <td style={{ display: 'table-cell', verticalAlign: 'middle' }} className="px-3 py-3 text-center">
                      {manageDateFormate(article?.created_at)}
                    </td>
                    <td style={{ display: 'table-cell', verticalAlign: 'middle' }} className="px-3 py-3 text-center  ">
                      <div
                      className="flex gap-2 items-center justify-center">
                      <span onClick={()=>{
                        router(`/articles/article-details/${article?.id}`)
                      }} className=" px-1 text-white font-bold rounded cursor-pointer">
                        <FaEye className="text-blue-500 text-lg font-bold hover:text-blue-400"/>
                      </span>
                      <span
                        onClick={() => {
                          setIsDeleteModalOpen({
                            value: article?.id,
                            status: true,
                            from: "all",
                          });
                          setCurrentSelectedArticle(article);
                        }}
                        className="px-1 text-white font-bold rounded cursor-pointer"
                      >
                        <RiDeleteBin6Fill className="text-red-500 text-lg font-bold hover:text-red-400"/>
                      </span>
                      <span
                        onClick={() =>
                          router(`/dashboard/edit-blog/${article?.id}`)
                        }
                        className="px-1 text-white font-bold rounded cursor-pointer"
                      >
                        <MdEditSquare className="text-green-800 text-lg font-bold hover:text-green-600"/>
                      </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* deleteModal */}
        {(isDeleteModalOpen.status || allBlogDelete) && (
          <div className="absolute top-[25%] left-[15%] lg:left-[25%]">
            <BlogDeleteModal article={currentSelectedArticle} />
          </div>
        )}

        {/* show table with available blogs end */}
      </div>
      {/* main body end */}
    </DashboardLayout>
  );
};

export default AllBlogsPage;
