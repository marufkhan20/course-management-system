import React from "react";
import Sidebar from "../Sidebar";

const ProfileLayout = ({ children, title, description, notDefault }) => {
  return (
    <div className="pt-36 pb-20 bg-primary-bg px-4 sm:px-0">
      <div className="container">
        {!notDefault ? (
          <div className="flex items-start sm:flex-row flex-col gap-8">
            <Sidebar />
            <div className="md:w-4/5 sm:w-3/5 w-full bg-white rounded-lg border">
              <div className="p-5 border-b">
                <h3 className="font-semibold text-lg mb-3">{title}</h3>
                <p className="text-content text-sm">{description}</p>
              </div>
              {children}
            </div>
          </div>
        ) : (
          <>{children}</>
        )}
      </div>
    </div>
  );
};

export default ProfileLayout;
