import React from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();

  if (pathname === "/login") {
    return;
  }

  if (pathname === "/register") {
    return;
  }

  if (pathname === "/forgot-password") {
    return;
  }

  return (
    <div className="py-16">
      <div className="container lg:px-0 px-4">
        <div className="flex sm:flex-row flex-col gap-8">
          <div className="w-2/6">
            <img className="w-16 mb-6" src="/images/logo.png" alt="log" />
            <p className="text-xs w-2/3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              consequat mauris Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Ut consequat mauris
            </p>
          </div>
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 w-4/6">
            <div>
              <h3 className="font-bold mb-5">For Instructor</h3>
              <ul>
                <li className="text-sm mb-4">
                  <Link to="/profile">Profile</Link>
                </li>
                <li className="text-sm mb-4">
                  <Link to="/login">Login</Link>
                </li>
                <li className="text-sm mb-4">
                  <Link to="/register">Register</Link>
                </li>
                <li className="text-sm mb-4">
                  <Link to="/instructor">Instructor</Link>
                </li>
                <li className="text-sm mb-4">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-5">For Student</h3>
              <ul>
                <li className="text-sm mb-4">
                  <Link to="/profile">Profile</Link>
                </li>
                <li className="text-sm mb-4">
                  <Link to="/login">Login</Link>
                </li>
                <li className="text-sm mb-4">
                  <Link to="/register">Register</Link>
                </li>
                <li className="text-sm mb-4">
                  <Link to="/student">Student</Link>
                </li>
                <li className="text-sm mb-4">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-5">News Letter</h3>
              <input
                className="w-full text-content-secondary outline-none border-b py-2 block text-xs"
                type="text"
                placeholder="Enter your email address"
              />
              <ul className="flex flex-col gap-4 mt-4">
                <li className="flex items-center gap-3 text-xs">
                  <img src="/images/icons/icon-map.svg" alt="map" />
                  <span>
                    3556 Beech Street, San Francisco,
                    <br />
                    California, CA 94108
                  </span>
                </li>
                <li className="flex items-center gap-3 text-xs">
                  <img src="/images/icons/icon-msg.svg" alt="message" />
                  <span> loremipsum@example.com</span>
                </li>
                <li className="flex items-center gap-3 text-xs">
                  <img src="/images/icons/icon-phn.svg" alt="phone" />
                  <span>+19 123-456-7890</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
