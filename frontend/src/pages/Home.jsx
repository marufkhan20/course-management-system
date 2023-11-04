import React from "react";
import { toast } from "react-toastify";
import CourseOverview from "../components/CourseOverview/CourseOverview";
import FeaturedCourses from "../components/FeaturedCourses/FeaturedCourses";
import ServicesList from "../components/Services/ServicesList";
import Testimonials from "../components/Testimonials/Testimonials";
import ToolsList from "../components/Tools/ToolsList";
import Button from "../components/ui/Button";

const Home = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    toast.success("Brochure successfully sent plz check your email inbox!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  return (
    <main>
      {/* Header area */}
      <header
        className="min-h-screen pt-36 pb-8 px-4 sm:px-0"
        style={{ backgroundImage: "url(/images/banner.png)" }}
      >
        <div className="container">
          <div className="flex justify-end mb-16">
            <Button to="/book-free-counselling">
              Book a Free Counselling Session Now !!
            </Button>
          </div>
          <div className="flex md:flex-row flex-col items-center justify-between gap-16">
            <div className="md:w-3/5 w-full">
              <h2 className="text-4xl font-bold mb-9">
                Fullstack MERN Developer
              </h2>
              <span className="text-content block text-base mb-5">
                Real Project Based Learning | Agile Methology
              </span>
              <Button to="/register" type="hover">
                Register Now !!
              </Button>
              <p className="text-content text-base mt-5">
                <span className="font-bold">
                  The Full Stack MERN Developer Program{" "}
                </span>
                is an intense bootcamp offering a complete suite of software
                development skills. Get job-ready with front end & backend
                development skills. Complete the course to get an assured job
                with an average salary of 3-6 LPA.
              </p>
              <div className="flex items-center gap-3 mt-5">
                <span className="font-bold text-4xl">5.0</span>
                <ul className="flex items-center gap-3">
                  <li>
                    <img
                      className="w-3"
                      src="/images/icons/star.png"
                      alt="star"
                    />
                  </li>
                  <li>
                    <img
                      className="w-3"
                      src="/images/icons/star.png"
                      alt="star"
                    />
                  </li>
                  <li>
                    <img
                      className="w-3"
                      src="/images/icons/star.png"
                      alt="star"
                    />
                  </li>
                  <li>
                    <img
                      className="w-3"
                      src="/images/icons/star.png"
                      alt="star"
                    />
                  </li>
                  <li>
                    <img
                      className="w-3"
                      src="/images/icons/star.png"
                      alt="star"
                    />
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:w-2/5 w-full">
              <div className="text-center -mb-6">
                <Button type="hover">Download Brochure</Button>
              </div>
              <form
                onSubmit={submitHandler}
                className="bg-white p-8 rounded-lg"
              >
                <div className="mb-5 mt-5">
                  <label className="text-content text-sm" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="block w-full py-2 px-4 border text-sm outline-none rounded mt-2 text-content"
                    id="email"
                    type="email"
                    required
                    placeholder="Email"
                  />
                </div>
                <label className="text-content text-sm" htmlFor="phone">
                  Phone
                </label>
                <div className="flex items-center justify-between gap-5">
                  <select
                    name="country"
                    className="py-2 px-4 border text-sm outline-none rounded mt-2 text-content"
                  >
                    <option>Select Country</option>
                    <option selected>India (+ 91)</option>
                  </select>
                  <input
                    id="phone"
                    className="w-full py-2 px-4 border text-sm outline-none rounded mt-2 text-content"
                    type="phone"
                    required
                    placeholder="Phone"
                  />
                </div>
                <div className="mt-5 flex justify-center">
                  <Button type="submit">Send Me Brochure {">>"}</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* tools area */}
      <ToolsList />

      {/* why join area */}
      <section className="py-24 sm:px-0 px-4">
        <div className="container">
          <h2 className="font-bold text-2xl text-center mb-16">
            Why Join This Full Stack MERN Developer Program?
          </h2>
          <ServicesList />
        </div>
      </section>

      {/* featured courses */}
      <section
        className="py-20 px-4 lg:px-0"
        style={{ backgroundImage: "url(/images/banner.png)" }}
      >
        {/* <div className="absolute top-0 left-0 -z-0">
          <img className="h-96" src="/images/course-bg.png" alt="course bg" />
        </div> */}
        <div className="container">
          <div className="flex sm:flex-row flex-col items-center justify-between gap-10 mb-12">
            <div className="w-full sm:w-3/5">
              <h4 className="font-semibold text-primary mb-3">What’s New</h4>
              <h2 className="font-semibold text-3xl mb-2">Featured Courses</h2>
              <p className="text-content text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget
                aenean accumsan bibendum gravida maecenas augue elementum et
                neque. Suspendisse imperdiet.
              </p>
            </div>
            <div className="w-2/5">
              <div className="flex justify-end">
                <Button to="/courses">All Courses</Button>
              </div>
            </div>
          </div>
          <FeaturedCourses />
        </div>
      </section>

      {/* course overview */}
      <section className="py-20 px-4 lg:px-0 border-b">
        <div className="container">
          <div className="w-full sm:w-3/5 mb-12">
            <h4 className="font-semibold text-primary mb-3">
              Full Stack MERN Developer Course Overview
            </h4>
            <h2 className="font-semibold text-3xl mb-2">Featured Courses</h2>
            <p className="text-content text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget
              aenean accumsan bibendum gravida maecenas augue elementum et
              neque. Suspendisse imperdiet.
            </p>
          </div>

          <CourseOverview />
        </div>
      </section>

      {/* testimonials area */}
      <Testimonials />
    </main>
  );
};

export default Home;
