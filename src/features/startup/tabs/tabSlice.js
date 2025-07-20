import { createSlice } from "@reduxjs/toolkit";

const tabSlice = createSlice({
  name: "tab",
  initialState: {
    activeTabKey: "1",
  },
  reducers: {
    setActiveTabKey: (state, action) => {
      state.activeTabKey = action.payload;
    },
  },
});

export const { setActiveTabKey } = tabSlice.actions;
export default tabSlice.reducer;
