import React from "react";

const ServiceItem = ({ icon, title, content }) => {
  return (
    <div className="services text-center p-7 border rounded-xl hover:bg-[#413655] transition-all">
      <div className="border w-24 mx-auto h-24 flex items-center justify-center rounded-full bg-white">
        <img className="w-16" src={`/images/services/${icon}`} alt="service" />
      </div>
      <h3 className="font-bold my-4 hover:text-white">{title}</h3>
      <p className="text-content text-sm hover:text-white">{content}</p>
    </div>
  );
};

export default ServiceItem;
