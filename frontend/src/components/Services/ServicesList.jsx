import React from "react";
import ServiceItem from "./ServiceItem";

const ServicesList = () => {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8">
      <ServiceItem
        title="Decade's Hottest Career"
        icon="service-1.png"
        content="2021 witnessed a 21% jump in professionals. Earn an average salary of
        INR 6.7 LPA."
      />
      <ServiceItem
        title="Decade's Hottest Career"
        content="2021 witnessed a 21% jump in professionals. Earn an average salary of
        INR 6.7 LPA."
        icon="service-2.png"
      />
      <ServiceItem
        title="Decade's Hottest Career"
        content="2021 witnessed a 21% jump in professionals. Earn an average salary of
        INR 6.7 LPA."
        icon="service-3.png"
      />
      <ServiceItem
        title="Decade's Hottest Career"
        content="2021 witnessed a 21% jump in professionals. Earn an average salary of
        INR 6.7 LPA."
        icon="service-2.png"
      />
    </div>
  );
};

export default ServicesList;
