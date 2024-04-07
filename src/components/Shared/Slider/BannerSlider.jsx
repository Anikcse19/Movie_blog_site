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
        className="mySwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="flex flex-col md:flex-row items-center w-[100%] gap-5 ">

              {/* slider image */}
              <div onClick={()=>{
                  router(`/articles/article-details/${slide.id}`)
              }} className="w-[100%] md:w-[60%] h-[300px] self-baseline cursor-pointer  p-1">
                <img
                  className="w-[100%] h-full"
                  src={slide?.thumbnail}
                  alt=""
                />
              </div>

              {/* slider title and details */}
              <div className="flex flex-col  self-start w-[100%] md:w-[40%] ">

                {/* slider title */}
                <span className="pb-1">
                  <h1 className="text-black font-bold text-[28px]">
                    {slide?.title}
                  </h1>
                </span>

                {/* slider details */}
                <span className="text-gray-700 text-[14px] p-1">
                  {slide?.summery ? `${slide?.summery.slice(0,300)}...` : slide?.tags}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
