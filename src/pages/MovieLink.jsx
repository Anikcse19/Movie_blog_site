
import { FaTelegram } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const MovieLinks = () => {

  const download = [
    {
      id: 1,
      size: "339.31 MB 480P:",
    },
    {
      id: 2,
      size: "700.5 MB 720P HEVC:",
    },
    {
      id: 3,
      size: "1.10 GB 720P:",
    },
    {
      id: 4,
      size: "1.5 GB 1080P HEVC:",
    },
    {
      id: 5,
      size: "2.5 GB 1080P:",
    },
  ];
  
  return (
    <Layout>
      {/* advertise */}
      <div className="my-2 mx-3 md:mx-0">
        <img src="/image/homePageAds.png" alt="" />
      </div>

      <div>

        {/* telegram logo and join us telegram----> start*/}
        <div className=" w-[60%] mx-auto flex flex-col justify-center items-center px-24 py-12">
          <div>
            <div className="relative border-2 border-blue-900 rounded-2xl px-16 py-3">
              <span className="text-blue-600 font-bold">
                Join us on <br />{" "}
                <span className="text-blue-900 font-extrabold text-lg">
                  Telegram
                </span>
              </span>
              <div className="text-blue-700 text-[90px] absolute -top-2 -left-8">
                <FaTelegram />
              </div>
            </div>
          </div>
          {/* download link */}
          <div className="px-14 text-center">
            <span>
              🔴খুব সহজে যেকোনো মুভি ও সিরিজের লিংক পেতে আমাদের টেলিগ্রাম গ্রুপে
              জয়েন করুন।🔴
            </span>
            <br />
            <Link to="" className="text-red-600 font-bold">
              Click me to join telegram
            </Link>
          </div>
        </div>
        {/* telegram logo and join us telegram----> end*/}



        {/* NB ----> start*/}
        <div className="bg-white shadow-xl px-24 py-2">
          <div className="flex flex-col gap-1">
            <span className="text-lg lg:text-[22px] font-semibold flex gap-2">
              <p className="text-red-600 inline">বিঃদ্রঃ</p>{" "}
              <p>
                আপনার পছন্দ মত যে কোন পিক্সেলে ক্লিক করলে ডাউনলোড পেজে চলে
                যাবেন।
              </p>{" "}
            </span>
            <span className="text-lg lg:text-[22px] font-semibold flex gap-2">
              <p className="text-red-600">Note:</p>{" "}
              <p>
                Select your desiger pixel and click it, the page will redirect
                to download page
              </p>
            </span>
          </div>
        </div>
        {/* NB ----> end*/}



        {/* advertisemnt */}
        <div className="my-2 mx-3 md:mx-0">
          <img src="/image/homePageAds.png" alt="" />
        </div>



        {/* all download  links---> start */}
        <div className="flex flex-col justify-center items-center gap-5 w-[70%] mx-auto">
          <h1
            style={{
              fontFamily: "Aclonica",
              fontWeight: "400",
              fontStyle: "normal",
            }}
            className="text-[30px] font-semibold text-center"
          >
            Select Pixel || From the Ashes (2024) Dual Audio [ Hindi-English ]
            WEB-DL
          </h1>

          <div className="border-2 border-yellow-500 w-[70%] mx-auto flex flex-col justify-center gap-5 px-20 py-12">
            {download.map((d) => (
              <div
                className="flex flex-col items-center justify-center"
                key={d.id}
              >
                <span className="text-lg font-bold">{d.size}</span>
                <div className="flex items-center justify-between gap-3 text-red-600 font-bold">
                  <span>OneDrive1 |</span>
                  <span>OneDrive2 |</span>
                  <span>GDrive1 |</span>
                  <span>GDrive2</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* all download  links---> end */}



        {/* advertisemnt */}
        <div className="my-2 mx-3 md:mx-0">
          <img src="/image/homePageAds.png" alt="" />
        </div>



        {/* telegram logo with join telegram start*/}
        <div className=" w-[60%] mx-auto flex flex-col justify-center items-center px-24 py-12">
          <div>
            <div className="relative border-2 border-blue-900 rounded-2xl px-16 py-3">
              <span className="text-blue-600 font-bold">
                Join us on <br />{" "}
                <span className="text-blue-900 font-extrabold text-lg">
                  Telegram
                </span>
              </span>
              <div className="text-blue-700 text-[90px] absolute -top-2 -left-8">
                <FaTelegram />
              </div>
            </div>
          </div>
          {/* download link */}
          <div className="px-14 text-center">
            <span>
              🔴খুব সহজে যেকোনো মুভি ও সিরিজের লিংক পেতে আমাদের টেলিগ্রাম গ্রুপে
              জয়েন করুন।🔴
            </span>
            <br />
            <Link to="" className="text-red-600 font-bold">
              Click me to join telegram
            </Link>
          </div>
        </div>
        {/* telegram logo with join telegram end*/}
        

        {/* advertisemnt */}
        <div className="my-2 mx-3 md:mx-0">
          <img src="/image/homePageAds.png" alt="" />
        </div>
      </div>
    </Layout>
  );
};

export default MovieLinks;
