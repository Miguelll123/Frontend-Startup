import { configureStore } from "@reduxjs/toolkit";
import tab from "../features/startup/tabs/tabSlice";
import auth from "../features/auth/authSlice";
import mentoring from "../features/startup/mentoring/mentoringSlice";
import mentoringsessions from "../features/mentoringsessions/mentoringSessionsSlice";

export const store = configureStore({
  reducer: {
    tab,
    auth,
    mentoring,
    mentoringsessions,
  },
});
