import { createSlice } from "@reduxjs/toolkit";
console.log("postSlice.js loaded");

const postSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {},
});

export default postSlice.reducer; 