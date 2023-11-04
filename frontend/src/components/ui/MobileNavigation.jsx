import React from "react";
import { Link } from "react-router-dom";

const MobileNavigation = ({ mobileNav, setMobileNav }) => {
  return (
    <div
      className={`fixed top-0 min-h-screen w-3/6 transition-all delay-1000 ${
        mobileNav ? "left-0" : "-left-full"
      }`}
    >
      <div className="flex items-center justify-between bg-white p-4">
        <img className="w-16" src="/images/logo.png" alt="logo" />
        <img
          onClick={() => setMobileNav(false)}
          className="w-3 cursor-pointer"
          src="/images/icons/close.png"
          alt="close"
        />
      </div>
      <div className="h-screen bg-primary">
        <ul className="items-center gap-10">
          <li className="text-lg text-white p-4 border-b border-white hover:text-primary transition-all">
            <Link to="/">Overview</Link>
          </li>
          <li className="text-lg text-white p-4 border-b border-white hover:text-primary transition-all">
            <Link to="/">Placements</Link>
          </li>
          <li className="text-lg text-white p-4 border-b border-white hover:text-primary transition-all">
            <Link to="/">Syllabus</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileNavigation;
