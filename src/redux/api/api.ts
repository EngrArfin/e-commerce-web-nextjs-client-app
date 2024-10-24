/* import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
    }),
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/api/register",
        method: "POST",
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (loginData) => ({
        url: "/api/login",
        method: "POST",
        body: loginData,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
} = baseApi;

export default baseApi;
 */
