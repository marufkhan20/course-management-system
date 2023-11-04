import { apiSlice } from "../api/apiSlice";

export const assignmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAssignments: builder.query({
      query: () => "/api/assignment",
      providesTags: ["getAssignments"],
    }),
    getAssignmentsByStudentId: builder.query({
      query: (id) => `/api/assignment/student/${id}`,
    }),
    getAssingment: builder.query({
      query: (id) => `/api/assignment/${id}`,
    }),
    createAssignment: builder.mutation({
      query: (data) => ({
        url: "/api/assignment/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getAssignments"],
    }),
    submitAssignment: builder.mutation({
      query: (data) => ({
        url: "/api/assignment/submit-assignment",
        method: "POST",
        body: data,
      }),
    }),
    getSubmitAssignment: builder.query({
      query: ({ assignmentId, studentId }) =>
        `/api/assignment/submit-assignment/${assignmentId}/${studentId}`,
    }),
    assignNumber: builder.mutation({
      query: ({id, data}) => ({
        url: `/api/assignment/assign-number/${id}`,
        method: 'PATCH',
        body: data
      })
    })
  }),
});

export const {
  useGetAllAssignmentsQuery,
  useGetAssignmentsByStudentIdQuery,
  useGetAssingmentQuery,
  useCreateAssignmentMutation,
  useSubmitAssignmentMutation,
  useGetSubmitAssignmentQuery,
  useAssignNumberMutation
} = assignmentApi;
