import { apiSlice } from "../api/apiSlice";

export const certificateApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCertificatesByStudentId: builder.query({
      query: (studentId) => `/api/certificate/student/${studentId}`,
      providesTags: ["getCertificatesByStudent"],
    }),
    getPendingCertificates: builder.query({
      query: () => "/api/certificate/pending",
      providesTags: ["getPendingCertificates"],
    }),
    requestForCertificate: builder.mutation({
      query: (data) => ({
        url: "/api/certificate/request-for-certificate",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getCertificatesByStudent"],
    }),
    updateCertificateStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/certificate/update-status/${id}`,
        method: "PATCH",
        body: data,
        responseType: "blob",
      }),
      invalidatesTags: ["getPendingCertificates"],
    }),
  }),
});

export const {
  useGetCertificatesByStudentIdQuery,
  useGetPendingCertificatesQuery,
  useRequestForCertificateMutation,
  useUpdateCertificateStatusMutation,
} = certificateApi;
