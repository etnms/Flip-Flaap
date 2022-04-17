import { configureStore } from "@reduxjs/toolkit";
import currentCollectionReducer from "../features/collectionSlice";
import deleteConfirmReducer from "../features/deleteConfirmSlice";
import menuChangeReducer from "../features/menuChangeSlice";
import openCollectionFormReducer from "../features/openCollectionFormSlice"
export const store = configureStore({
  reducer: {
    currentCollection: currentCollectionReducer,
    confirmDeleteMenu: deleteConfirmReducer,
    menuChangeValue: menuChangeReducer,
    openCollectionForm: openCollectionFormReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
