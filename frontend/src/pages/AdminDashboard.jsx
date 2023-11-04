import React from "react";
import DetailsCard from "../components/Dashboard/DetailsCard";
import OrderList from "../components/Dashboard/OrderList";
import TopSaleCourse from "../components/Dashboard/TopSaleCourse";
import ProfileLayout from "../components/Layout/ProfileLayout";
import Sidebar from "../components/Sidebar";

const AdminDashboard = () => {
  return (
    <ProfileLayout notDefault>
      <div className="flex items-start sm:flex-row flex-col gap-8">
        <Sidebar />
        <div className="md:w-4/5 sm:w-3/5 w-full">
          <div className="grid grid-cols-3 gap-5">
            <DetailsCard
              title="REVENUE"
              amount="$467.34"
              desc="Earning this month"
              color="text-[#159F46]"
            />
            <DetailsCard
              title="STUDENTS ENROLLMENTS"
              amount="12,000"
              desc="New this month"
              color="text-[#669CFD]"
            />
            <DetailsCard
              title="COURSES RATING"
              amount="4.80"
              desc="Rating this month"
              color="text-[#FFB54A]"
            />
          </div>
          {/* top sale course */}
          <TopSaleCourse />

          {/* order details */}
          <OrderList />
        </div>
      </div>
    </ProfileLayout>
  );
};

export default AdminDashboard;
