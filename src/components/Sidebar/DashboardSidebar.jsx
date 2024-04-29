import { useLocation, useNavigate } from "react-router-dom"

const DashboardSidebar = () => {

    const navigate=useNavigate()
    const router=useLocation()

  return (
    <div className="bg-slate-900 w-[20%]  py-6 min-h-screen px-6 hidden  lg:flex flex-col gap-10 ">
         {/* right nav start */}
         <div className="text-white font-bold flex flex-col items-center gap-3">
          <div onClick={() => navigate("/")} className="border border-green-500 px-2 py-2 cursor-pointer" >
            <span className="tracking-widest text-xl font-bold text-yellow-300">IMDB</span><span className="tracking-widest text-xl font-bold text-red-600"> MOVIES</span>
            {/* <h1>IMBD MOVIES</h1> */}
          </div>
          
        </div>
        {/* left nav start*/}
        <div className="flex flex-col justify-between gap-4 text-white font-semibold">
        
          <div onClick={()=>navigate('/dashboard/all-blogs')} className={
            `${router.pathname.includes("/all-blogs") && "text-green-300 bg-stone-500 border-l-8 border-green-500 rounded"}  cursor-pointer px-6 py-1`
          }>
            <span>All Blogs</span>
          </div>
          <div onClick={()=>navigate('/dashboard/add-new-blog')}  className={
            `${router.pathname.includes("/add-new-blog") && "text-green-300 bg-stone-500 border-l-8 border-green-500  rounded"}  cursor-pointer px-6 py-1`
          }>
            <span>Add New Blog</span>
          </div>
          <div onClick={()=>navigate('/dashboard/genres')}   className={
            `${router.pathname.includes("/genres") && "text-green-300 bg-stone-500 border-l-8 border-green-500  rounded"}  cursor-pointer px-6 py-1`
          }>
            <span>Genres</span>
          </div>
          <div onClick={()=>navigate('/dashboard/categories')}   className={
            `${router.pathname.includes("/categories") && "text-green-300 bg-stone-500 border-l-8 border-green-500  rounded"}  cursor-pointer px-6 py-1`
          }>
            <span>Categories</span>
          </div>
          <div onClick={()=>navigate('/dashboard/tags')}   className={
            `${router.pathname.includes("/tags") && "text-green-300 bg-stone-500 border-l-8 border-green-500  rounded"}  cursor-pointer px-6 py-1`
          }>
            <span>Tags</span>
          </div>
        </div>
        {/* left nav end */}

       
        {/* right nav end */}
      </div>
  )
}

export default DashboardSidebar
