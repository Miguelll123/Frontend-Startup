import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTrainers, fetchTrainerById } from "./trainerService";

export const getTrainers = createAsyncThunk("trainers/getAll", async () => {
  return await fetchTrainers();
});

export const getTrainerDetail = createAsyncThunk("trainers/getById", async (id) => {
  return await fetchTrainerById(id);
});

const trainerSlice = createSlice({
  name: "trainers",
  initialState: {
    list: [],
    selected: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelected: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTrainers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTrainers.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(getTrainers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getTrainerDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTrainerDetail.fulfilled, (state, action) => {
        state.selected = action.payload;
        state.loading = false;
      })
      .addCase(getTrainerDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSelected } = trainerSlice.actions;
export default trainerSlice.reducer; 