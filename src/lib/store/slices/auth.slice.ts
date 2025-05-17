import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  sub: string;
  role: string;
  iat: number;
  exp: number;
}

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  role: 'admin' | 'verifikator' | 'user' | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  isAuthenticated: false,
  role: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
      state.role = jwtDecode<JwtPayload>(action.payload).role as 'admin' | 'verifikator' | 'user';
      state.isLoading = false;
    },
    setLogout: (state) => {
      state.isAuthenticated = false;
      state.role = null;
      state.isLoading = false;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;