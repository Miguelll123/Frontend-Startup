import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import startupService from "../../features/startup/startupService"; // Adjust path as needed

const initialState = {
  startups: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const fetchStartups = createAsyncThunk("startups/fetchAll", async (_, thunkAPI) => {
  try {
    return await startupService.getAllStartups();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.msg) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const startupSlice = createSlice({
  name: "startups",
  initialState,
  reducers: {
    resetStartups: (state) => {
      state.startups = [];
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStartups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchStartups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.startups = action.payload;
      })
      .addCase(fetchStartups.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.startups = [];
      });
  },
});

export const { resetStartups } = startupSlice.actions;
export default startupSlice.reducer;
