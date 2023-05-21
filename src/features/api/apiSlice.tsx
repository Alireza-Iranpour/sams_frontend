import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../redux/store";

export const apiSlice = createApi({
  reducerPath: "api", // optional
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/",
    timeout: 20 * 1000,
    prepareHeaders: (headers, { getState }) => {
      const authTokens = (getState() as RootState).auth.authTokens;
      // console.log(authTokens?.access);
      if (authTokens) {
        headers.set("Authorization", `Bearer ${authTokens.access}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});
