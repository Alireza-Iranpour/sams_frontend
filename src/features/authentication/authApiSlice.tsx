import { apiSlice } from "../api/apiSlice";

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface LoginUserTokenResponse {
  auth_token: string;
}

export interface LoginUserJWTResponse {
  refresh: string;
  access: string;
}

export interface RefreshTokenRequest {
  refresh: string;
}

export interface RefreshTokenResponse {
  refresh: string;
  access: string;
}

export interface RegisterUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password1: string;
  password2: string;
}

export interface ActivateUserRequest {
  uid: string;
  token: string;
}

export interface resendActivationRequest {
  email: string;
}

export interface resetPasswordRequest {
  email: string;
}

export interface resetPasswordConfirmRequest {
  uid: string;
  token: string;
  new_password: string;
}

export interface googleLoginResponse {
  authorization_url: string;
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUserToken: builder.mutation<LoginUserTokenResponse, LoginUserRequest>({
      query: (data) => {
        return {
          url: "auth/token/login/",
          method: "post",
          body: {
            email: data.email,
            password: data.password,
          },
        };
      },
    }),

    loginUserJWT: builder.mutation<LoginUserJWTResponse, LoginUserRequest>({
      query: (data) => {
        return {
          url: "auth/jwt/create/",
          method: "post",
          body: {
            email: data.email,
            password: data.password,
          },
        };
      },
    }),

    refreshToken: builder.mutation<RefreshTokenResponse, RefreshTokenRequest>({
      query: (data) => {
        return {
          url: "auth/jwt/refresh/",
          method: "post",
          body: {
            refresh: data.refresh,
          },
        };
      },
    }),

    registerUser: builder.mutation<{}, RegisterUserRequest>({
      query: (data) => {
        return {
          // url: "api/users/register/",
          url: "auth/users/",
          method: "post",
          headers: {},
          body: {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            password: data.password1,
            re_password: data.password2,
          },
        };
      },
    }),

    activateUser: builder.mutation<{}, ActivateUserRequest>({
      query: (data) => {
        return {
          url: "auth/users/activation/",
          method: "post",
          headers: {},
          body: {
            uid: data.uid,
            token: data.token,
          },
        };
      },
    }),

    resendActivation: builder.mutation<{}, resendActivationRequest>({
      query: (data) => {
        return {
          url: "auth/users/resend_activation/",
          method: "post",
          headers: {},
          body: {
            email: data.email,
          },
        };
      },
    }),

    resetPassword: builder.mutation<{}, resetPasswordRequest>({
      query: (data) => {
        return {
          url: "auth/users/reset_password/",
          method: "post",
          headers: {},
          body: {
            email: data.email,
          },
        };
      },
    }),

    resetPasswordConfirm: builder.mutation<{}, resetPasswordConfirmRequest>({
      query: (data) => {
        return {
          url: "auth/users/reset_password_confirm/",
          method: "post",
          headers: {},
          body: {
            uid: data.uid,
            token: data.token,
            new_password: data.new_password,
          },
        };
      },
    }),

    googleLogin: builder.query<googleLoginResponse, void>({
      query: () => {
        return {
          url: "auth/o/google-oauth2/",
          method: "get",
          params: { redirect_uri: "http://localhost:8000/google" },
          headers: {},
        };
      },
    }),
  }),
});

export const {
  useLoginUserJWTMutation,
  useLoginUserTokenMutation,
  useRefreshTokenMutation,
  useRegisterUserMutation,
  useActivateUserMutation,
  useResendActivationMutation,
  useResetPasswordMutation,
  useResetPasswordConfirmMutation,
  useLazyGoogleLoginQuery,
} = extendedApiSlice;
