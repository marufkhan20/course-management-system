import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "../auth/authSlice";

export const creditReferralApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    convertToRedeem: builder.mutation({
      query: (data) => ({
        url: "/api/credit-referral/convert-to-redeem",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const res = await queryFulfilled;
        const { data: profile } = res || {};

        // get localStorage data
        let storage = localStorage.getItem("auth");
        storage = JSON.parse(storage);
        storage.user.profile = profile;

        // update localStorage Data
        localStorage.setItem("auth", JSON.stringify(storage));

        // dispatch userLoggedIn action
        dispatch(userLoggedIn(storage));
      },
    }),
    getCreditPoints: builder.query({
      query: (id) => `/api/credit-referral/get-credit/${id}`,
    }),
  }),
});

export const { useConvertToRedeemMutation, useGetCreditPointsQuery } =
  creditReferralApi;
