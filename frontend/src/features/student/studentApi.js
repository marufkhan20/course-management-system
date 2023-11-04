import { apiSlice } from "../api/apiSlice";

export const studentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTopStudents: builder.query({
      query: () => "/api/student/top-students",
    }),
  }),
});

export const { useGetTopStudentsQuery } = studentApi;
