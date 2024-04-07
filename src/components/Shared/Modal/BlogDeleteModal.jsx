
import { useContext } from "react";
import { BlogContext } from "../../../ContextApi/BlogContext";
import base_url from "../../../Utils/Url";

const token=localStorage.getItem('token')

const BlogDeleteModal = ({ article }) => {
  const {
    setIsDeleteModalOpen,
    allBlogDelete,
    setAllBlogDelete,
  } = useContext(BlogContext);



  const handleArticleDelete = () => {

    if (allBlogDelete) {
      fetch(`${base_url}/articles/destroy/all`, {
        method: "POST",
        headers: {
          Accept: "appication/json",
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.msg == "success") {
            setAllBlogDelete(false)
          }
        });
    }

    fetch(`${base_url}/articles/destroy/${article.id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg === "success") {
          setIsDeleteModalOpen({ value: null, status: false, from: "" });
        }
      });
  };
  return (
    <div className="flex flex-col items-center px-12 py-5 md:px-24 lg:py-12 bg-teal-900 shadow-2xl rounded-md">
      <div className="mb-10">
        <span className="text-white font-bold">Are You Sure to delete?</span>
      </div>
      <div className="flex items-center justify-around gap-5">
        <span
          onClick={() => {
            handleArticleDelete();
          }}
          className="bg-red-500 px-5 py-1 text-white font-bold cursor-pointer "
        >
          Yes
        </span>

        <span
          onClick={() =>
           { setIsDeleteModalOpen({
              value: null,
              status: false,
            })
            setAllBlogDelete(false)}
          }
          className="bg-green-500 px-5 py-1 text-white font-bold cursor-pointer"
        >
          Cancel
        </span>
      </div>
    </div>
  );
};

export default BlogDeleteModal;
