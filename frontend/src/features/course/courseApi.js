import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "../auth/authSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => "/api/courses/",
    }),
    getCourse: builder.query({
      query: (id) => `/api/courses/${id}`,
    }),
    getEnrollStudents: builder.query({
      query: () => `/api/courses/enroll-students`,
    }),
    getEnrollStudentsByCourseId: builder.query({
      query: (courseId) => `/api/courses/enroll-students/${courseId}`,
    }),
    getTopSaleCourses: builder.query({
      query: () => "/api/courses/top-sale-course",
    }),
    getCourseOrders: builder.query({
      query: () => "/api/courses/course-orders",
    }),
    addCoure: builder.mutation({
      query: (data) => ({
        url: "/api/courses/add-course",
        method: "POST",
        body: data,
      }),
    }),
    enrollCourse: builder.mutation({
      query: (data) => ({
        url: "/api/courses/enroll-course",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const res = await queryFulfilled;
        const { data } = res || {};
        const { profile } = data || {};

        // get localStorage data
        let storage = localStorage.getItem("auth");
        storage = JSON.parse(storage);
        storage.user.role = "student";
        storage.user.profile = profile;

        // update localStorage Data
        localStorage.setItem("auth", JSON.stringify(storage));

        // dispatch userLoggedIn action
        dispatch(userLoggedIn(storage));
      },
    }),
    getEnrollCoursesByStudentId: builder.query({
      query: (studentId) => `/api/courses/student-courses/${studentId}`,
    }),
    uploadCourseCertificate: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/courses/upload-certificate/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useAddCoureMutation,
  useEnrollCourseMutation,
  useGetEnrollStudentsQuery,
  useGetEnrollStudentsByCourseIdQuery,
  useGetTopSaleCoursesQuery,
  useGetCourseOrdersQuery,
  useGetEnrollCoursesByStudentIdQuery,
  useUploadCourseCertificateMutation,
} = courseApi;
