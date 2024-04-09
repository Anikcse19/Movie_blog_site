
import { useNavigate } from "react-router-dom";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function SectionSlider({ slides }) {
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
          <SwiperSlide key={slide.id}>
            <div className="h-full flex flex-col items-center w-full gap-2  ">


              {/* image */}
              <div onClick={()=>{
                router(`/articles/article-details/${slide.id}`)
              }} className="w-[100%] h-[70%] xl:h-full self-baseline cursor-pointer">
                <img className="w-[100%] h-full object-cover " src={slide?.thumbnail} alt="" />
              </div>

              {/* title and summery */}
              <div className="flex flex-col self-start w-[100%] mb-2">
                <span className="p-2">
                  <h1 className="text-black font-bold text-base xl:text-[20px]">
                    {slide?.title}
                  </h1>
                </span>
                <span className="text-gray-800 text-[12px] p-2">
                  {slide?.summery ? `${slide?.summery.slice(0,200)}...`: slide?.tags}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
