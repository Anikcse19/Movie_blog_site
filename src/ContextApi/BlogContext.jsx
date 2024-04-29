import { createContext, useState } from "react";

export const BlogContext = createContext({});

export function BlogContextProvider({children}){

    const [isMobileNavOpen,setIsMobileNavOpen]=useState(false)
    const [genres,setGenres]=useState([])
    const [tags,setTags]=useState([])
    const [categories, setCategories]=useState([])
    const [selectedGenreForMovie,setSelectedGenreForMovie]=useState({
     value:21,status:true
    })
    const [selectedGenreForWebSeries,setSelectedGenreForWebSeries]=useState({
     value:21,status:true
    })
    const [isDeleteModalOpen,setIsDeleteModalOpen]=useState({
     value:null,status:false,from:""
    })
    const [isDeleteModalOpenForCategory,setIsDeleteModalOpenForCategory]=useState({
     value:null,status:false
    })
    const [isDeleteModalOpenForGenre,setIsDeleteModalOpenForGenre]=useState({
     value:null,status:false
    })
    const [isDeleteModalOpenForTags,setIsDeleteModalOpenForTag]=useState({
        value:null,status:false
       })
    const [allBlogDelete,setAllBlogDelete]=useState(false)
    const [updateCategory,setUpdateCategory]=useState({
     value:null,status:false
    })
    const [token,setToken]=useState("")

    return (
        <BlogContext.Provider value={{isMobileNavOpen,setIsMobileNavOpen,genres,setGenres,tags,setTags,categories, setCategories,selectedGenreForMovie,setSelectedGenreForMovie,selectedGenreForWebSeries,setSelectedGenreForWebSeries,isDeleteModalOpen,setIsDeleteModalOpen,token,setToken,isDeleteModalOpenForCategory,setIsDeleteModalOpenForCategory,isDeleteModalOpenForGenre,setIsDeleteModalOpenForGenre,updateCategory,setUpdateCategory,allBlogDelete,setAllBlogDelete,isDeleteModalOpenForTags,setIsDeleteModalOpenForTag}}>
            {children}
        </BlogContext.Provider>
    )

}