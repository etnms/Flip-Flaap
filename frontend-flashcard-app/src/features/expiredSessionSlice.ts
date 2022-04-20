import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface ExpiredSessionState {
  value: boolean;
}

const initialState: ExpiredSessionState = {
  value: false,
};

const expiredSessionSlice = createSlice({
  name: "expiredSession",
  initialState,
  reducers: {
    changeExpiredStatus: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const {changeExpiredStatus} = expiredSessionSlice.actions;

export const selectExpiredSession = (state: RootState) => state.expiredSession.value;

export default expiredSessionSlice.reducer;