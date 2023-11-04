import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiExchangeDollarLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userLoggedOut } from "../features/auth/authSlice";
import useAuth from "../hooks/useAuth";
import Button from "./ui/Button";
import MobileNavigation from "./ui/MobileNavigation";

const Navigation = () => {
  const [navBg, setNavBg] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isLoggeIn = useAuth();
  const { user } = useSelector((state) => state.auth) || {};
  const { profile, role } = user || {};
  const { profileImage, firstName, lastName, creditPoints } = profile || {};
  const dispatch = useDispatch();

  // when page is navigate profile view is close
  const navigate = useNavigate();

  useEffect(() => {
    setOpen(false);
  }, [navigate]);

  // logout
  const logout = () => {
    dispatch(userLoggedOut());
  };

  if (pathname === "/login") {
    return;
  }

  if (pathname === "/register") {
    return;
  }

  if (pathname === "/forgot-password") {
    return;
  }

  const changeNavBg = () => {
    if (window.scrollY >= 100) {
      setNavBg(true);
    } else {
      setNavBg(false);
    }
  };

  window.addEventListener("scroll", changeNavBg);
  return (
    <nav
      className={`fixed top-0 left-0 right-0 py-6 ${
        pathname !== "/" && "bg-white shadow-sm py-4"
      } px-4 sm:px-0 transition-all ${navBg && "bg-white py-4 border-b"} z-20`}
    >
      <div className="flex items-center justify-between container relative">
        <div className="flex items-center gap-8">
          <div className="sm:hidden">
            <img
              onClick={() => setMobileNav(true)}
              className="w-6 cursor-pointer"
              src="/images/icons/menu.png"
              alt="menu icon"
            />
          </div>
          <Link to="/">
            <img className="w-14" src="/images/logo.png" alt="logo" />
          </Link>
        </div>
        <ul className="items-center gap-10 hidden sm:flex">
          <li className="text-sm hover:text-primary transition-all">
            <Link to="/">Overview</Link>
          </li>
          <li
            className={`text-sm hover:text-primary transition-all ${
              pathname === "/featured-students" && "text-primary"
            }`}
          >
            <Link to="/featured-students">Featured Students</Link>
          </li>
          <li className="text-sm hover:text-primary transition-all">
            <Link to="/placements">Placements</Link>
          </li>
          <li className="text-sm hover:text-primary transition-all">
            <Link to="/syllabus">Syllabus</Link>
          </li>
        </ul>
        {isLoggeIn ? (
          <div className="flex items-center gap-5">
            <div className="hidden sm:flex items-center gap-5">
              <img
                className="w-4 cursor-pointer"
                src="/images/icons/cart.png"
                alt="cart icon"
              />
              <img
                className="w-4 cursor-pointer"
                src="/images/icons/love.png"
                alt="love icon"
              />
              <img
                className="w-4 cursor-pointer"
                src="/images/icons/bell.png"
                alt="bell icon"
              />
            </div>
            <div onClick={() => setOpen((prevOpen) => !prevOpen)}>
              <img
                className="w-8 h-8 rounded-full ring-2 cursor-pointer"
                src={
                  profileImage
                    ? `${process.env.REACT_APP_API_BASE_URL}${profileImage}`
                    : "/images/user.jpg"
                }
                alt="user"
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-5">
            <Button to="/register">Sign Up</Button>
            <Button to="/login">Log In</Button>
          </div>
        )}

        {isLoggeIn && open && (
          <div
            className={`absolute top-[115%] right-0 pt-3 bg-white rounded-lg shadow ${
              open ? "opacity-1" : "opacity-0"
            }`}
          >
            <div className="flex items-center gap-3 px-3">
              <img
                className="w-8 h-8 rounded-full ring-2 cursor-pointer"
                src={
                  profileImage
                    ? `${process.env.REACT_APP_API_BASE_URL}${profileImage}`
                    : "/images/user.jpg"
                }
                alt="user"
              />
              <div>
                <span className="block text-xs font-medium">
                  {firstName || lastName
                    ? `${firstName} ${lastName}`
                    : "John Doe"}
                </span>
                <span className="text-content text-xs">{role}</span>
              </div>
            </div>
            <div className="flex flex-col mt-2">
              <li className="py-2 hover:bg-gray-300 px-3 hover:text-primary transition-all">
                <Link
                  className="flex items-center gap-1"
                  to="/dashboard/credit-referral"
                >
                  <RiExchangeDollarLine className="text-primary text-xs" />
                  <span className="text-xs">{creditPoints || "00"}</span>
                </Link>
              </li>
              <li className="py-2 hover:bg-gray-300 px-3 hover:text-primary transition-all">
                {role === "admin" || role === "student" ? (
                  <Link className="flex items-center gap-1" to="/dashboard">
                    <MdOutlineDashboard className="text-primary text-xs" />
                    <span className="text-xs">Dashboard</span>
                  </Link>
                ) : (
                  <Link className="flex items-center gap-1" to="/profile">
                    <AiOutlineUser className="text-primary text-xs" />
                    <span className="text-xs">Profile</span>
                  </Link>
                )}
              </li>
              <li
                onClick={logout}
                className="flex items-center gap-1 py-2 hover:bg-gray-300 px-3 cursor-pointer hover:text-primary transition-all"
              >
                <FiLogOut className="text-primary text-xs" />
                <span className="text-xs">Logout</span>
              </li>
            </div>
          </div>
        )}
      </div>
      {mobileNav && (
        <MobileNavigation mobileNav={mobileNav} setMobileNav={setMobileNav} />
      )}
    </nav>
  );
};

export default Navigation;
