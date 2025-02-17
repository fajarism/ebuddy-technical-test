import { User } from "@/apis/users/fetchUserData";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface MainPageState {
  isFetchingUserData: boolean;
  userData: User | null;
}

export interface FormMainPagePayload {
  key: keyof User;
  value: string;
}

const initialState: MainPageState = {
  isFetchingUserData: false,
  userData: null,
};

export const mainPageSlice = createSlice({
  name: "mainPage",
  initialState,
  reducers: {
    setIsFetchingUserData: (state, action: PayloadAction<boolean>) => {
      state.isFetchingUserData = action.payload;
    },
    setUserData: (state, action: PayloadAction<User>) => {
      state.userData = action.payload;
    },
    setFormMainPage: (state, action: PayloadAction<FormMainPagePayload>) => {
      const { key, value } = action.payload;
      if (state?.userData) {
        state.userData[key] = value;
      }
    },
  },
});

export const { setIsFetchingUserData, setUserData, setFormMainPage } =
  mainPageSlice.actions;
export default mainPageSlice.reducer;
