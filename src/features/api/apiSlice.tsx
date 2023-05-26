import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../redux/store";

export const apiSlice = createApi({
  reducerPath: "api", // optional
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/",
    timeout: 20 * 1000,
    prepareHeaders: (headers, { getState }) => {
      const authToken = (getState() as RootState).auth.authToken;
      // console.log(authTokens?.access);
      if (authToken) {
        headers.set("Authorization", `Token ${authToken.auth_token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});
