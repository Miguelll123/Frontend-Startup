import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import startupService from './startupService';

export const getDashboardData = createAsyncThunk(
  'startups/getDashboard',
  async (_, thunkAPI) => {
    try {
      return await startupService.getDashboardData();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getStartupsList = createAsyncThunk(
  'startups/getList',
  async (_, thunkAPI) => {
    try {
      return await startupService.getStartupsList();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  dashboardData: null,
  startupsList: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ''
};

const startupSlice = createSlice({
  name: 'startups',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dashboardData = action.payload;
      })
      .addCase(getDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getStartupsList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStartupsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.startupsList = action.payload;
      })
      .addCase(getStartupsList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset } = startupSlice.actions;
export default startupSlice.reducer; 