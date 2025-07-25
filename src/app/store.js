import { configureStore } from "@reduxjs/toolkit";
import tab from "../features/startup/tabs/tabSlice";
import auth from "../features/auth/authSlice";
import trainers from "../features/trainers/trainerSlice";
import mentoring from "../features/startup/mentoring/mentoringSlice";
import mentoringSessions from "../features/mentoringsessions/mentoringSessionsSlice";
import startups from "../features/startup/startupSlice";
import activity from "../features/activity/activitySlice";

export const store = configureStore({
  reducer: {
    tab,
    auth,
    trainers,
    mentoring,
    mentoringSessions,
    startups,
    activity,
  },
});
