import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

// Define a type for the slice state
interface CurrentCollectionState {
  value: string;
  _id: string;
}

// Define the initial state using that type
const initialState: CurrentCollectionState = {
  value: "",
  _id: "",
};

export const currentCollectionSlice = createSlice({
  name: "currentCollection",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeCurrentCollection: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    changeCurrentCollectionId: (state, action: PayloadAction<string>) => {
      state._id = action.payload;
    },
  },
});

export const { changeCurrentCollection, changeCurrentCollectionId } = currentCollectionSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentCollection = (state: RootState) => state.currentCollection.value;

export default currentCollectionSlice.reducer;
