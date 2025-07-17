import { createSlice } from "@reduxjs/toolkit";
console.log("userSlice.js loaded - Slice de usuario funcionando y visible en el repo.");

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {},
});

export default userSlice.reducer; 