import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import AddCourse from "./pages/AddCourse";
import AdminCertificate from "./pages/AdminCertificate";
import AdminDashboard from "./pages/AdminDashboard";
import AllCourses from "./pages/AllCourses";
import AssignmentDetails from "./pages/AssignmentDetails";
import Assignments from "./pages/Assignments";
import Checkout from "./pages/Checkout";
import Counselling from "./pages/Counselling";
import CouponCode from "./pages/CouponCode";
import CourseDetails from "./pages/CourseDetails";
import CreditReferral from "./pages/CreditReferral";
import FeaturedStudents from "./pages/FeaturedStudents";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import ReferralLink from "./pages/ReferralLink";
import Register from "./pages/Register";
import Review from "./pages/Review";
import Security from "./pages/Security";
import StudentCertificate from "./pages/StudentCertificate";
import StudentDashboard from "./pages/StudentDashboard";
import Students from "./pages/Students";

const App = () => {
  const { user } = useSelector((state) => state.auth) || {};
  const { role } = user || {};
  return (
    <>
      <ToastContainer />
      {/* Navigation area */}
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book-free-counselling" element={<Counselling />} />
        <Route path="/featured-students" element={<FeaturedStudents />} />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              {role === "admin" && <AdminDashboard />}
              {role === "student" && <StudentDashboard />}
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/students"
          element={
            <AdminPrivateRoute>
              <Students />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/dashboard/review"
          element={
            <PrivateRoute>
              <Review />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/assignments"
          element={
            <AdminPrivateRoute>
              <Assignments />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/dashboard/assignments/:assignmentId"
          element={
            <PrivateRoute>
              <AssignmentDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/certificate"
          element={
            <PrivateRoute>
              {role === "student" && <StudentCertificate />}
              {role === "admin" && <AdminCertificate />}
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/security"
          element={
            <PrivateRoute>
              <Security />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/all-courses/add-course"
          element={
            <AdminPrivateRoute>
              <AddCourse />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/dashboard/coupon-code"
          element={
            <AdminPrivateRoute>
              <CouponCode />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/profile/all-courses"
          element={
            <PrivateRoute>
              <AllCourses />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/credit-referral"
          element={
            <PrivateRoute>
              <CreditReferral />
            </PrivateRoute>
          }
        />
        <Route path="/referral-link/:id" element={<ReferralLink />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route
          path="/courses/checkout/:id"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/payment"
          element={
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          }
        />
      </Routes>

      {/* Footer Area */}
      <Footer />
    </>
  );
};

export default App;
