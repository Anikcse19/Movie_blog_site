import { useState } from "react";

const SuggestionCard = ({suggestContent}) => {
    const [isHover, setIshover] = useState({
        value: null,
        state: false,
      });


  return (
    <div
    onMouseEnter={() =>
      setIshover({ value: suggestContent.id, state: true })
    }
    onMouseLeave={() => setIshover({ value: null, state: false })}
    style={{
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    }}
    className="h-[110px] flex items-center gap-2 rounded-md cursor-pointer">
    <div className="h-full w-[150px]">
      <img className="h-full w-full" src={suggestContent.img} alt="" />
    </div>
    <div className="px-2">
      <span
        className={`text-[18px] font-[500] ${
          isHover.value === suggestContent.id && "text-red-600"
        }`}>
        {suggestContent.title}
      </span>
    </div>
  </div>
  )
}

export default SuggestionCard
