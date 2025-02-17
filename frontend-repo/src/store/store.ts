import { authSlice } from "@/store/reducers/authReducer";
import { commonComponentSlice } from "@/store/reducers/commonComponentReducer";
import { mainPageSlice } from "@/store/reducers/mainPageReducer";
import { configureStore } from "@reduxjs/toolkit";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
      mainPage: mainPageSlice.reducer,
      commonComponent: commonComponentSlice.reducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
