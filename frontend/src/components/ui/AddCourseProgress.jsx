import React from "react";

const AddCourseProgress = ({ onStage }) => {
  return (
    <div className="flex items-center gap-7 py-6 px-8 border-b">
      <div>
        <div
          className={`h-[3px] w-32 mb-4 ${
            onStage >= 1 ? "bg-[#159F46] " : "bg-[#C1C9D2]"
          }`}
        ></div>
        <div className="flex items-center gap-1">
          {onStage > 1 ? (
            <img
              className="w-3 h-3"
              src="/images/icons/check.png"
              alt="check"
            />
          ) : (
            <div
              className={`w-3 h-3 box-border rounded-full ${
                onStage === 1
                  ? "border-4 border-[#159F46]"
                  : "border-2 border-inherit"
              }`}
            ></div>
          )}
          <span className="text-xs">Basic Information</span>
        </div>
      </div>
      <div>
        <div
          className={`h-[3px] w-32 mb-4 ${
            onStage >= 2 ? "bg-[#159F46] " : "bg-[#C1C9D2]"
          }`}
        ></div>
        <div className="flex items-center gap-1">
          {onStage > 2 ? (
            <img
              className="w-3 h-3"
              src="/images/icons/check.png"
              alt="check"
            />
          ) : (
            <div
              className={`w-3 h-3 box-border rounded-full ${
                onStage === 2
                  ? "border-4 border-[#159F46]"
                  : "border-2 border-inherit"
              }`}
            ></div>
          )}
          <span className="text-xs">Courses Media</span>
        </div>
      </div>
      {/* <div>
        <div
          className={`h-[3px] w-32 mb-4 ${
            onStage >= 3 ? "bg-[#159F46] " : "bg-[#C1C9D2]"
          }`}
        ></div>
        <div className="flex items-center gap-1">
          {onStage > 3 ? (
            <img
              className="w-3 h-3"
              src="/images/icons/check.png"
              alt="check"
            />
          ) : (
            <div
              className={`w-3 h-3 box-border rounded-full ${
                onStage === 3
                  ? "border-4 border-[#159F46]"
                  : "border-2 border-inherit"
              }`}
            ></div>
          )}
          <span className="text-xs">Curriculum</span>
        </div>
      </div> */}
      <div>
        <div
          className={`h-[3px] w-32 mb-4 ${
            onStage >= 3 ? "bg-[#159F46] " : "bg-[#C1C9D2]"
          }`}
        ></div>
        <div className="flex items-center gap-1">
          {onStage > 3 ? (
            <img
              className="w-3 h-3"
              src="/images/icons/check.png"
              alt="check"
            />
          ) : (
            <div
              className={`w-3 h-3 box-border rounded-full ${
                onStage === 3
                  ? "border-4 border-[#159F46]"
                  : "border-2 border-inherit"
              }`}
            ></div>
          )}
          <span className="text-xs">Settings</span>
        </div>
      </div>
    </div>
  );
};

export default AddCourseProgress;
