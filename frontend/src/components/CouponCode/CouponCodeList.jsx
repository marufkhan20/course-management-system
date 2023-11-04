import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useChangeStatusMutation,
  useDeleteCouponMutation,
  useGetCouponsQuery,
} from "../../features/coupon/couponApi";

const CouponCodeList = () => {
  const [status, setStatus] = useState();
  const [couponId, setCouponId] = useState();
  const [deletedCouponId, setDeletedCouponId] = useState();
  const { data: couponCodes, isLoading, isError } = useGetCouponsQuery();
  const [deleteCouponBool, setDeleteCoupon] = useState(false);

  // status change this code is work
  const [changeStatus, { data: updatedCoupon, error: updatedCouponError }] =
    useChangeStatusMutation();

  // status change functionality
  useEffect(() => {
    if (status && status !== "DELETE") {
      changeStatus({ id: couponId, data: { status } });
    }

    if (status && status === "DELETE") {
      setDeleteCoupon(true);
    }
  }, [status, changeStatus, couponId]);

  // when status change
  useEffect(() => {
    if (updatedCouponError) {
      console.log(updatedCouponError);
    }

    if (updatedCoupon?._id) {
      toast.success("Coupon Status Change Successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [updatedCoupon, updatedCouponError]);

  // delete coupon
  const [deleteCoupon, { data: deletedCoupon }] = useDeleteCouponMutation();

  const deleteCouponHanlder = () => {
    deleteCoupon(couponId);
  };

  useEffect(() => {
    if (deletedCoupon) {
      setDeleteCoupon(false);
      setDeletedCouponId(couponId);
      toast.success("Coupon Deleted Successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [deletedCoupon, couponId]);

  // decide what to render
  let content;

  if (isLoading) content = <span>Loading..,</span>;

  if (!isLoading && isError) content = <span>Server Error Occurred!!</span>;

  if (!isLoading && !isError && couponCodes?.length === 0)
    content = <span>No Coupon Found!! Create a New Coupon.</span>;

  if (!isLoading && !isError && couponCodes?.length > 0)
    content = couponCodes
      ?.filter((item) => item._id !== deletedCouponId)
      .map((couponItem) => {
        const { _id, name, code, course, discount, status } = couponItem || {};
        const { title } = course || {};
        return (
          <tr key={_id} className="border-b hover:bg-[#F1F5F9]">
            <td className="text-sm py-4 px-4 border-r">{name}</td>
            <td className="text-sm py-4 px-4 border-r">{code}</td>
            <td className="text-sm py-4 px-4 border-r">
              <Link to="#">{title}</Link>
            </td>
            <td className="text-sm py-4 px-4 border-r text-[#2AAA5A]">
              {discount}%
            </td>
            <td className="text-sm py-4 px-4">
              <select
                name="status"
                id="status"
                className="py-2 px-4 border rounded-lg bg-none outline-none"
                onChange={(e) => {
                  setStatus(e.target.value);
                  setCouponId(_id);
                }}
              >
                <option>Change Status</option>
                <option selected={status === "PENDING"} value="PENDING">
                  PENDING
                </option>
                <option selected={status === "ACTIVE"} value="ACTIVE">
                  ACTIVE
                </option>
                <option selected={status === "DEACTIVE"} value="DEACTIVE">
                  DEACTIVE
                </option>
                <option selected={status === "DELETE"} value="DELETE">
                  DELETE
                </option>
              </select>
            </td>
          </tr>
        );
      });
  return (
    <div className="p-5 mt-12 bg-white border rounded-lg w-full">
      <table class="table-auto w-full border">
        <thead className="bg-white border text-left box-border">
          <tr>
            <th className="text-sm py-2 px-4 border-r">Coupon Name</th>
            <th className="text-sm py-2 px-4 border-r">Code</th>
            <th className="text-sm py-2 px-4 border-r">Course</th>
            <th className="text-sm py-2 px-4 border-r">Discount</th>
            <th className="text-sm py-2 px-4">Status</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>

      {deleteCouponBool && (
        <div
          class="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div class="fixed inset-0 z-10 overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg
                        class="h-6 w-6 text-red-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z"
                        />
                      </svg>
                    </div>
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        class="text-lg font-medium leading-6 text-gray-900"
                        id="modal-title"
                      >
                        Delete Coupon
                      </h3>
                      <div class="mt-2">
                        <p class="text-sm text-gray-500">
                          Are you sure delete this coupon?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={deleteCouponHanlder}
                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setDeleteCoupon(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponCodeList;
