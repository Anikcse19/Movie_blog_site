import images from "../../config";
import Layout from "../components/Layout/Layout";
import Articles from "../components/UI/Articles/Articles";
import HomeBanner from "../components/UI/Home/HomeBanner";
import MoviesIntroSection from "../components/UI/Movies/MoviesIntroSection";
import MoviesSubNav from "../components/UI/Movies/MoviesSubNav";
import Upcoming from "../components/UI/Upcomming/Upcomming";
import WebSeriesIntroSection from "../components/UI/WebSeries/WebSeriesIntroSection";
import WebSeriesSubNav from "../components/UI/WebSeries/WebSeriesSubNav";


export default function Home() {

  
  return (
    <>
     <Layout>
      <HomeBanner />

      {/* advertise */}
      
        <div className="w-[90%] lg:w-full mx-auto my-5  md:p-0">
          <img className="w-full" src={images.addImage} alt="" />
        </div>
     
      <MoviesSubNav />
      <MoviesIntroSection />

     {/* advertise */}
      
     <div className="w-[90%] lg:w-full mx-auto my-5  md:p-0">
          <img className="w-full" src={images.addImage} alt="" />
        </div>
      
      <WebSeriesSubNav />
      <WebSeriesIntroSection />

      {/* advertise */}
      
      <div className="w-[90%] lg:w-full mx-auto my-5  md:p-0">
          <img className="w-full" src={images.addImage} alt="" />
        </div>
     
      <Upcoming /> 

        {/* advertise */}
      
        <div className="w-[90%] lg:w-full mx-auto my-5  md:p-0">
          <img className="w-full" src={images.addImage} alt="" />
        </div>
     
      <Articles/> 
        {/* advertise */}
      
        <div className="w-[90%] lg:w-full mx-auto my-5  md:p-0">
          <img className="w-full" src={images.addImage} alt="" />
        </div>
      
     </Layout>
    </>
  );
}
