import React from "react";

const StudentResumeView = ({ resume, control }) => {
  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-gray-900/70 flex items-center justify-center"
      onClick={() => control(false)}
    >
      <img
        className="w-2/5"
        src={`${process.env.REACT_APP_API_BASE_URL}${resume}`}
        alt="resume"
      />
    </div>
  );
};

export default StudentResumeView;
