/* eslint-disable react-hooks/rules-of-hooks */
// const { default: Layout } = require("@/components/Shared/Layout");

import axios from "axios";


import { FaStar } from "react-icons/fa";
// import JoditEditor from "jodit-react";
import JoditEditor from 'jodit-react';
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import base_url from "../../Utils/Url";
import DashboardLayout from "../../components/Layout/DashboardLayout";



const AddNewBlogPage = () => {
  const editor = useRef(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [content, setContent] = useState("");
  const [blogSummery,setBlogSummery]=useState("")
  const [selectedCategories, setSelectedCategories] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [genres, setGenres] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isChecked,setIsChecked]=useState(false)
  const buttonRef = useRef();
  const router = useNavigate();

const token=localStorage.getItem('token')

  useEffect(() => {

    // get all genres
    axios
      .get(`${base_url}/genres`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setGenres(res.data.genres));


      // get all categories
    axios
      .get(`${base_url}/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        
        setCategories(res.data.categories);
        setSelectedCategories(res?.data?.categories[0]?.id);
      });
  }, []);




  const selectedIds = selectedGenres.map((gen) => (gen.id));
  const selectedTagIds=tags.map(tag=>(tag.id))


  const handlePost = async (e) => {
    e.preventDefault();

    const file = e.target.images.files[0];

    const blogData = {
      title: blogTitle,
      thumbnail: file ? file : "",
      summery:blogSummery,
      body: content,
      category_id: selectedCategories,
      genres:JSON.stringify(selectedIds),
      tags: (selectedTagIds),
      top10:isChecked ? 1:0
    };

    

  
    const formData = new FormData();

    formData.append("title", blogData.title);
    formData.append("thumbnail", blogData.thumbnail);
    formData.append("summery", blogData.summery);
    formData.append("body", blogData.body);
    formData.append("genres", blogData.genres);
    formData.append("category_id", blogData.category_id);
    // formData.append("tags", blogData.tags);
    formData.append("top10", blogData.top10);
    blogData.tags.map(tag=>{
      formData.append('tags[]',tag)
    })

    

    try {
      const res = await fetch(`${base_url}/articles/create`, {
        method: "POST",
        headers: {
          'Accept':'application/json',
          // 'content-type':'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
     

      if (data.msg=='success') {
        toast.success('New blog Added Successfully',{
                position:"top-right"
              })
              router('/dashboard/all-blogs')
      }
     
    } catch (error) {
      console.log(error);
      toast.error("Error arised");
    }
  };




  return (
    <DashboardLayout>
      <div className="w-[95%] mx-auto lg:w-full">
        {/* page title */}
      <div className="mb-6">
        <h1 className="text-2xl border-4 px-2 py-1 border-orange-700 ">
          Add New Blog
        </h1>
      </div>

      {/* blog main body---> what's on your mind */}
      <div className="px-5 py-5 rounded-md bg-white ">
        <h1 className="text-base md:text-lg lg:text-2xl font-bold">
          What&apos;s on your mind??
        </h1>

        {/* blog content */}
        <form onSubmit={handlePost}>
          <div className="mt-10 flex flex-col gap-5">

            {/* blog title start */}
            <div className="flex flex-col gap-3 ">
              <label
                htmlFor="title"
                className=" text-base md:text-lg lg:text-xl font-semibold"
              >
                Tilte
              </label>
              <div className="w-full l">
                <input
                  onChange={(e) => setBlogTitle(e.target.value)}
                  placeholder="Write Blog Title"
                  type="text"
                  className="w-[100%] md:w-[60%] outline-none border-2 border-gray-500  rounded-lg px-5 py-5"
                />
              </div>
            </div>
            {/* blog title end */}

            {/* blog thumbnail start*/}
            <div className="flex flex-col gap-3 ">
              <label
                htmlFor="thumbnail"
                className=" text-base md:text-lg lg:text-xl font-semibold"
              >
                Add Thumbnail
              </label>
              <div className="w-full l">
                <input
                  type="file"
                  name="images"
                  className="w-[100%] md:w-[60%] outline-none border-2 border-gray-500  rounded-lg px-5 py-5"
                />
              </div>
            </div>
            {/* blog thumbnail end*/}

            {/* blog summery start */}
            <div className="flex flex-col gap-3 ">
              <label
                htmlFor="summery"
                className=" text-base md:text-lg lg:text-xl font-semibold"
              >
                Blog Overview
              </label>
              <div className="w-full h-[200px] ">
                <textarea
                  onChange={(e) => setBlogSummery(e.target.value)}
                  placeholder="Write Blog summery"
                  type="text"
                  className="w-[100%] md:w-[60%] h-full outline-none border-2 border-gray-500  rounded-lg px-5 py-5 resize-none"
                />
              </div>
            </div>
            {/* blog summery end */}

            {/* blog details start */}
            <div>
              <label
                htmlFor="title"
                className=" text-base md:text-lg lg:text-xl font-semibold"
              >
                Blog Details
              </label>
              <JoditEditor
                className="border border-orange-700  bg-red-600 mt-3"
                ref={editor}
                value={content}
                onChange={(newContent) => {
                  setContent(newContent);
                }}
              />
            </div>
            {/* blog details end */}

            {/* categories start */}
            <div className="border border-gray-500 p-3 flex flex-col gap-2">
              
              {/* view selected category start */}
              <div className="my-b">
                <span className="text-base md:text-lg lg:text-xl font-semibold">
                  Selected Category
                </span>

                <div className="flex gap-2 items-center mt-3">
                  {!selectedCategories && <span>No available category</span>}

                  {selectedCategories && (
                    <div className="border border-orange-700  px-4 py-1 flex gap-2 items-center">
                      <span>
                        {selectedCategories == 1 ? "Movie" :selectedCategories == 2 ? "Tv Shows":selectedCategories == 3 ? "Web Series":""}
                      </span>
                      <span
                        onClick={() => {
                          setSelectedCategories("");
                        }}
                        className="bg-red-500 px-1 cursor-pointer text-white"
                      >
                        x
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {/*view selected category end */}

              {/*select category start */}
              <div className="flex flex-col gap-2">
                <label htmlFor="categories" className="text-base">
                  Select Category
                </label>
                <div>
                  <select
                    className="px-5 py-2 border border-orange-700 "
                    name=""
                    id=""
                    defaultValue={categories[0]?.id}
                    onChange={(e) =>
                      // const existCat=categories.find
                      setSelectedCategories(e.target.value)
                    }
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/*select category end */}
            </div>
            {/* categories end */}

            {/* genres start */}
            <div className="border border-gray-500 p-3 flex flex-col gap-2">
              {/*genres show start*/}
              <div className="my-b">
                <span className="mb-1 text-base md:text-lg lg:text-xl font-semibold">
                  Added Genre
                </span>

                <div className="flex gap-2 items-center">
                  {!selectedGenres?.length > 0 && (
                    <span>No available genre</span>
                  )}

                  {selectedGenres?.length > 0 &&
                    selectedGenres.map((selectedGenre) => (
                      <div
                        className="border border-orange-700  px-4 py-1 flex gap-2 items-center"
                        key={selectedGenre.id}
                      >
                        <span>{selectedGenre.title}</span>
                        <span
                          onClick={() => {
                            
                            const filteredGenre = selectedGenres?.filter(
                              (cat) => {
                                
                                return cat.id != selectedGenre.id;
                              }
                            );
                            
                            setSelectedGenres(filteredGenre);
                          }}
                          className="bg-red-500 px-1 cursor-pointer text-white"
                        >
                          x
                        </span>
                      </div>
                    ))}
                </div>
              </div>
              {/*genres show end*/}

              {/* genres add start */}
              <div className="flex flex-col gap-2">
                <label htmlFor="categories" className=" text-base">
                  Add Genre
                </label>
                <div>
                  <select
                    className="px-5 py-2 border border-orange-700 "
                    name=""
                    id=""
                    onChange={(e) =>
                      setSelectedGenres((prev) => [
                        JSON.parse(e.target.value),
                        ...prev,
                      ])
                    }
                  >
                    {genres.map((genre) => (
                      <option
                        key={genre.id}
                        value={JSON.stringify({
                          title: genre.title,
                          id: genre.id,
                        })}
                      >
                        {genre.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* genres add end */}
            </div>
            {/* genres end */}

            {/* tagss start */}
            <div className="border border-gray-500 p-3 flex flex-col gap-2">

              {/* show tags start*/}
              <div className="my-b">
                <span className="mb-1 text-base md:text-lg lg:text-xl font-semibold">
                  Added tags
                </span>
                <div className="flex gap-2 items-center">
                  {!tags?.length > 0 && <span>No availabe tags</span>}
                  {tags?.length > 0 &&
                    tags.map((tag, i) => (
                      <div
                        className="border border-orange-700  px-4 py-1 flex gap-2 items-center"
                        key={i}
                      >
                        <span>{tag?.name}</span>
                        <span
                          onClick={() => {
                            
                            const filteredTag = tags?.filter((t) => {
                              
                              return t.id != tag.id;
                            });
                            setTags(filteredTag);
                          }}
                          className="bg-red-500 px-1 cursor-pointer text-white"
                        >
                          x
                        </span>
                      </div>
                    ))}
                </div>
              </div>
              {/* show tags end*/}

              {/* add tags start */}
              <div className="flex flex-col gap-2">
                <label htmlFor="tags" className="text-base">
                  Add Tags
                </label>
                <div className="flex flex-col md:flex-row gap-2 md:items-center">
                  <input
                    onChange={(e) => setTag(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key == "Enter") {
                        e.preventDefault();
                        buttonRef.current.click();
                      }
                    }}
                    value={tag}
                    type="text"
                    placeholder="ex: #romantic_movie"
                    className="px-5 py-2 outline-none rounded border border-orange-700 "
                  />
                  <span
                    ref={buttonRef}
                    onClick={() => {
                      // setTags((prev) => [tag, ...prev]);
                      setTag("");
                     

                    fetch(`${base_url}/tags`,{
                      method:'GET',
                      headers:{
                        Accept:'application/json'
                      }
                    }).then(res=>res.json()).then(data=>{
                      if(data?.msg=='success'){
                        let tagExists;
                        data?.tags.find(t=>{
                          
                          if(t?.name==tag){
                            tagExists=true
                            setTags((prev)=>[{
                              id:t?.id,name:t?.name
                            },...prev])
                          }                         
                        })
                        if(!tagExists){
                          const data={
                            name:tag
                          }
                          fetch(`${base_url}/tags/create`, {
                            method: "POST",
                            headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify(data),
                          }).then(res=>res.json()).then(data=>{
                            if(data?.msg=='success'){
                              setTags((prev)=>[{
                                id:data?.tag?.id,name:data?.tag?.name
                              },...prev])
                            }
                          })
                        }
                      }
                    })

                      
                       
                    }}
                    className="bg-blue-500  w-[50%] lg:w-[25%] text-center px-12 py-2 cursor-pointer text-white rounded-md"
                  >
                    Add
                  </span>
                </div>
              </div>
              {/* add tags end */}
            </div>
            {/* tags end */}

            {/* select top-10 */}
            <div className="flex gap-3 items-center text-[20px]">
              <div className="flex items-center gap-2">
                <FaStar style={{boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px"}} className="text-[#fcb51c] font-extrabold"/>
                <span>Featured</span>
                </div>
              <div>
              <input checked={isChecked} id="checkbox" onChange={(e)=>setIsChecked(e.target.checked)} type="checkbox" className="outline-none mb-0 pb-0 border-2 border-blue-700" />
              </div>
            </div>

            {/* submit button */}
            <div>
              <button
                type="Submit"
                className="bg-purple-700 px-12 py-3 rounded shadow-md text-white font-bold"
              >
                Post
              </button>
            </div>
          </div>
        </form>

       
      </div>
      </div>
    </DashboardLayout>
  );
};

export default AddNewBlogPage;
