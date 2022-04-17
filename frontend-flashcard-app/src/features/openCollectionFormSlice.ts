import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../app/store";

interface collectionFormState {
    open: boolean,
}

const initialState: collectionFormState = {
    open: false
} 

export const openCollectionFormSlice = createSlice({
    name: "openCollectionForm",
    initialState,
    reducers: {
        openCollectionForm: (state, action: PayloadAction<boolean>) => {state.open = action.payload}
    }
})

export const { openCollectionForm } = openCollectionFormSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectOpenCollectionForm = (state: RootState) => state.openCollectionForm.open;

export default openCollectionFormSlice.reducer;
