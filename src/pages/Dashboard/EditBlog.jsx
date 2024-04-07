/* eslint-disable react-hooks/rules-of-hooks */
// const { default: Layout } = require("@/components/Shared/Layout");

import axios from "axios";

import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaArrowAltCircleLeft, FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import base_url from "../../Utils/Url";
import DashboardLayout from "../../components/Layout/DashboardLayout";



const BlogEditPage = () => {
  // jodit react editor
  const editor = useRef(null);

  const [blogTitle, setBlogTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [blogSummery,setBlogSummery]=useState("")
  const [existstingContent, setExiststingContent] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategories, setSelectedCategories] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [genres, setGenres] = useState([]);
  const [categories, setCategories] = useState([]);
  const [token,setToken]=useState('')
  const [isChecked,setIsChecked]=useState(false)

  const router = useNavigate();
  const {id} = useParams()
  

  
  useEffect(() => {

    const token = localStorage?.getItem("token");
    setToken(token)

    // get all existing details
    axios.get(`${base_url}/articles/${id}`).then((res) => {
      if (res?.data) {
        
        setBlogTitle(res?.data?.article?.title);
        setExiststingContent(res?.data?.article?.body);       
        setContent(res?.data?.article?.body);
        setBlogSummery(res?.data?.article?.summery);
        setSelectedCategories(res?.data?.article?.category_id);
        setTags(res?.data?.article?.tags? res?.data?.article?.tags?.split(","): []);
        setThumbnail(res?.data?.article?.thumbnail)
        setIsChecked(res?.data?.article?.top10 ==1 ? true: false)
        const newGenres = res?.data?.article?.genres.map((genre) => {
          return {
            id: genre.id,
            title: genre.title,
          };
        });
        setSelectedGenres(newGenres);
      }
    });

      // get all genres
      axios
      .get(`${base_url}/genres`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setGenres(res.data.genres));

    axios
      .get(`${base_url}/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCategories(res.data.categories);
      });

  }, [id]);


  //  create a new array of genre id from selectedGenres
  const selectedIds = selectedGenres?.map((gen) => gen.id);


  // submit action
  const handleUpdateBlog = async (e) => {
    e.preventDefault();

    const file = e.target.images.files[0];
    
    const blogData = {
      title: blogTitle,
      thumbnail: file?file:thumbnail?thumbnail:"",
      body: content,
      category_id: selectedCategories,
      genres: JSON.stringify(selectedIds),
      tags: tags.join(","),
      top10:isChecked?1:0
    };

    // create formdata and append value into it
    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("thumbnail", blogData?.thumbnail );
    formData.append("body", blogData.body);
    formData.append("genres", blogData.genres);
    formData.append("category_id", blogData.category_id);
    formData.append("tags", blogData.tags);
    formData.append("top10",blogData.top10)
 

    try {
      const res = await fetch(`${base_url}/articles/update/${id}`, {
        method: "POST",
        headers: {
          "Accept":"application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (data.msg=="success") {
        toast.success('Blog Updated Successfully',{
                position:"top-right"
              })
            router('/dashboard/all-blogs')
      }
    } catch (error) {
      toast.error('Cannot update.Error Arised')
    }
  };

  return (
    <DashboardLayout>
     <div className="w-[95%] mx-auto lg:w-full">
 {/* page title */}
 <div className="mb-6">
        <h1 className="text-2xl border-4 px-2 py-1 border-orange-700 ">
          Edit Blog
        </h1>
      </div>

      <div className="bg-green-500 px-6 py-2 my-3 inline-block">
         <div onClick={()=>router('/dashboard/all-blogs')} className="flex items-center gap-3 cursor-pointer">
         <FaArrowAltCircleLeft/>
          <span>Back</span>
         </div>
          </div>


      {/* blog main body---> what's on your mind */}
      <div className="px-5 py-5 rounded-md bg-white ">
        {/* page title start */}
        <h1 className="text-base md:text-lg lg:text-2xl font-bold">
          What&apos;s on your mind??
        </h1>
        {/* page title end */}

       
        {/* blog content */}
        <form onSubmit={handleUpdateBlog}>
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
                  defaultValue={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  placeholder="Write Blog Title"
                  type="text"
                  className="w-[100%] md:w-[80%] outline-none border-2 border-gray-500 text-[14px] rounded-lg px-5 py-5"
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
                  className="w-[100%] md:w-[60%] outline-none border-2 border-gray-500 rounded-lg px-5 py-5"
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
                defaultValue={blogSummery}
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
                value={existstingContent || content}
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
                      {selectedCategories == 1 ? "Movie" : selectedCategories==2?"Tv Shows":selectedCategories==3 && "Web Series"}
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
              <label htmlFor="categories" className=" text-base ">
                Select Category
              </label>
              <div>
                <select
                  className="px-5 py-2 border border-orange-700 "
                  name=""
                  id=""
                  defaultValue={selectedCategories}
                  onChange={(e) => setSelectedCategories(e.target.value)}
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
            {/* categories ends */}

            {/* genress  start*/}
            <div className="border border-gray-500 p-3 flex flex-col gap-2">
              {/* Genres show start*/}
            <div className="my-b">
              <span className="text-base md:text-lg lg:text-xl font-semibold">
                Selected Genre
              </span>

              <div className="flex gap-2 items-center mt-3">
                {!selectedGenres?.length > 0 && <span>No available genre</span>}

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
            {/* Genres show end*/}

            {/*Genres add start*/}
            <div className="flex flex-col gap-2">
              <label htmlFor="categories" className=" text-base ">
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
            {/*Genres add end*/}
            </div>
            {/* genress  end*/}

            
              {/* // tags start*/}
              <div className="border border-gray-500 p-3 flex flex-col gap-2">
                {/* show tags start*/}
                <div className="my-b">
                  <span className="mb-1 text-base md:text-lg lg:text-xl font-semibold">
                    Added tags
                  </span>

                  <div className="flex gap-2 items-center mt-3">
                    {!tags?.length > 0 && <span>No availabe tags</span>}
                    {tags?.length > 0 &&
                      tags.map((tag, i) => (
                        <div
                          className="border border-orange-700  px-4 py-1 flex gap-2 items-center"
                          key={i}
                        >
                          <span>{tag}</span>
                          <span
                            onClick={() => {
                              
                              const filteredTag = tags?.filter((t) => {
                                
                                return t != tag;
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
                  <label htmlFor="tags" className=" text-base ">
                    Add Tags
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      onChange={(e) => setTag(e.target.value)}
                      value={tag}
                      type="text"
                      placeholder="ex: #romantic_movie"
                      className="px-5 py-2 outline-none rounded border border-orange-700 "
                    />
                    <span
                      onClick={() => {
                        setTags((prev) => [tag, ...prev]);
                        setTag("");
                      }}
                      className="bg-blue-500 px-12 py-2 text-white rounded-md cursor-pointer"
                    >
                      Add
                    </span>
                  </div>
                </div>
                {/* add tags end */}
              </div>
              {/* // tags end*/}

                {/* select top-10 -> start*/}
            <div className="flex gap-3 items-center text-[20px]">
              <div className="flex items-center gap-2">
                <FaStar style={{boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px"}} className="text-[#fcb51c] font-extrabold"/>
                <span>Featured</span>
                </div>
              <div>
              <input checked={isChecked} id="checkbox" onChange={(e)=>setIsChecked(e.target.checked)} type="checkbox" className="outline-none mb-0 pb-0 border-2 border-blue-700" />
              </div>
            </div>
            {/* select top-10 -> end*/}

            

            {/* submit button */}
            <div>
              <button
                type="Submit"
                className="bg-purple-700 px-12 py-3 rounded shadow-md text-white font-bold"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
     </div>
    </DashboardLayout>
  );
};

export default BlogEditPage;
