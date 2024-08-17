/* eslint-disable react-hooks/rules-of-hooks */

import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { BlogContext } from "../../ContextApi/BlogContext";
import base_url from "../../Utils/Url";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import CategoryDeleteModal from "../../components/Shared/Modal/CategoryDeleteModal";
import CategoryEditModal from "../../components/Shared/Modal/CategoryEditModal";


const token = localStorage?.getItem("token");

const CategoriesPage = () => {
  const [title, setTitle] = useState("");
  const {
    categories,
    setCategories,
    setIsDeleteModalOpenForCategory,
    isDeleteModalOpenForCategory,
    updateCategory,setUpdateCategory
  } = useContext(BlogContext);
  const buttonRef = useRef();

  const fetchCategories = () => {
    axios
      .get(`${base_url}/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setCategories(res.data.categories));
  };
  useEffect(() => {
    fetchCategories();
  }, [isDeleteModalOpenForCategory.value,updateCategory.value]);

  const handleCategoryCreate = () => {
    const data = { title: title };
    fetch(`${base_url}/categories/create`, {
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
          fetchCategories();
          setTitle("");
        }
      });
  };

  return (
    <DashboardLayout>
      {/* page title */}
      <div className="mb-6 w-[90%] md:w-full mx-auto">
        <h1 className="text-2xl border-b-4 border-t-4 border-slate-900 px-2 py-1 ">
          Categories
        </h1>
      </div>
      {/* search category start */}
      {/* <div className="flex flex-col md:flex-row md:items-center text-center gap-2 mb-10 md:mb-3">
        <input
          placeholder="search"
          className="outline-none border border-orange-700  px-4 py-1"
          type="text"
        />
        <span className="px-5 py-1 bg-blue-600 border border-white text-white font-bold cursor-pointer">
          Search Category
        </span>
       
      </div> */}
      {/* search category end */}

      <div className="grid grid-cols-1 md:grid-cols-4 lg:mt-24 gap-3 relative w-[90%] md:w-full mx-auto">
        <div className="md:col-span-2 ">
          <div className=" border border-slate-900">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="px-3 py-2 border-r border-slate-700">Name</th>
                  <th className="px-3 py-2 border-r border-slate-700">Slug</th>
                  <th className="px-3 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories?.length > 0 &&
                  categories.map((category) => (
                    <tr
                      key={category.id}
                      className="bg-slate-300 border-b border-black"
                    >
                      <td className="px-3 py-2 text-center border-r border-black">
                        {category.title}
                      </td>
                      <td className="px-3 py-2 text-center border-r border-black">
                        {category.slug}
                      </td>
                      <td className="px-3 py-2 text-center border-r border-black flex items-center justify-center gap-2">
                        <span
                       
                          onClick={() =>
                            setIsDeleteModalOpenForCategory({
                              value: category.id,
                              status: true,
                            })
                          }
                          className="text-red-700 hover:text-red-500 px-2 py-1  font-bold rounded  cursor-pointer"
                        >
                          Delete
                        </span>
                        <span
                        
                          onClick={() =>
                            setUpdateCategory({
                              value: category.id,
                              status: true,
                            })
                          }
                          className="text-green-800 hover:text-green-500 px-2 py-1  font-bold rounded  cursor-pointer"
                        >
                          Edit
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-span-2 self-start flex items-center gap-3">
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
                className="px-5 py-2 outline-none bg-slate-300 border border-slate-900 focus:border-2 focus:border-green-700 rounded-md "
                placeholder="type category title"
                type="text"
                name="genre_title"
                id=""
              />
            </div>

            <span
              ref={buttonRef}
              onClick={handleCategoryCreate}
              className="px-5 py-2 text-center rounded shadow-lg   bg-slate-900 hover:border-2 hover:border-slate-100 text-white font-bold cursor-pointer"
            >
              Create Category
            </span>
          </div>
        </div>
        {isDeleteModalOpenForCategory.status && (
          <div
            className="absolute left-[10%] lg:left-[25%] top-3"
          >
            <CategoryDeleteModal />
          </div>
        )}
        {
          updateCategory.status && (
            <div className="absolute left-[10%] lg:left-[25%] top-3">
              <CategoryEditModal/>
            </div>
          )
        }
      </div>
    </DashboardLayout>
  );
};

export default CategoriesPage;
