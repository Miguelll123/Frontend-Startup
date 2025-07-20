import { configureStore } from "@reduxjs/toolkit";
import tab from "../features/startup/tabs/tabSlice";
import auth from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    tab,
    auth,
  },
});
