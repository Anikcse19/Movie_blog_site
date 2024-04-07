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
      
        <div className="my-2 px-3 md:p-0">
          <img src="/image/homePageAds.png" alt="" />
        </div>
     
      <MoviesSubNav />
      <MoviesIntroSection />

      {/* advertise */}
      
      <div className="my-2 px-3 md:p-0">
          <img src="/image/homePageAds.png" alt="" />
        </div>
      
      <WebSeriesSubNav />
      <WebSeriesIntroSection />

     {/* advertise */}
      
     <div className="my-2 px-3 md:p-0">
          <img src="/image/homePageAds.png" alt="" />
        </div>
     
      <Upcoming />

      {/* advertise */}
     
        <div className="my-2 px-3 md:p-0">
          <img src="/image/homePageAds.png" alt="" />
        </div>
     
      <Articles/>
       {/* advertise */}
      
        <div className="my-2 px-3 md:p-0">
          <img src="/image/homePageAds.png" alt="" />
        </div>
      
     </Layout>
    </>
  );
}
