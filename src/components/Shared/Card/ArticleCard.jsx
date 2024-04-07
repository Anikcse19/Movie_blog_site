import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ArticleCard = ({ article }) => {
  const [isHover, setIshover] = useState({
    value: null,
    state: false,
  });
  const router = useNavigate();

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
    <div
      key={article.id}
      style={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
      className="flex flex-col justify-between gap-2   py-3 px-3 cursor-pointer rounded-md border-4 border-white"
    >
      {/* image */}
      <div
        onMouseEnter={() => setIshover({ value: article.id, state: true })}
        onMouseLeave={() => setIshover({ value: null, state: false })}
        onClick={() => {
          router(`/articles/article-details/${article.id}`);
        }}
        className="w-[100%] h-[125px] md:h-[250px] flex items-center justify-center"
      >
        <img className="w-[100%] h-full" src={article?.thumbnail} alt="" />
      </div>

      {/* title */}
      <span
        className={`px-1 ${
          isHover.value === article.id && "text-red-600"
        } font-semiboldbold text-[12px] md:text-[18px]`}
      >{`${article?.title.slice(0, 28)}....`}</span>

      {/* date and genre */}
      <div className="flex flex-col md:flex-row md:items-center gap-y-2 justify-between ">
        <span className="px-1 pb-1 text-[12px] text-gray-600">
          {manageDateFormate(article?.created_at)}
        </span>
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-1 pb-1">
          {article?.genres?.map((genre) => (
            <span
              onClick={() => {
                router(`/articles/genres/${genre?.id}`);
              }}
              className="text-[8px] md:text-[12px] border border-orange-900 bg-orange-600 p-1 rounded-md text-white hover:bg-orange-900 animate-bounce"
              key={genre?.id}
            >
              {genre?.title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
