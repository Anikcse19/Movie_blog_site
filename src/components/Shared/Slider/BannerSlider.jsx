import { useNavigate } from "react-router-dom";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function BannerSlider({ slides }) {
  
  const router=useNavigate()
  return (
    <>
      <Swiper
        centeredSlides={true}
        autoplay={{
          delay: 2000,
        }}
        modules={[Autoplay]}
        className="mySwiper h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide className="h-full"  key={slide.id}>
            <div 
            className="flex flex-col lg:flex-row  w-[100%] h-full gap-2  rounded-sm overflow-hidden">

              {/* slider image */}
              <div onClick={()=>{
                  router(`/articles/article-details/${slide.id}`)
                  window.scrollTo(0,0)
              }} className="w-[100%] xl:w-[60%] h-full
               self-baseline cursor-pointer p-1">
                <img
                  className="w-[100%] h-[140px] md:h-[200px] lg:h-full object-fill sm:object-cover rounded-sm"
                  src={slide?.thumbnail}
                  alt=""
                />
              </div>

              {/* slider title and details */}
              <div className="flex flex-col  self-start w-[90%] mx-auto xl:w-[40%] mt-3">

                {/* slider title */}
                <span className="pb-1">
                  <h1 className="text-black font-semibold text-base xl:text-[22px]">
                    {slide?.title}
                  </h1>
                </span>

                {/* slider details */}
                <span className="text-gray-700 hidden lg:block text-[12px] py-6 pr-5">
                  {slide?.summery ? `${slide?.summery.slice(0,200)}...` : slide?.tags}
                </span>

                <span className="text-gray-700 block lg:hidden text-[12px] py-6 pr-1">
                  {slide?.summery ? `${slide?.summery.slice(0,100)}...` : slide?.tags}
                </span>

                <span onClick={()=>{
                  router(`/articles/article-details/${slide?.id}`)
                  window.scrollTo(0,0)
                }} className="px-1 pb-2 xl:pb-0 cursor-pointer text-gray-800 font-bold">{`Read More >>`}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
