import ProgressBar from "@ramonak/react-progress-bar";
import React, { useState } from "react";
import { AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import { BsFacebook, BsTwitter } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import Button from "../ui/Button";
import StudentResumeView from "./StudentResumeView";

const FeaturedStudentItem = ({ student }) => {
  const [resumeView, setResumeView] = useState(false);
  const {
    firstName,
    lastName,
    profileImage,
    assignmentNumber,
    country,
    resume,
  } = student || {};
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center gap-7">
        <div className="w-32">
          <img
            className="h-24 rounded-lg"
            src={
              profileImage
                ? `${process.env.REACT_APP_API_BASE_URL}${profileImage}`
                : `/images/user.jpg`
            }
            alt="user"
          />
        </div>
        <div className="w-full">
          <div className="flex items-center justify-between w-full">
            <div>
              <h3 className="text-gray-900 font-medium leading-3 cursor-pointer hover:text-primary transition-all">
                {firstName ? firstName + " " + lastName : "John Doe"}
              </h3>
              <span className="text-content font-medium text-xs">Student</span>
            </div>
            <div>
              <button
                className="block py-1 px-4 border-2 border-green-600 rounded-full text-xs font-medium text-white transition-all bg-green-600 hover:bg-green-400 hover:text-white hover:border-transparent cursor-pointer"
                onClick={() => setResumeView(true)}
              >
                See Resume
              </button>
            </div>
          </div>
          <div className="flex items-center gap-5 mt-[6px]">
            <span className="flex items-center gap-2">
              <GoLocation className="text-primary font-bold" />
              <span className="text-content text-sm">
                {country || "Unknown"}
              </span>
            </span>
            <ul className="flex items-center gap-2">
              <li className="cursor-pointer hover:text-primary transition-all">
                <BsFacebook />
              </li>
              <li className="cursor-pointer hover:text-primary transition-all">
                <BsTwitter />
              </li>
              <li className="cursor-pointer hover:text-primary transition-all">
                <AiFillLinkedin />
              </li>
              <li className="cursor-pointer hover:text-primary transition-all">
                <AiFillInstagram />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <span className="font-semibold">Student Progress:</span>
        <div className="mt-2 border rounded-md p-2">
          <span className="text-sm">Assignment Completed </span>
          <ProgressBar completed={60} className="mt-2" />
        </div>
        <div className="mt-2 border rounded-md p-2">
          <span className="text-sm block">Assignment Marks</span>
          <span className="font-medium mt-1 inline-block">
            {assignmentNumber}
          </span>
        </div>
        <div className="mt-4">
          <Button width="mx-auto">Contact us</Button>
        </div>
      </div>

      {/* resume viewer */}
      {resumeView && (
        <StudentResumeView resume={resume} control={setResumeView} />
      )}
    </div>
  );
};

export default FeaturedStudentItem;
