/* eslint-disable react-hooks/rules-of-hooks */

import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoTrashBin } from "react-icons/io5";
import { BlogContext } from "../../ContextApi/BlogContext";
import base_url from "../../Utils/Url";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import GenreDeleteModal from "../../components/Shared/Modal/GenreDeleteModal";


const token = localStorage?.getItem("token");

const GenresPage = () => {
  const [title, setTitle] = useState("");

  const {
    genres,
    setGenres,
    isDeleteModalOpenForGenre,
    setIsDeleteModalOpenForGenre,
  } = useContext(BlogContext);

  const buttonRef=useRef()

  const fetchGenres = () => {
    axios
      .get(`${base_url}/genres`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setGenres(res.data.genres));
  };
  useEffect(() => {
    fetchGenres();
  }, [isDeleteModalOpenForGenre.value]);

  const handleGenreCreate = () => {
    const data = { title: title };
    fetch(`${base_url}/genres/create`, {
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
        if (data) {
          
          fetchGenres();
          setTitle("");
        }
      });
  };

  return (
    <DashboardLayout>
    <div className="w-[95%] mx-auto lg:w-full">
  {/* page title */}
  <div className="mb-6">
        <h1 className="text-2xl border-4 px-2 py-1 border-orange-700 ">
          Genres
        </h1>
        <div onClick={()=>{
          fetch(`${base_url}/genres/destroy/all`,{
            method:'POST',
            headers:{
              'Accept':'application/json',
              'Content-type':'application/json',
              Authorization:`Bearer ${token}`
            }
          }).then(res=>res.json()).then(data=>{
            if(data.msg=='success'){
              toast.success('Cleared All Genre')
            }
          })
        }} className="inline-block bg-red-600 text-white cursor-pointer px-5 py-2 rounded-md shadow-lg mt-5">
          <div className="flex items-center gap-2 ">
          <IoTrashBin/>
        <span>Clear All</span>
          </div>
        </div>
      </div>
      {/* search category start */}
      <div className="flex flex-col md:flex-row md:items-center text-center gap-2 mb-10 md:mb-3">
        <input
          placeholder="search"
          className="outline-none border border-orange-700  px-4 py-1"
          type="text"
        />
        <span className="px-5 py-1 bg-blue-600 border border-white text-white font-bold cursor-pointer">
          Search Genre
        </span>
      </div>
      {/* search category end */}

      <div className="grid grid-cols-1 md:grid-cols-4  gap-3">
        <div className="md:col-span-2 ">
          <div className="border border-orange-600 ">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-500">
                  <th className="px-3 py-2 border-r border-black">Name</th>
                  <th className="px-3 py-2 border-r border-black">Slug</th>
                  <th className="px-3 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {genres.map((genre) => (
                  <tr
                    key={genre.id}
                    className="bg-blue-300 border-b border-black"
                  >
                    <td className="px-3 py-2 text-center border-r border-black">
                      {genre.title}
                    </td>
                    <td className="px-3 py-2 text-center border-r border-black">
                      {genre.slug}
                    </td>
                    <td className="px-3 py-2 text-center border-r border-black">
                      <span
                        onClick={() =>
                          setIsDeleteModalOpenForGenre({
                            value: genre.id,
                            status: true,
                          })
                        }
                        className="bg-red-500 px-2 py-1 text-white font-bold rounded shadow-md cursor-pointer"
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="md:col-span-2 self-start flex items-center gap-3">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1 ">
              <label className="font-bold" htmlFor="">
                Name
              </label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key == "Enter") {
                    e.preventDefault();
                    buttonRef.current.click();
                  }
                }}
                value={title}
                className="px-5 py-2 outline-none"
                placeholder="type genre title"
                type="text"
                name="genre_title"
                id=""
              />
            </div>
            <span
              ref={buttonRef}
              onClick={handleGenreCreate}
              className="px-5 py-2 text-center rounded shadow-lg border border-white bg-blue-500 text-white font-bold cursor-pointer"
            >
              Create Genre
            </span>
          </div>
        </div>

        {isDeleteModalOpenForGenre.status && (
          <div
            className="fixed top-[250px] 
  right-[250px]"
          >
            <GenreDeleteModal />
          </div>
        )}
      </div>
    </div>
    </DashboardLayout>
  );
};

export default GenresPage;
