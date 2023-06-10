import { apiSlice } from "../../api/apiSlice";

export interface GetSessionEvents {
  id: number;
  organizer: number;
  event_name: string;
  event_date: string;
  created_at: string;
  updated_at: string;
}

export interface CreateSessionEventRequest {
  organizer: number;
  event_name: string;
  event_date: string;
}

export interface CreateSessionEventResponse {
  id: number;
  organizer: number;
  event_name: string;
  event_date: string;
  created_at: string;
  updated_at: string;
}

export interface RegisterEventAttendanceRequest {
  user: number;
  event: number;
}

export interface RegisterEventAttendanceResponse {
  id: number;
  user: number;
  event: number;
  created_at: string;
  updated_at: string;
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSessionEvents: builder.query<GetSessionEvents[], void>({
      query: () => {
        return {
          url: "attendance/events/",
          method: "get",
        };
      },
    }),

    createSessionEvent: builder.mutation<
      CreateSessionEventResponse,
      CreateSessionEventRequest
    >({
      query: (data) => {
        return {
          url: "attendance/create_session_event/",
          method: "post",
          body: {
            organizer: data.organizer,
            event_name: data.event_name,
            event_date: data.event_date,
          },
        };
      },
    }),

    registerEventAttendance: builder.mutation<
      RegisterEventAttendanceResponse,
      RegisterEventAttendanceRequest
    >({
      query: (data) => {
        return {
          url: "attendance/register_event_attendance/",
          method: "post",
          body: {
            user: data.user,
            event: data.event,
          },
        };
      },
    }),
  }),
});

export const { useCreateSessionEventMutation, useGetSessionEventsQuery } =
  extendedApiSlice;
