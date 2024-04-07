
import { useContext } from "react";
import toast from "react-hot-toast";
import { BlogContext } from "../../../ContextApi/BlogContext";
import base_url from "../../../Utils/Url";

const token = localStorage?.getItem("token");


const GenreDeleteModal = () => {

    const {isDeleteModalOpenForGenre,setIsDeleteModalOpenForGenre}=useContext(BlogContext)

   const handelGenreDelete=async()=>{

    const res=await fetch(`${base_url}/articles?genre_id=${isDeleteModalOpenForGenre.value}`,{
      method:'GET',
      headers:{
        'Accept':'application/json',
        'content-type':'application/json'
      }
    })

    const data=await res.json()

    if(data?.articles?.length>0){
      toast.error('That genre is in action. You can not delete this',{
        position:'top-right'
      })
      setIsDeleteModalOpenForGenre({value:null,status:false})
    }else{
      fetch(`${base_url}/genres/destroy/${isDeleteModalOpenForGenre.value}`,{
        method:"POST",
        headers:{
          Accept:"application/json",
          Authorization:`Bearer ${token}`
        }
      }).then(res=>res.json()).then(data=>{
        if(data.msg==='success'){
          setIsDeleteModalOpenForGenre({value:null,status:false})
        }
      })
    }

        
      }
  return (
    <div
    style={{
        boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
    }}
    className=" w-[400px] flex flex-col items-center p-5 bg-teal-900 shadow-2xl rounded-md border border-white">
      <div className="mb-10">
            <span className="text-white font-bold">Are You Sure to delete?</span>
      </div>
      <div className="flex items-center justify-around gap-5">
        <span onClick={()=>{
            handelGenreDelete()
        }} className="bg-red-500 px-5 py-1 text-white font-bold cursor-pointer ">Yes</span>
        
        <span 
            onClick={()=>setIsDeleteModalOpenForGenre({
            value:null,status:false
        })} 
        className="bg-green-500 px-5 py-1 text-white font-bold cursor-pointer">Cancel</span>

      </div>
    </div>
  )
}

export default GenreDeleteModal
