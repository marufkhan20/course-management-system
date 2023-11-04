import React from "react";

const ToolItem = ({ icon, title, bg }) => {
  return (
    <div className="bg-white p-4 rounded-xl flex items-center gap-5 shadow">
      <div className={`p-2 rounded-2xl ${bg}`}>
        <img
          className="w-10 inline-block"
          src={`/images/tools/${icon}`}
          alt="node js"
        />
      </div>
      <span className="font-bold text-sm">{title}</span>
    </div>
  );
};

export default ToolItem;
