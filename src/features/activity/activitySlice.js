import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getActivities } from "./activityService";

const initialState = {
  list: [],
  isLoading: false,
  isError: false,
  message: "",
};

export const fetchActivities = createAsyncThunk("activity/fetchAll", async (_, thunkAPI) => {
  try {
    return await getActivities();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivities.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default activitySlice.reducer;
