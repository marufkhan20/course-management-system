import React from "react";

const DetailsCard = ({ title, amount, desc, color }) => {
  return (
    <div className="p-5 bg-white rounded-lg border">
      <span className="font-medium text-content text-xs">{title}</span>
      <h3 className={`my-3 font-semibold text-2xl ${color}`}>{amount}</h3>
      <span className="text-xs">{desc}</span>
    </div>
  );
};

export default DetailsCard;
