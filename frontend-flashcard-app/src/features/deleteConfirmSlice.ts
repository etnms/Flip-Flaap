import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

interface DeleteConfirm {
  value: boolean;
  loadingDelete: boolean;
  nameCollectionDelete: string;
}

const initialState: DeleteConfirm = {
  value: false,
  loadingDelete: false,
  nameCollectionDelete: "",
};

const deleteConfirmSlice = createSlice({
  name: "confirmDeleteMenu",
  initialState,
  reducers: {
    openDeleteConfirm: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
    showLoadingDelete: (state, action: PayloadAction<boolean>) => {
      state.loadingDelete = action.payload;
    },
    setNameCollectionDelete: (state, action: PayloadAction<string>) => {
      state.nameCollectionDelete = action.payload;
    },
  },
});

export const { setNameCollectionDelete, openDeleteConfirm, showLoadingDelete } = deleteConfirmSlice.actions;

export const deleteConfirm = (state: RootState) => state.confirmDeleteMenu.value;

export default deleteConfirmSlice.reducer;
