import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import mentoringService from "./mentoringService";

const initialState = {
  mentors: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// gett all mentors
export const fetchAllMentors = createAsyncThunk("mentoring/fetchAll", async (_, thunkAPI) => {
  try {
    return await mentoringService.getAllMentors();
  } catch (error) {
    const message = error.response?.data?.msg || error.message || "Error desconocido";
    return thunkAPI.rejectWithValue(message);
  }
});

// Slice
export const mentoringSlice = createSlice({
  name: "mentoring",
  initialState,
  reducers: {
    resetMentoring: (state) => {
      state.mentors = [];
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMentors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllMentors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mentors = action.payload;
      })
      .addCase(fetchAllMentors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetMentoring } = mentoringSlice.actions;
export default mentoringSlice.reducer;
