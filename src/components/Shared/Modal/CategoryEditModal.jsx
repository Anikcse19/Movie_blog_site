import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { BlogContext } from "../../../ContextApi/BlogContext";
import base_url from "../../../Utils/Url";

const token = localStorage?.getItem("token");

const CategoryEditModal = () => {
  const { updateCategory, setUpdateCategory } = useContext(BlogContext);
  const [category, setCategory] = useState("");

  const handleCategoryUpdate = () => {
    axios
      .post(
        `${base_url}/categories/update/${updateCategory.value}`,
        { title: category },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res?.data?.msg == "success") {
          setUpdateCategory({ value: null, status: false });
          toast.success("Succesfully updated category", {
            position: "top-right",
          });
        }
      });
  };

  return (
    <div
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
      }}
      className=" flex flex-col items-center px-5 py-2 bg-teal-900  text-white rounded-md"
    >
      <h1 className="font-bold text-lg">Edit category title</h1>
      <div className="my-5 flex flex-col md:flex-row gap-3 md:items-center text-center">
        <input
          className="rounded text-black px-4 py-2"
          placeholder="type update category title"
          type="text"
          id="category"
          onChange={(e) => setCategory(e.target.value)}
        />
        <span
          onClick={handleCategoryUpdate}
          className="bg-green-600 rounded cursor-pointer px-5 py-2 font-bold hover:bg-green-500"
        >
          Update
        </span>
      </div>
      <div>
        <span
          onClick={() => setUpdateCategory({ value: null, status: false })}
          className="bg-red-600 rounded cursor-pointer px-5 py-2 font-bold hover:bg-red-500"
        >
          Cancel
        </span>
      </div>
    </div>
  );
};

export default CategoryEditModal;
