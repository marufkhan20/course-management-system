import { apiSlice } from "../api/apiSlice";

export const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: () => "/api/review/",
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: "/api/review/create",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllReviewsQuery, useCreateReviewMutation } = reviewApi;
