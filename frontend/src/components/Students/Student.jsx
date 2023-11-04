import moment from "moment";
import React from "react";
import { GoLocation } from "react-icons/go";

const Student = ({ student }) => {
  const { profileId, createdAt, completed } = student || {};
  const { firstName, profileImage, lastName, country } = profileId || {};
  return (
    <div className="rounded border bg-white">
      <div>
        <img
          className="w-20 h-20 rounded-full mx-auto mt-4"
          src={
            profileImage
              ? `${process.env.REACT_APP_API_BASE_URL}${profileImage}`
              : `/images/user.jpg`
          }
          alt="user"
        />
      </div>
      <div className="text-center border-b pb-4">
        <h4 className="font-semibold text-lg mt-2">{`${firstName} ${lastName}`}</h4>
        <span className="flex items-center gap-1 justify-center text-xs text-content">
          <GoLocation />
          <span>{country}</span>
        </span>
      </div>
      {/* 3/12/2020 */}
      <span className="p-3 block border-b text-xs">
        Enrolled : {moment(createdAt).format("MMM Do YY")}
      </span>
      <div className="flex items-center justify-between p-3">
        <span className="text-xs">Progress</span>
        <div className="flex items-center gap-1">
          <span className="text-xs">{completed}%</span>
          <div className="bg-gray-200 h-2 w-16 rounded-full">
            <div
              style={{ width: completed + "%" }}
              className="h-2 bg-[#38AD62] rounded-full"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
