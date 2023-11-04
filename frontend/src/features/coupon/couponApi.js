import { apiSlice } from "../api/apiSlice";

export const couponApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoupons: builder.query({
      query: () => "/api/coupon-code",
    }),
    addCoupon: builder.mutation({
      query: (data) => ({
        url: "/api/coupon-code",
        method: "POST",
        body: data,
      }),
    }),
    changeStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/coupon-code/change-status/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `/api/coupon-code/${id}`,
        method: "DELETE",
      }),
    }),
    applyCouponCode: builder.mutation({
      query: (data) => ({
        url: "/api/coupon-code/apply-coupon-code",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetCouponsQuery,
  useAddCouponMutation,
  useChangeStatusMutation,
  useDeleteCouponMutation,
  useApplyCouponCodeMutation,
} = couponApi;
