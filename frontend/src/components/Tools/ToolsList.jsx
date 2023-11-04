import React from "react";
import ToolItem from "./ToolItem";
// Import Swiper React components
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const ToolsList = () => {
  SwiperCore.use([Autoplay]);
  return (
    <div className="container z-50 lg:-mt-10">
      <Swiper
        spaceBetween={30}
        slidesPerView={5}
        autoplay={{
          delay: 1000,
        }}
        loop={true}
      >
        <SwiperSlide>
          <ToolItem title="Node JS" bg="bg-green-200" icon="node-js.png" />
        </SwiperSlide>
        <SwiperSlide>
          <ToolItem title="Express JS" bg="bg-slate-400" icon="express.png" />
        </SwiperSlide>
        <SwiperSlide>
          <ToolItem title="React JS" bg="bg-blue-200" icon="react.png" />
        </SwiperSlide>
        <SwiperSlide>
          <ToolItem title="VS Code" bg="bg-sky-200" icon="vs-code.png" />
        </SwiperSlide>
        <SwiperSlide>
          <ToolItem title="Html" bg="bg-red-100" icon="html.png" />
        </SwiperSlide>
        <SwiperSlide>
          <ToolItem title="VS Code" bg="bg-sky-200" icon="vs-code.png" />
        </SwiperSlide>
        <SwiperSlide>
          <ToolItem title="Html" bg="bg-red-100" icon="html.png" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ToolsList;
