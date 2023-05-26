import { createSlice, Dictionary, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

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
  authToken: { auth_token: string } | null;
  user: { firstName: string; lastName: string } | null;
  isAuthenticated: boolean;
}

const authToken = localStorage.getItem("authToken");
const user = localStorage.getItem("user");

const initialState: authState = {
  authToken: authToken ? JSON.parse(authToken) : null,
  user: user ? JSON.parse(user) : null,
  isAuthenticated: authToken ? true : false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuthToken: (
      state,
      action: PayloadAction<{ authToken: { auth_token: string } }>
    ) => {
      localStorage.setItem(
        "authToken",
        JSON.stringify(action.payload.authToken)
      );
      state.authToken = action.payload.authToken;
    },

    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },

    setUser: (
      state,
      action: PayloadAction<{ user: { firstName: string; lastName: string } }>
    ) => {
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      console.log("logging out");
      localStorage.removeItem("authToken");
      console.log("token removed");
      localStorage.removeItem("user");
      state.authToken = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;

// Action creators are generated for each case reducer function
export const { setAuthToken, setIsAuthenticated, setUser, logout } =
  authSlice.actions;

export default authSlice.reducer;
