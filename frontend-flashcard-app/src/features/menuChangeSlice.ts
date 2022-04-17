import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface MenuChangeState {
  value: boolean;
}

const initialState: MenuChangeState = {
  value: false,
};

export const menuChangeSlice = createSlice({
  name: "menuChange",
  initialState,
  reducers: {
    menuChange: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { menuChange } = menuChangeSlice.actions;
export const selectorMenuChange = (state: RootState) => state.currentCollection.value;
export default menuChangeSlice.reducer;
