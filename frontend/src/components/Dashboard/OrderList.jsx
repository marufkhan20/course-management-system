import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { useGetCourseOrdersQuery } from "../../features/course/courseApi";

const OrderList = () => {
  const { data: orders, isLoading, isError } = useGetCourseOrdersQuery();

  // decide what to render
  let content;

  if (isLoading) content = <span>Loading...</span>;

  if (!isLoading && isError) content = <span>Server Error Occurred!!</span>;

  if (!isLoading && !isError && orders?.length === 0)
    content = <span>No Orders Found!!</span>;

  if (!isLoading && !isError && orders?.length > 0)
    content = orders?.map((course, idx) => {
      const { _id, courseId, createdAt, paymentMethod } = course || {};
      const { title, sales } = courseId || {};

      return (
        <tr key={_id} className={orders.length !== idx + 1 && "border-b"}>
          <td>
            <Link>
              <span className="text-sm inline-block my-3 transition-all hover:text-primary">
                {title}
              </span>
            </Link>
          </td>
          <td>
            <span className="text-xs ">{sales}</span>
          </td>
          <td>
            <span className="text-xs ">#{_id}</span>
          </td>
          <td>
            <span className="text-xs ">
              {moment(createdAt).format("MMM-Do-YY")}
            </span>
          </td>
          <td>
            <span className="text-xs ">{paymentMethod?.toUpperCase()}</span>
          </td>
        </tr>
      );
    });
  return (
    <div className="mt-5 bg-white border rounded-lg">
      <div className="p-5 border-b">
        <h3 className="text-xl text-content-secondary font-semibold mb-2">
          Orders
        </h3>
        <p className="text-content text-sm">
          Order Dashboard is a quick overview of all current orders.
        </p>
      </div>
      <div className="p-5">
        <table class="table-auto w-full">
          <thead className="bg-[#F0F0F0] text-left">
            <tr>
              <th className="text-sm">COURSES</th>
              <th className="text-sm">SALES</th>
              <th className="text-sm">INVOICE</th>
              <th className="text-sm">DATE</th>
              <th className="text-sm">METHOD</th>
            </tr>
          </thead>
          <tbody> {content} </tbody>
        </table>
      </div>
      <div className="text-center pb-5">
        <Link
          className="py-3 px-6 bg-content-secondary text-white rounded transition-all border border-content-secondary hover:bg-transparent hover:text-content-secondary"
          to="/dashboard/orders"
        >
          View All Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderList;
