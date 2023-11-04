import { apiSlice } from "../api/apiSlice";

export const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentByUserId: builder.query({
      query: (userId) => `/api/payment-method/${userId}`,
    }),
    addPayment: builder.mutation({
      query: (data) => ({
        url: `/api/payment-method`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetPaymentByUserIdQuery, useAddPaymentMutation } = paymentApi;
