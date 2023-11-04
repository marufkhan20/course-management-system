import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "../auth/authSlice";

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (userId) => `/api/profile/${userId}`,
    }),
    updateProfile: builder.mutation({
      query: ({ data, userId }) => ({
        url: `/api/profile/${userId}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const res = await queryFulfilled;
        const profile = res.data || {};

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
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
