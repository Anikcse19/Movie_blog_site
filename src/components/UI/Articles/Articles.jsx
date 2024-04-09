import axios from "axios";

import { useEffect, useState } from "react";
import base_url from "../../../Utils/Url";
import ArticleCard from "../../Shared/Card/ArticleCard";

const Articles = () => {
  const [latestArticles, setLatestArticles] = useState([]);

  useEffect(() => {
    axios
      .get(`${base_url}/articles`)
      .then((res) => setLatestArticles(res.data.articles));
  }, []);

  return (
    // <Center>

    <>
      <div className="w-[90%] xl:w-full mx-auto flex my-2 border-b-2 border-gray-500 ">
        <div className="bg-gray-500 px-3 py-2 text-white font-bold">
          Latest Articles
        </div>
      </div>
      {/* content */}
      <div className="w-[90%] xl:w-full mx-auto my-2 grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 items-center justify-between gap-3 gap-y-7">
        {!latestArticles.length > 0 && (
          <div className="animate-pulse h-[1000px] w-[1080px] bg-gray-300" />
        )}

        {latestArticles.map((article) => (
          <ArticleCard key={article?.id} article={article} />
        ))}
      </div>
    </>

    // </Center>
  );
};

export default Articles;
