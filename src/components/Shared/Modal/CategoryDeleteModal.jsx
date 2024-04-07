
import { useContext } from "react";
import toast from "react-hot-toast";
import { BlogContext } from "../../../ContextApi/BlogContext";
import base_url from "../../../Utils/Url";


const token = localStorage?.getItem("token");


const CategoryDeleteModal = () => {

    const {isDeleteModalOpenForCategory,setIsDeleteModalOpenForCategory}=useContext(BlogContext)

   const handleCategoryDelete=async()=>{

        const res=await fetch(`${base_url}/articles?category_id=${isDeleteModalOpenForCategory.value}`,{
          method:'GET',
          headers:{
            'Accept':'application/json',
            'content-type':'application/json'
          }
        })

        const data=await res.json()

        if(data?.articles?.length>0){
          toast.error('That category is in action. You can not delete this',{
            position:'top-right'
          })
          setIsDeleteModalOpenForCategory({value:null,status:false})
        }else{
           fetch(`${base_url}/categories/destroy/${isDeleteModalOpenForCategory.value}`,{
          method:"POST",
          headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
          }
        }).then(res=>res.json()).then(data=>{
          if(data.msg==='success'){
            setIsDeleteModalOpenForCategory({value:null,status:false})
          }
        })
        }

       
      }
  return (
    <div
    style={{
        boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
    }}
    className=" flex flex-col items-center px-10 py-5 lg:px-24 lg:py-10 bg-teal-900 shadow-2xl rounded-md border border-white">
      <div className="mb-10">
            <span className="text-white font-bold">Are You Sure to delete?</span>
      </div>
      <div className="flex items-center justify-around gap-5">
        <span onClick={()=>{
            handleCategoryDelete()
        }} className="bg-red-500 px-5 py-1 text-white font-bold cursor-pointer ">Yes</span>
        
        <span 
            onClick={()=>setIsDeleteModalOpenForCategory({
            value:null,status:false
        })} 
        className="bg-green-500 px-5 py-1 text-white font-bold cursor-pointer">Cancel</span>

      </div>
    </div>
  )
}

export default CategoryDeleteModal
