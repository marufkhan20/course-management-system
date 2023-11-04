import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { useGetAllReviewsQuery } from "../../features/review/reviewApi";
import TestimonialItem from "./TestimonialItem";

const Testimonials = () => {
  const { data: reviews, isError, isLoading } = useGetAllReviewsQuery();

  // decide what to render
  let content;

  if (isLoading) content = <span>Loading...</span>;

  if (!isLoading && isError) content = <span>Server Error Occurred!!</span>;

  if (!isLoading && !isError && reviews?.length === 0)
    content = <span>No Review Found</span>;

  if (!isLoading && !isError && reviews?.length > 0)
    content = reviews?.map((item) => {
      return (
        <SwiperSlide key={item._id}>
          <TestimonialItem item={item} />
        </SwiperSlide>
      );
    });
  return (
    <div>
      <div
        className="h-96 text-center py-20"
        style={{ backgroundImage: `url('/images/user-love.jpg')` }}
      >
        <div className="container">
          <h3 className="text-white font-semibold">
            Check out these real reviews
          </h3>
          <h2 className="text-white font-semibold text-2xl mt-3">
            Users-love-us Don't take it from us.
          </h2>
        </div>
      </div>
      <div className="bg-gradient-to-r from-gray-100 to-gray-300 p-4 rounded-xl w-3/5 mx-auto -mt-[180px]">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
          }}
          loop={true}
        >
          {content}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
