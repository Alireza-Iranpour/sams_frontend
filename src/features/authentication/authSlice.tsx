import { createSlice, Dictionary, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
// import jwt_decode from "jwt-decode";

export interface decodedAccess {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  first_name: string;
  last_name: string;
}

export interface authState {
  authTokens: { refresh: string; access: string } | null;
  user: { firstName: string; lastName: string } | null;
  isAuthenticated: boolean;
}

const authTokens = localStorage.getItem("authTokens");
let user = null;

// if (authTokens) {
//   const decoded_access: decodedAccess = jwt_decode(
//     JSON.parse(authTokens).access
//   );
//   user = {
//     firstName: decoded_access.first_name,
//     lastName: decoded_access.last_name,
//   };
// }

const initialState: authState = {
  authTokens: authTokens ? JSON.parse(authTokens) : null,
  user: user,
  isAuthenticated: authTokens ? true : false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    // setAuthTokens: (
    //   state,
    //   action: PayloadAction<{ authTokens: { refresh: string; access: string } }>
    // ) => {
    //   localStorage.setItem(
    //     "authTokens",
    //     JSON.stringify(action.payload.authTokens)
    //   );
    //   const decoded_access: decodedAccess = jwt_decode(
    //     action.payload.authTokens.access
    //   );
    //   state.user = {
    //     firstName: decoded_access.first_name,
    //     lastName: decoded_access.last_name,
    //   };
    //   state.authTokens = action.payload.authTokens;
    //   state.isAuthenticated = true;
    // },

    // setUser: (
    //   state,
    //   action: PayloadAction<{ user: { firstName: string; lastName: string } }>
    // ) => {
    //   localStorage.setItem("user", JSON.stringify(action.payload.user));
    //   state.user = action.payload.user;
    //   state.isAuthenticated = true;
    // },
    logout: (state) => {
      console.log("logging out");
      localStorage.removeItem("authTokens");
      console.log("token removed");
      localStorage.removeItem("user");
      localStorage.removeItem("workingLms");
      state.authTokens = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;

// Action creators are generated for each case reducer function
export const {
  // setAuthTokens,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
