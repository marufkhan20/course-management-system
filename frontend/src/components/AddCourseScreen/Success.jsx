import React from "react";

const Success = () => {
  return (
    <div className="py-6 px-8 border-b">
      <div className="flex items-center flex-col">
        <img
          src="/images/icons/check.png"
          className="w-7 h-7 mb-5"
          alt="check"
        />
        <h3 className="text-lg font-medium mb-1">
          The Course Added Succesfully
        </h3>
        <span className="text-sm">Admin will be Approve soon.</span>
      </div>
    </div>
  );
};

export default Success;
