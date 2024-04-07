import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import './styles.css';

// import required modules
import axios from "axios";
import { FreeMode, Pagination } from "swiper/modules";

const Upcoming = () => {
  const [isHover, setIshover] = useState({
    value: null,
    state: false,
  });
  const [upcomingContents,setUpcommingContents]=useState([])
  const [firstSlide, setFirstSlide] = useState(0);
  const [secondSlide, setSecondSlide] = useState(1);
  const [thirdSlide, setThirdSlide] = useState(2);

  useEffect(()=>{
    axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=f398789190003083c23f81d2a33cc72c').then(res=>{
      setUpcommingContents(res.data.results)
    })
  },[])

  


  const manageDateFormate = (date) => {
    const newDate = new Date(date);
    const dateString = newDate.toDateString();
    const dateArray = dateString.split(" ");
    const day = dateArray[0];
    const currentDate = dateArray[2];
    const month = dateArray[1];
    const year = dateArray[3];

    return `${day},${currentDate}th ${month},${year}`;
  };
  return (
    // <Center>
    <>
      <div className="flex my-10 border-b-2 border-[#F19100] mx-3 md:mx-0 ">
        <div className="bg-[#F19100] px-3 py-2 text-white font-bold">
          Upcoming
        </div>
      </div>
      {/* content */}
      <Swiper
        slidesPerView={3}
        spaceBetween={0}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper mx-3"
      >
        {upcomingContents.map((content) => (
          <SwiperSlide key={content.id}>
            <div            
            className="ml-5 flex flex-col justify-center gap-2 w-[90%] cursor-pointer rounded-md mb-10 p-1 bg-white "
          >
            <div className="w-[100%] mx-auto ">
              <img 
                className="w-[100%] h-[200px]"
                src={`https://image.tmdb.org/t/p/w500${content.poster_path}`}
                alt=""
              />
            </div>

            <span
              className={`px-1 ${
                isHover.value === content.id &&
                "text-red-600"
              }`}
            >
              {`${content.title.slice(0,20)}...`}
            </span>
            <span className="px-1 pb-1">
              {manageDateFormate(content.release_date)}
            </span>
          </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>

    // </Center>
  );
};

export default Upcoming;

{
  /* <div className="my-2 grid grid-cols-3 items-center justify-between gap-3"> */
}
{
  /* first slide */
}
{
  /* <div
      onMouseEnter={() =>
        setIshover({ value: upcomingContents[firstSlide].id, state: true })
      }
      onMouseLeave={() => setIshover({ value: null, state: false })}
      style={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
      
      className="flex flex-col justify-between gap-2 w-[100%] h-[300px] cursor-pointer rounded-md">
      <div className=" w-[100%] ">
        <img className="w-[100%]" src={upcomingContents[firstSlide].img} alt="" />
      </div>

      <span
        className={`w-[300px] px-1 ${
          isHover.value === upcomingContents[firstSlide].id && "text-red-600"
        }`}>
        {upcomingContents[firstSlide].title}
      </span>
      <span className="w-[300px] px-1 pb-1">
        {upcomingContents[firstSlide].schedule}
      </span>
    </div> */
}

{
  /* second slide */
}
{
  /* <div
      onMouseEnter={() =>
        setIshover({ value: upcomingContents[secondSlide].id, state: true })
      }
      onMouseLeave={() => setIshover({ value: null, state: false })}
      style={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
      
      className="flex flex-col justify-between gap-2 w-[100%] h-[300px] cursor-pointer rounded-md">
      <div className=" w-[100%] ">
        <img className="w-[100%]" src={upcomingContents[secondSlide].img} alt="" />
      </div>

      <span
        className={`w-[300px] px-1 ${
          isHover.value === upcomingContents[secondSlide].id && "text-red-600"
        }`}>
        {upcomingContents[secondSlide].title}
      </span>
      <span className="w-[300px] px-1 pb-1">
        {upcomingContents[secondSlide].schedule}
      </span>
    </div> */
}

{
  /* third slide */
}
{
  /* <div
      onMouseEnter={() =>
        setIshover({ value: upcomingContents[thirdSlide].id, state: true })
      }
      onMouseLeave={() => setIshover({ value: null, state: false })}
      style={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
      
      className="flex flex-col justify-between gap-2 w-[100%] h-[300px] cursor-pointer rounded-md">
      <div className=" w-[100%] ">
        <img className="w-[100%]" src={upcomingContents[thirdSlide].img} alt="" />
      </div>

      <span
        className={`w-[300px] px-1 ${
          isHover.value === upcomingContents[thirdSlide].id && "text-red-600"
        }`}>
        {upcomingContents[thirdSlide].title}
      </span>
      <span className="w-[300px] px-1 pb-1">
        {upcomingContents[thirdSlide].schedule}
      </span>
    </div>
  
</div> */
}
{
  /* <div className="my-2 flex items-center">
  <FaAngleLeft
    onClick={goToLeft}
    className="text-4xl font-bold text-red-600  cursor-pointer"
  />
  <FaAngleRight
    onClick={goToRight}
    className="text-4xl font-bold text-red-600 cursor-pointer"
  />
</div> */
}
