/* eslint-disable react-hooks/rules-of-hooks */
// const { default: Layout } = require("@/components/Shared/Layout");

import axios from "axios";

import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import base_url from "../../Utils/Url";
import DashboardLayout from "../../components/Layout/DashboardLayout";

const AddNewBlogPage = () => {
  const editor = useRef(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [content, setContent] = useState("");
  const [blogSummery, setBlogSummery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [genres, setGenres] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [focusDiv, setFocusDiv] = useState("");
  const buttonRef = useRef();
  const titleRef = useRef();
  const router = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    titleRef.current.focus();
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

  const selectedIds = selectedGenres.map((gen) => gen.id);
  const selectedTagIds = tags.map((tag) => tag.id);

  const handlePost = async (e) => {
    e.preventDefault();

    const file = e.target.images.files[0];

    const blogData = {
      title: blogTitle,
      thumbnail: file ? file : "",
      // summery:blogSummery,
      body: content,
      category_id: selectedCategories,
      genres: JSON.stringify(selectedIds),
      tags: selectedTagIds,
      top10: isChecked ? 1 : 0,
    };

    if (!blogData.title) {
      toast.error("The title field is required", {
        position: "top-right",
      });
      return;
    } else if (!blogData.thumbnail) {
      toast.error("The thumbnail field is required", {
        position: "top-right",
      });
      return;
    } else if (!blogData.body) {
      toast.error("The body field is required", {
        position: "top-right",
      });
      return;
    } else if (!blogData.category_id) {
      toast.error("The category field is required", {
        position: "top-right",
      });
      return;
    } else if (JSON.parse(blogData.genres).length <= 0) {
      toast.error("Atleast one genre is must", {
        position: "top-right",
      });
      return;
    }

    const formData = new FormData();

    formData.append("title", blogData.title);
    formData.append("thumbnail", blogData.thumbnail);
    // formData.append("summery", blogData.summery);
    formData.append("body", blogData.body);
    formData.append("genres", blogData.genres);
    formData.append("category_id", blogData.category_id);
    // formData.append("tags", blogData.tags);
    formData.append("top10", blogData.top10);
    blogData.tags.map((tag) => {
      formData.append("tags[]", tag);
    });

    try {
      const res = await fetch(`${base_url}/articles/create`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          // 'content-type':'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (data.msg == "success") {
        toast.success("New blog Added Successfully", {
          position: "top-right",
        });
        router("/dashboard/all-blogs");
      } else {
        toast.error(`${data?.message}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error arised");
    }
  };

  return (
    <DashboardLayout>
      <div className="w-[95%] mx-auto lg:w-full ">
        {/* page title */}
        <div className="mb-3">
          <h1 className="text-2xl border-b-4 border-t-4 px-2 py-1 border-slate-900 ">
            Add New Blog
          </h1>
        </div>

        {/* blog main body---> what's on your mind */}
        <div className="px-3 py-3 rounded-md bg-gray-300 ">
          {/* blog content */}
          <form onSubmit={handlePost}>
            <div
              onClick={() => {
                setFocusDiv("");
                console.log("from parent");
              }}
              className="mt-10 flex flex-col gap-y-8"
            >
              {/* blog title start */}
              <div className="flex flex-col gap-3 relative">
                <label
                  htmlFor="title"
                  className="absolute -top-3 left-3 px-2 overflow-hidden bg-gray-300  text-base md:text-lg lg:text-xl font-semibold"
                >
                  Tilte
                </label>
                <div className="w-full ">
                  <input
                    ref={titleRef}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    placeholder="Write Blog Title"
                    type="text"
                    className="w-[100%] md:w-[60%] outline-none bg-gray-300 border-2 border-gray-500  focus:border-green-600 rounded-lg px-5 py-5"
                  />
                </div>
              </div>
              {/* blog title end */}

              {/* blog thumbnail start*/}
              <div className="flex flex-col gap-3 relative">
                <label
                  htmlFor="thumbnail"
                  className="absolute -top-3 left-3 px-2 overflow-hidden bg-gray-300 text-base md:text-lg lg:text-xl font-semibold"
                >
                  Add Thumbnail
                </label>
                <div className="w-full l">
                  <input
                    type="file"
                    name="images"
                    className="w-[100%] md:w-[60%] outline-none border-2 border-gray-500 focus:border-green-600 rounded-lg px-5 py-5"
                  />
                </div>
              </div>
              {/* blog thumbnail end*/}

              {/* blog summery start */}
              {/* <div className="flex flex-col gap-3 relative">
              <label
                htmlFor="summery"
                className="absolute -top-3 left-3 px-2 overflow-hidden bg-gray-300 text-base md:text-lg lg:text-xl font-semibold"
              >
                Blog Overview
              </label>
              <div className="w-full h-[200px] ">
                <textarea
                  onChange={(e) => setBlogSummery(e.target.value)}
                  placeholder="Write Blog summery"
                  type="text"
                  className="w-[100%] md:w-[60%] h-full outline-none bg-gray-300 border-2 border-gray-500 focus:border-green-600  rounded-lg px-5 py-5 resize-none"
                />
              </div>
            </div> */}
              {/* blog summery end */}

              {/* blog details start */}
              <div
                className={`${
                  focusDiv == "editor" ? "border-green-600" : "border-gray-500"
                } border-2  rounded-lg p-3 relative flex flex-col`}
              >
                <label
                  htmlFor="title"
                  className="absolute -top-3 left-3 px-2  overflow-hidden bg-gray-300 text-base md:text-lg lg:text-xl font-semibold"
                >
                  Blog Details
                </label>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setFocusDiv("editor");
                    console.log("from editor");
                  }}
                  className="mt-3"
                >
                  <JoditEditor
                    ref={editor}
                    config={{
                      askBeforePasteHTML: false,
                      defaultActionOnPaste: "insert_only_text",
                      style: {
                        background: "#E3E3E3",
                      },
                      placeholder: "Start writing",
                      height: "450px",
                    }}
                    value={content}
                    onBlur={(newContent) => {
                      setContent(newContent);
                    }} // preferred to use only this option to update the content for performance reasons
                    // onChange={newContent => {}}
                  />
                </div>
              </div>
              {/* blog details end */}

              {/* categories start */}
              <div className="border border-gray-500 focus:border-green-600 rounded-lg relative p-3 flex flex-col gap-2">
                {/* view selected category start */}
                <div className="my-b">
                  <span className="absolute -top-3 left-3 px-2  overflow-hidden bg-gray-300 text-base md:text-lg lg:text-xl font-semibold">
                    Selected Category
                  </span>

                  <div className="flex gap-2 items-center mt-3">
                    {!selectedCategories && <span>No available category</span>}

                    {selectedCategories && (
                      <div className="border border-orange-700  px-4 py-1 flex gap-2 items-center">
                        <span>
                          {selectedCategories == 1
                            ? "Movie"
                            : selectedCategories == 2
                            ? "Tv Shows"
                            : selectedCategories == 3
                            ? "Web Series"
                            : ""}
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
              <div className="border border-gray-500 rounded-lg relative p-3 flex flex-col gap-2">
                {/*genres show start*/}
                <div className="my-b">
                  <span className="absolute -top-3 left-3 px-2  overflow-hidden bg-gray-300 mb-1 text-base md:text-lg lg:text-xl font-semibold">
                    Added Genre
                  </span>

                  <div className="flex gap-2 items-center my-2">
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
              <div className="border border-gray-500 rounded-lg relative p-3 flex flex-col gap-2">
                {/* show tags start*/}
                <div className="my-b">
                  <span className="absolute -top-3 left-3 px-2  overflow-hidden bg-gray-300 mb-1 text-base md:text-lg lg:text-xl font-semibold">
                    Added tags
                  </span>
                  <div className="flex gap-2 items-center my-2">
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
                      className="px-5 py-2 outline-none rounded border border-gray-700 focus:border-green-600 "
                    />
                    <span
                      ref={buttonRef}
                      onClick={() => {
                        // setTags((prev) => [tag, ...prev]);
                        setTag("");

                        fetch(`${base_url}/tags`, {
                          method: "GET",
                          headers: {
                            Accept: "application/json",
                          },
                        })
                          .then((res) => res.json())
                          .then((data) => {
                            if (data?.msg == "success") {
                              let tagExists;
                              data?.tags.find((t) => {
                                if (t?.name == tag) {
                                  tagExists = true;
                                  setTags((prev) => [
                                    {
                                      id: t?.id,
                                      name: t?.name,
                                    },
                                    ...prev,
                                  ]);
                                }
                              });
                              if (!tagExists) {
                                const data = {
                                  name: tag,
                                };
                                fetch(`${base_url}/tags/create`, {
                                  method: "POST",
                                  headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`,
                                  },
                                  body: JSON.stringify(data),
                                })
                                  .then((res) => res.json())
                                  .then((data) => {
                                    if (data?.msg == "success") {
                                      setTags((prev) => [
                                        {
                                          id: data?.tag?.id,
                                          name: data?.tag?.name,
                                        },
                                        ...prev,
                                      ]);
                                    }
                                  });
                              }
                            }
                          });
                      }}
                      className="bg-slate-800 hover:bg-slate-600  w-[50%] lg:w-[25%] text-center px-12 py-2 cursor-pointer text-white rounded-md"
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
                  <FaStar
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
                    }}
                    className="text-[#fcb51c] font-extrabold"
                  />
                  <span>Featured</span>
                </div>
                <div>
                  <input
                    checked={isChecked}
                    id="checkbox"
                    onChange={(e) => setIsChecked(e.target.checked)}
                    type="checkbox"
                    className="outline-none mb-0 pb-0 border-2 border-blue-700"
                  />
                </div>
              </div>

              {/* submit button */}
              <div>
                <button
                  type="Submit"
                  className="bg-slate-900 hover:bg-white hover:border-2 hover:border-slate-900 hover:text-slate-900 px-12 py-3 rounded shadow-md text-white font-bold"
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
