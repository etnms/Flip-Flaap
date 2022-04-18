import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

interface DeleteConfirm {
  value: boolean;
  loadingDelete: boolean;
  nameCollectionDelete: string;
  idCollectionDelete: string;
}

const initialState: DeleteConfirm = {
  value: false,
  loadingDelete: false,
  nameCollectionDelete: "",
  idCollectionDelete: "",
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
    setIDcollectionDelete: (state, action: PayloadAction<string>) => {
      state.idCollectionDelete = action.payload;
    }
  },
});

export const {  openDeleteConfirm, setIDcollectionDelete, setNameCollectionDelete, showLoadingDelete } = deleteConfirmSlice.actions;

export const deleteConfirm = (state: RootState) => state.confirmDeleteMenu.value;

export default deleteConfirmSlice.reducer;
