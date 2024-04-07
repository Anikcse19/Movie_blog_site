
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
        className="mySwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="flex flex-col py-10 md:p-0 items-center w-[100%] gap-2  ">
              {/* image */}
              <div onClick={()=>{
                router(`/articles/article-details/${slide.id}`)
              }} className="w-[100%] h-[200px] md:h-[450px] self-baseline cursor-pointer">
                <img className="w-[100%] h-full object-cover " src={slide?.thumbnail} alt="" />
              </div>

              {/* title and summery */}
              <div className="flex flex-col self-start w-[100%]">
                <span className="p-1">
                  <h1 className="text-black font-bold text-base md:text-[28px]">
                    {slide?.title}
                  </h1>
                </span>
                <span className="text-black text-[16px] p-1">
                  {slide?.summery ? `${slide?.summery.slice(0,100)}...`: slide?.tags}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
