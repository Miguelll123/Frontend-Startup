import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "../features/startup/tabs/tabSlice";

export const store = configureStore({
  reducer: {
    tab: tabReducer,
  },
});
