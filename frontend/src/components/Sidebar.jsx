import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BiBookAlt } from "react-icons/bi";
import { FiLogOut, FiSettings, FiUsers } from "react-icons/fi";
import {
  MdOutlineAssignment,
  MdOutlineDashboard,
  MdOutlineReviews,
  MdPayment,
} from "react-icons/md";
import { RiCoupon2Line, RiExchangeDollarLine } from "react-icons/ri";
import { TbFileCertificate } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { userLoggedOut } from "../features/auth/authSlice";

const Sidebar = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth) || {};
  const { profile, role } = user || {};
  const { profileImage, firstName, lastName } = profile || {};

  // logout
  const logout = () => {
    dispatch(userLoggedOut());
  };
  return (
    <div className="md:w-1/5 sm:w-2/5 w-full">
      <div className="bg-white border rounded-lg pb-5">
        <img className="w-full" src="/images/profile-bg.jpg" alt="profile bg" />
        <div className="w-28 h-28 rounded-ful mx-auto -mt-14">
          <img
            className="w-full h-full border-2 border-white rounded-full"
            src={
              profileImage
                ? `${process.env.REACT_APP_API_BASE_URL}${profileImage}`
                : "/images/user.jpg"
            }
            alt="user"
          />
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-center mt-2">
            {firstName || lastName ? `${firstName} ${lastName}` : "John Doe"}
          </h3>
          <span className="text-xs text-content">{role.toUpperCase()}</span>
        </div>
        <div className="text-center">
          <button className="py-2 p-4 mt-4 bg-[#3c2f7e] hover:bg-[#554A8F] text-white inline-block text-xs font-medium rounded-sm">
            {user?.role === "User" && (
              <Link to="/profile/all-courses">View New Courses</Link>
            )}

            {user?.role === "admin" && (
              <Link to="/profile/all-courses/add-course">
                Create New Course
              </Link>
            )}

            {user?.role === "student" && (
              <Link to="/dashboard">Go to Dashboard</Link>
            )}
          </button>
        </div>
      </div>
      <div className="bg-white mt-4 p-4 border rounded-lg">
        <h3 className="font-semibold text-sm text-content-secondary mb-4">
          ACCOUNT SETTINGS
        </h3>
        <ul>
          {role !== "User" && (
            <li
              className={`border-t hover:bg-primary-hover ${
                pathname === "/dashboard" ? "bg-primary-hover" : ""
              }`}
            >
              <Link
                className="flex px-2 py-3 items-center gap-3"
                to="/dashboard"
              >
                <MdOutlineDashboard className="text-primary text-lg" />
                <span className="text-sm">Dashboard</span>
              </Link>
            </li>
          )}

          {role === "admin" && (
            <li
              className={`border-t hover:bg-primary-hover ${
                pathname === "/dashboard/students" ? "bg-primary-hover" : ""
              }`}
            >
              <Link
                className="flex px-2 py-3 items-center gap-3"
                to="/dashboard/students"
              >
                <FiUsers className="text-primary text-lg" />
                <span className="text-sm">Students</span>
              </Link>
            </li>
          )}

          {role === "admin" && (
            <li
              className={`border-t hover:bg-primary-hover ${
                pathname === "/dashboard/assignments" ? "bg-primary-hover" : ""
              }`}
            >
              <Link
                className="flex px-2 py-3 items-center gap-3"
                to="/dashboard/assignments"
              >
                <MdOutlineAssignment className="text-primary text-lg" />
                <span className="text-sm">Assignments</span>
              </Link>
            </li>
          )}
          {(role === "admin" || role === "student") && (
            <li
              className={`border-t hover:bg-primary-hover ${
                pathname === "/dashboard/certificate" ? "bg-primary-hover" : ""
              }`}
            >
              <Link
                className="flex px-2 py-3 items-center gap-3"
                to="/dashboard/certificate"
              >
                <TbFileCertificate className="text-primary text-lg" />
                <span className="text-sm">Certificate</span>
              </Link>
            </li>
          )}
          <li
            className={`border-t hover:bg-primary-hover ${
              pathname === "/profile" ? "bg-primary-hover" : ""
            }`}
          >
            <Link className="flex px-2 py-3 items-center gap-3" to="/profile">
              <FiSettings className="text-primary text-lg" />
              <span className="text-sm">Edit Profile</span>
            </Link>
          </li>
          <li
            className={`border-t hover:bg-primary-hover ${
              pathname === "/profile/security" ? "bg-primary-hover" : ""
            }`}
          >
            <Link
              className="flex items-center gap-3 px-2 py-3"
              to="/profile/security"
            >
              <AiOutlineUser className="text-primary text-lg" />
              <span className="text-sm">Security</span>
            </Link>
          </li>
          <li
            className={`border-t hover:bg-primary-hover ${
              pathname === "/profile/all-courses" ? "bg-primary-hover" : ""
            }`}
          >
            <Link
              className="px-2 py-3 flex items-center gap-3"
              to="/profile/all-courses"
            >
              <BiBookAlt className="text-primary text-lg" />
              <span className="text-sm">All Courses</span>
            </Link>
          </li>

          {role === "admin" && (
            <li
              className={`border-t hover:bg-primary-hover ${
                pathname === "/dashboard/coupon-code" ? "bg-primary-hover" : ""
              }`}
            >
              <Link
                className="flex px-2 py-3 items-center gap-3"
                to="/dashboard/coupon-code"
              >
                <RiCoupon2Line className="text-primary text-lg" />
                <span className="text-sm">Coupon Code</span>
              </Link>
            </li>
          )}

          <li
            className={`border-t hover:bg-primary-hover ${
              pathname === "/dashboard/credit-referral"
                ? "bg-primary-hover"
                : ""
            }`}
          >
            <Link
              className="px-2 py-3 flex items-center gap-3"
              to="/dashboard/credit-referral"
            >
              <RiExchangeDollarLine className="text-primary text-lg" />
              <span className="text-sm">Credit & Referral</span>
            </Link>
          </li>

          <li
            className={`border-t hover:bg-primary-hover ${
              pathname === "/dashboard/review" ? "bg-primary-hover" : ""
            }`}
          >
            <Link
              className="flex px-2 py-3 items-center gap-3"
              to="/dashboard/review"
            >
              <MdOutlineReviews className="text-primary text-lg" />
              <span className="text-sm">Review</span>
            </Link>
          </li>

          <li
            className={`border-t hover:bg-primary-hover ${
              pathname === "/profile/payment" ? "bg-primary-hover" : ""
            }`}
          >
            <Link
              className="px-2 py-3 flex items-center gap-3"
              to="/profile/payment"
            >
              <MdPayment className="text-primary text-lg" />
              <span className="text-sm">Payment</span>
            </Link>
          </li>
          <li
            onClick={logout}
            className="border-t px-2 py-3 hover:bg-primary-hover"
          >
            <div className="flex items-center gap-3 cursor-pointer">
              <FiLogOut className="text-primary text-lg" />
              <span className="text-sm">Logout</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
