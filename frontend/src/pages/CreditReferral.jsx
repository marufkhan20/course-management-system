import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProfileLayout from "../components/Layout/ProfileLayout";
import Sidebar from "../components/Sidebar";
import Button from "../components/ui/Button";
import {
  useConvertToRedeemMutation,
  useGetCreditPointsQuery,
} from "../features/creditReferral/creditReferralApi";

const CreditReferral = () => {
  const [coppied, setCoppied] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { profile, userid: userId } = user || {};
  const { redeemPoints, _id } = profile || {};
  const baseUrl = process.env.REACT_APP_BASE_URL;

  // get credit points
  const { data: creditPoints } = useGetCreditPointsQuery(_id);

  // create referral link
  const referralLink = `${baseUrl}/referral-link/${userId}`;

  // convert credit to redeem points
  const [convertToRedeem, { data, error }] = useConvertToRedeemMutation();

  useEffect(() => {
    if (error) {
      if (error) {
        return console.log(error?.data.error);
      }
    }

    if (data?._id) {
      toast.success("Convert Credit To Redeem Points Successfully!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [data, error]);

  const convertToRedeemHandler = () => {
    convertToRedeem({
      profileId: _id,
      creditPoints,
    });
  };
  return (
    <ProfileLayout notDefault>
      <div className="flex items-start sm:flex-row flex-col gap-8">
        <Sidebar />
        <div className="md:w-4/5 sm:w-3/5 w-full">
          <div className="p-5 border-b bg-white rounded-lg border">
            <h3 className="font-semibold text-lg mb-3">Coupon Code</h3>
            <p className="text-content text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              mollitia, molestiae quas vel sint commodi repudiandae consequuntur
              voluptatum laborum
            </p>
          </div>

          <div className="p-5 mt-12 bg-white border rounded-lg w-full">
            <div className="flex items-center justify-between gap-10">
              <div
                title="You can use buy the course with convert to redeem points."
                className="border w-full rounded-lg py-2 px-4"
              >
                <span>Your Credit Points :</span>
                <h3 className="text-primary font-semibold">
                  {creditPoints || "00"}
                </h3>
              </div>
              <div
                title="You can use buy the course."
                className="border w-full rounded-lg py-2 px-4"
              >
                <span>Your Redeem Points :</span>
                <h3 className="text-primary font-semibold">
                  {redeemPoints || "00"}
                </h3>
              </div>
            </div>

            <div className="my-5">
              {creditPoints < 6000 ? (
                <Button
                  type="disable"
                  width="py-1 mx-auto"
                  title="You can redeem only if you have 6000 credits in your account."
                >
                  CONVERT TO REDEEM
                </Button>
              ) : (
                <Button onClick={convertToRedeemHandler} width="py-1 mx-auto">
                  CONVERT TO REDEEM
                </Button>
              )}
            </div>
            <div className="mt-3">
              <label
                className="font-semibold block mb-1 text-content text-sm"
                htmlFor="link"
              >
                Your Referral Link
              </label>
              <div className="flex items-center justify-between gap-12">
                <input
                  className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                  type="text"
                  id="link"
                  placeholder="Enter your first name"
                  value={referralLink}
                />
                <CopyToClipboard
                  text={referralLink}
                  onCopy={() => setCoppied(true)}
                >
                  <Button width="py-1">Copy</Button>
                </CopyToClipboard>
              </div>
              {coppied && (
                <span className="text-sm text-green-700 mt-2 inline-block">
                  Referral Code is Copied
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default CreditReferral;
