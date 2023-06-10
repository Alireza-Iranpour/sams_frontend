import { apiSlice } from "../api/apiSlice";

export interface getMembersResponse {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  agent_code: string;
  upline_member: number;
  upline: {
    id: number;
    first_name: string;
    last_name: string;
  };
  senior_upline: {
    id: number;
    first_name: string;
    last_name: string;
  };
  level: number;
  level_title: [abbr: string, full: string];
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMembers: builder.query<getMembersResponse[], void>({
      query: () => {
        return {
          url: "auth/get_members/",
          method: "get",
        };
      },
    }),
  }),
});

export const { useGetMembersQuery } = extendedApiSlice;
