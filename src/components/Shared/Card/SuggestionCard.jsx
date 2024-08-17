import { useState } from "react";

const SuggestionCard = ({ suggestContent }) => {
  const [isHover, setIshover] = useState({
    value: null,
    state: false,
  });

  return (
    <div
      onMouseEnter={() => setIshover({ value: suggestContent.id, state: true })}
      onMouseLeave={() => setIshover({ value: null, state: false })}
      style={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
      className="h-[110px] w-full flex items-center gap-1 rounded-md cursor-pointer"
    >
      <div className="h-full w-[150px]">
        <img
          className="h-full w-full object-cover"
          src={suggestContent.img}
          alt=""
        />
      </div>
      <div className="px-2">
        <span
          className={`text-[14px] font-[700] ${
            isHover.value === suggestContent.id && "text-red-600"
          }`}
        >
          {suggestContent.title}
        </span>
      </div>
    </div>
  );
};

export default SuggestionCard;
