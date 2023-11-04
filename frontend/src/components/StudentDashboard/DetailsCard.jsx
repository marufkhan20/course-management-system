import React from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

const DetailsCard = ({ title, total, isLeft }) => {
  const completed = (
    (100 * (Number(total) - Number(isLeft))) /
    Number(total)
  ).toFixed(0);
  return (
    <div className="p-5 bg-white rounded-lg border">
      <span className="font-medium text-lg">{title}</span>
      <div className="flex items-center justify-between mt-5">
        <div className="flex items-end gap-2">
          <h3 className="leading-none font-semibold text-2xl text-[#6D28D9]">
            {total}
          </h3>
          <span className="text-content text-sm">(Is Left {isLeft})</span>
        </div>
        <div
          className={`flex items-center gap-1 ${
            Number(completed) === 100 ? "bg-[#DCFCE7]" : "bg-[#FEE2E2]"
          } py-1 px-3 rounded-full`}
        >
          {Number(completed) === 100 ? (
            <AiOutlineArrowUp className="text-[#22C55E]" />
          ) : (
            <AiOutlineArrowDown className="text-[#EF4444]" />
          )}
          <span
            className={
              Number(completed) === 100 ? "text-[#166534]" : "text-[#A53333]"
            }
          >
            {completed}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default DetailsCard;
