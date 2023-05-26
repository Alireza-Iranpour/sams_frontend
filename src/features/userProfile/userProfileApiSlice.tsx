import { apiSlice } from "../api/apiSlice";

export interface GetUserProfileResponse {
  first_name: string;
  last_name: string;
  id: number;
  email: string;
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<GetUserProfileResponse, void>({
      query: () => {
        return {
          url: "auth/users/me/",
          method: "get",
        };
      },
    }),
  }),
});

export const { useGetUserProfileQuery, useLazyGetUserProfileQuery } = extendedApiSlice;
