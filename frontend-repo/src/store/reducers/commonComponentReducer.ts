import React from "react";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AlertState {
  severity: "error" | "warning" | "info" | "success";
  message: string;
  alertId: string;
  icon?: React.ReactNode;
}

export interface CommonComponentState {
  alerts: AlertState[];
  backdrop: boolean;
}

const initialState: CommonComponentState = {
  alerts: [],
  backdrop: false,
};

export const commonComponentSlice = createSlice({
  name: "commonComponent",
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<AlertState>) => {
      state.alerts.push(action.payload);
    },
    removeAlert: (state, action: PayloadAction<string>) => {
      state.alerts = state.alerts.filter(
        (alert) => alert.alertId !== action.payload
      );
    },
    setBackdrop: (state, action: PayloadAction<boolean>) => {
      state.backdrop = action.payload;
    },
  },
});

export const { setAlert, removeAlert, setBackdrop } =
  commonComponentSlice.actions;
export default commonComponentSlice.reducer;
