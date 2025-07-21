import { configureStore } from "@reduxjs/toolkit";
import tab from "../features/startup/tabs/tabSlice";
import auth from "../features/auth/authSlice";
import trainers from "../features/trainers/trainerSlice"
import mentoring from "../features/startup/mentoring/mentoringSlice";

export const store = configureStore({
  reducer: {
    tab,
    auth,
    trainers,
    mentoring,
  },
});
