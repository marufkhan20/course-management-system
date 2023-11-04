import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdOutlinePayment } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import AddCardModal from "../components/AddCardModal";
import ProfileLayout from "../components/Layout/ProfileLayout";
import { useGetPaymentByUserIdQuery } from "../features/payment/paymentApi";

const Payment = () => {
  const [modal, setModal] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const {
    data: payments,
    isLoading,
    isError,
  } = useGetPaymentByUserIdQuery(user?.userid);

  const modalControl = () => {
    setModal((prevState) => !prevState);
  };

  // decide what to render
  let content = undefined;

  if (isLoading) content = <span>Loading...</span>;

  if (!isLoading && !isError) content = <span>Server Error Occurred!!</span>;

  if (!isLoading && !isError && payments?.length === 0)
    content = <span>No Payment Method Found!! Add New Payment Method.</span>;

  if (!isLoading && !isError && payments?.length > 0)
    content = payments?.map((payment) => {
      const { _id, paymentName, status } = payment;

      return (
        <div key={_id} className="flex items-center justify-between mt-6 gap-5">
          <div>
            <span className="block font-semibold text-xs">{paymentName}</span>
            <span className="text-xs text-content">Expires in 10/2021</span>
          </div>
          <div className="flex items-center gap-3">
            {status && status === "primary" && (
              <span className="inline-block p-1 px-2 text-xs rounded bg-[#159F46] text-white">
                PRIMARY
              </span>
            )}
            <span
              title="Edit"
              className="bg-[#455A64] p-1 rounded text-white cursor-pointer"
            >
              <BiEdit />
            </span>
            <span
              title="Make it Primary"
              className="bg-[#FF875A] p-1 rounded text-white cursor-pointer"
            >
              <MdOutlinePayment />
            </span>
            <span
              title="Delete"
              className="bg-[#EB4334] p-1 rounded text-white cursor-pointer"
            >
              <RiDeleteBinLine />
            </span>
          </div>
        </div>
      );
    });
  return (
    <ProfileLayout
      title="Payment Methods"
      description="Primary payment method is used by default"
    >
      <div className="p-5">
        <div>
          <button
            className="border border-primary py-2 px-5 rounded-lg font-semibold text-sm text-primary transition-all hover:text-white hover:bg-primary"
            onClick={() => modalControl()}
          >
            Add Payment Method
          </button>
          {/* Modal */}
          <AddCardModal modal={modal} control={modalControl} />

          {/* card list */}
          <div>{content}</div>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default Payment;
