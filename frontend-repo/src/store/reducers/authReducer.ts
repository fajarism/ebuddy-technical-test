import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  token?: string;
  isRegisterLoading: boolean;
  isLoginLoading: boolean;
  formRegisterName: string;
  formRegisterEmail: string;
  formRegisterPassword: string;
  formRegisterConfirmPassword: string;
  formLoginEmail: string;
  formLoginPassword: string;
}

export interface FormRegisterPayload {
  key: "Name" | "Email" | "Password" | "ConfirmPassword";
  value: string;
}

export interface FormLoginPayload {
  key: "Email" | "Password";
  value: string;
}

const initialState: AuthState = {
  isRegisterLoading: false,
  isLoginLoading: false,
  //   token: undefined,
  token:
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IjhkMjUwZDIyYTkzODVmYzQ4NDJhYTU2YWJhZjUzZmU5NDcxNmVjNTQiLCJ0eXAiOiJKV1QifQ",
  formRegisterEmail: "",
  formRegisterName: "",
  formRegisterPassword: "",
  formRegisterConfirmPassword: "",
  formLoginEmail: "",
  formLoginPassword: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setIsRegisterLoading: (state, action: PayloadAction<boolean>) => {
      state.isRegisterLoading = action.payload;
    },
    setIsLoginLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoginLoading = action.payload;
    },
    setFormRegister: (state, action: PayloadAction<FormRegisterPayload>) => {
      const { key, value } = action.payload;
      state[`formRegister${key}`] = value;
    },
    setFormLogin: (state, action: PayloadAction<FormLoginPayload>) => {
      const { key, value } = action.payload;
      state[`formLogin${key}`] = value;
    },
  },
});

export const {
  setToken,
  setIsRegisterLoading,
  setIsLoginLoading,
  setFormRegister,
  setFormLogin,
} = authSlice.actions;
export default authSlice.reducer;
